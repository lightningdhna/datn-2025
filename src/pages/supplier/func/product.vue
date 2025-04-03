<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
import { ref, onMounted } from "vue";
import { getAllProducts } from "@/utils/product-api";
import { formatDate, formatDateTime, formatPrice } from "@/utils/formatters";
import {
  updateProduct,
  createProduct,
  deleteProduct,
} from "@/utils/product-api";
import { useToast } from "vue-toastification";
import { debounce, debounceAsync, throttleAsync } from "@/utils/common";
const toast = useToast();

const isLoading = ref(true);
const productList = ref<any[]>([]); // Khởi tạo productList là một mảng rỗng
const fetchProductList = async () => {
  isLoading.value = true;
  try {
    const result = await getAllProducts();
    if (result.success) {
      productList.value = result.data; // Gán dữ liệu từ API vào productList
    } else {
      console.error("Lỗi khi lấy danh sách sản phẩm:", result.error);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProductList();
});
const headers = [
  { title: "", key: "data-table-expand" },
  { title: "Tên sản phẩm", key: "name" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Giá (VNĐ)", key: "price" },
  { title: "Ngày cập nhật", key: "date", sortable: true },

  { title: "Số lượng còn", key: "quantityLeft", maxWidth: "100px" },
  { title: "Số lượng đã bán", key: "quantitySold", maxWidth: "100px" },
  { title: "", key: "action" , minWidth:"150px"},
];

const requiredValidator = (value: string | null | undefined) => {
  return !!value || "Trường này là bắt buộc";
};

const search = ref("");

const editDialog = ref(false);
const deleteDialog = ref(false);
const newDialog = ref(false);
const editedItem = ref<any | undefined>();
const deleteId = ref("");
const newItem = ref<any | undefined>();
const isSavingEdit = ref(false);
const isSavingClickable = ref(true);
const isSavingDelete = ref(false);

const delay = 2500;

const openEditDialog = (item: any) => {
  editedItem.value = { ...item };
  editDialog.value = true;
  console.log(editedItem.value);
};

const openDeleteDialog = (id: string) => {
  deleteId.value = id;
  deleteDialog.value = true;
};

const openNewDialog = () => {
  newItem.value = {
    id: "",
    name: "",
    quantityLeft: 0,
    quantitySold: 0,
  };

  newDialog.value = true;
};

const saveNewItem = () => {
  newItem.value.id = Math.random().toString(36).substr(2, 9);
  productList.value.unshift(newItem.value);
  newDialog.value = false;
};

const closeEdit = () => {
  editDialog.value = false;
};

const saveEdit = async () => {
  isSavingClickable.value = false;
  const isChanged =
    JSON.stringify(editedItem.value) !==
    JSON.stringify(
      productList.value.find(
        (product: any) => product.id === editedItem.value.id
      )
    );

  if (!isChanged) {
    toast.warning("Không có thay đổi nào được thực hiện!");

    setTimeout(() => {
      isSavingClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
    return;
  }

  isSavingEdit.value = true;

  try {
    // Gọi API để cập nhật sản phẩm
    const result = await updateProduct(editedItem.value.id, editedItem.value);

    console.log("giá của sản phẩm cập nhât: ", editedItem.value.price);

    if (result.success) {
      // Tìm vị trí của sản phẩm trong danh sách
      const index = productList.value.findIndex(
        (product: any) => product.id === editedItem.value.id
      );

      // Nếu tìm thấy sản phẩm, cập nhật giá trị trong danh sách
      editedItem.value.date = new Date();
      if (index !== -1) {
        productList.value[index] = { ...editedItem.value };
      }

      // Hiển thị thông báo thành công (nếu cần)
      toast.success("Cập nhật sản phẩm thành công!");
      setTimeout(() => {
        editDialog.value = false;
      }, 750); // Đặt lại isSavingClickable sau 1 giây
    } else {
      console.error("Lỗi khi cập nhật sản phẩm:", result.error);
      toast.error(`Cập nhật sản phẩm thất bại!\n${result.message || ""}`);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API cập nhật sản phẩm:", error);
    alert("Đã xảy ra lỗi khi cập nhật sản phẩm!");
  } finally {
    // Đóng dialog và tắt trạng thái loading
    isSavingEdit.value = false;
    setTimeout(() => {
      isSavingClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
  }
};
const throttledSaveEdit = throttleAsync(saveEdit, delay);

const deleteItem = async () => {
  isSavingDelete.value = true;
  try {
    // Gửi yêu cầu xóa đến API
    const result = await deleteProduct(deleteId.value); // Giả sử bạn có hàm deleteProduct trong API

    if (result.success) {
      // Tìm vị trí của sản phẩm trong danh sách dựa trên deleteId
      const index = productList.value.findIndex(
        (product) => product.id === deleteId.value
      );

      // Nếu tìm thấy sản phẩm, xóa sản phẩm khỏi danh sách
      if (index !== -1) {
        productList.value.splice(index, 1); // Xóa sản phẩm tại vị trí tìm được
      }

      // Hiển thị thông báo thành công
      toast.success("Xóa sản phẩm thành công!");
    } else {
      // Hiển thị thông báo lỗi nếu API trả về lỗi
      toast.error(
        `Xóa sản phẩm thất bại: ${result.message || "Lỗi không xác định"}`
      );
    }
  } catch (error) {
    console.error("Lỗi khi gọi API xóa sản phẩm:", error);
    toast.error("Đã xảy ra lỗi khi xóa sản phẩm!");
  } finally {
    // Đặt lại deleteId và đóng dialog xóa
    deleteId.value = "";
    deleteDialog.value = false;
    isSavingDelete.value = false;
  }
};
</script>

<template>
  <VCard>
    <VCardTitle class="text-primary">
      <VIcon icon="bx-package"></VIcon>
      Danh sách sản phẩm
      <VRow style="direction: ltr;" class="mt-6">
        <VCol cols="12" offset-md="0" md="4">
          <VTextField
            v-model="search"
            placeholder="Search ..."
            append-inner-icon="bx-search"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VDataTable
        class="mt-1"
        :headers="headers"
        :items="productList"
        :items-per-page="20"
        :search="search"
        :loading="isLoading"
        :sort-by="[{ key: 'date', order: 'desc' }]"
        expand-on-click
      >
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td></td>
            <td :colspan="headers.length - 2">
              <div style="white-space: pre-wrap;" class="mt-4 mb-4">
                {{ slotProps.item.note }}
              </div>
            </td>
          </tr>
        </template>
        <template #item.price="{ item }"
          >{{ formatPrice(item.price) }}
        </template>
        <template #item.date="{ item }">{{ formatDate(item.date) }} </template>
        <template #item.action="{ item }">
          <IconBtn @click="router.push(`/supplier/product-info/${item.id}`)">
            <VIcon icon="bx-info-circle" />
          </IconBtn>
          <IconBtn @click="openEditDialog(item)">
            <VIcon color="success" icon="bx-edit" />
          </IconBtn>
          <IconBtn @click="openDeleteDialog(item.id)">
            <VIcon color="error" icon="bx-trash" />
          </IconBtn>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>

  <VDialog v-model="editDialog" max-width="600px">
    <VCard :loading="isSavingEdit" title="Edit Item">
      <VCardText>
        <VFrom @submit.prevent>
          <VRow>
            <!-- fullName -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="editedItem.name"
                label="Tên"
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- fullName -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="editedItem.id"
                label="Mã"
                :rules="[requiredValidator]"
                readonly
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model.number="editedItem.price"
                label="Giá"
                :rules="[requiredValidator]"
                suffix=" VNĐ"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <my-date-picker
                v-model="editedItem.date"
                label="Ngày cập nhật"
                :rules="[requiredValidator]"
                suffix=" VNĐ"
                disabled
              />
            </VCol>
            <VCol cols="12" sm="12">
              <VTextarea v-model="editedItem.note" label="Ghi chú" />
            </VCol>
          </VRow>
        </VFrom>
      </VCardText>

      <VCardText>
        <div class="self-align-end d-flex gap-4 justify-end">
          <VBtn
            :disabled="isSavingEdit"
            color="gray"
            variant="outlined"
            @click="closeEdit"
          >
            <VIcon icon="bx-x"></VIcon> | Hủy bỏ
          </VBtn>
          <VBtn
            :disabled="!isSavingClickable"
            :loading="isSavingEdit"
            color="success"
            variant="elevated"
            @click="throttledSaveEdit"
            ><VIcon icon="bx-save"></VIcon>| Lưu lại
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="newDialog" max-width="600px">
    <VCard title="Edit Item">
      <VCardText>
        <VFrom @submit.prevent>
          <VRow>
            <!-- fullName -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="newItem.name"
                label="Tên"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                label="Giá"
                suffix=",000 VNĐ"
                :rules="[requiredValidator]"
              />
            </VCol>
          </VRow>
        </VFrom>
      </VCardText>

      <VCardText>
        <div class="self-align-end d-flex gap-4 justify-end">
          <VBtn
            color="gray"
            variant="outlined"
            @click="() => (newDialog = false)"
          >
            <VIcon icon="bx-x"></VIcon> | Hủy bỏ
          </VBtn>
          <VBtn
            :loading="true"
            color="success"
            variant="elevated"
            @click="saveNewItem"
            ><VIcon icon="bx-save"></VIcon>| Thêm mới
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="deleteDialog" max-width="500px">
    <VCard title="Bạn có muốn xóa thông tin sản phẩm này không?">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn
            variant="outlined"
            color="secondary"
            @click="() => (deleteDialog = false)"
            :disabled="isSavingDelete"
          >
            Bỏ qua
          </VBtn>
          <VBtn
            :loading="isSavingDelete"
            color="error"
            variant="outlined"
            @click="deleteItem"
          >
            Xác nhận xóa
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <div class="dock-div">
    <VBtn class="dock-button" color="success">
      <VIcon icon="bx-upload" class="me-2" /> | Upload file csv
    </VBtn>
    <VBtn @click="openNewDialog" class="dock-button ms-2">
      <VIcon icon="bxs-file-plus" class="me-2" /> | Thêm kho
    </VBtn>
  </div>
</template>

<style scoped>
.dock-div {
  position: fixed; /* Cố định vị trí */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
  inset-block-start: 100px; /* Cách phía trên 20px */
  inset-inline-end: 50px; /* Cách phía phải 20px */
}

.dock-button {
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}

.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}
</style>
