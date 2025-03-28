<script setup lang="ts">
import { requiredValidator } from "@/utils/validator";
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const warehouseName = ref("Kho hàng 1 - Tên kho hàng");

const productList = ref([
  { id: "P001", name: "Táo", quantity: 50 },
  { id: "P002", name: "Cam", quantity: 30 },
  { id: "P003", name: "Chuối", quantity: 20 },
  { id: "P004", name: "Xoài", quantity: 15 },
  { id: "P005", name: "Dưa hấu", quantity: 25 },
  { id: "P006", name: "Ổi", quantity: 10 },
  { id: "P007", name: "Mận", quantity: 40 },
  { id: "P008", name: "Dứa", quantity: 35 },
  { id: "P009", name: "Nho", quantity: 18 },
  { id: "P010", name: "Bưởi", quantity: 22 },
  { id: "P011", name: "Chanh", quantity: 28 },
  { id: "P012", name: "Quýt", quantity: 32 },
  { id: "P013", name: "Dâu tây", quantity: 12 },
  { id: "P014", name: "Kiwi", quantity: 45 },
  { id: "P015", name: "Lựu", quantity: 50 },
  { id: "P016", name: "Đào", quantity: 20 },
  { id: "P017", name: "Mít", quantity: 38 },
  { id: "P018", name: "Na", quantity: 25 },
  { id: "P019", name: "Sầu riêng", quantity: 30 },
  { id: "P020", name: "Me", quantity: 15 },
  { id: "P021", name: "Chôm chôm", quantity: 18 },
  { id: "P022", name: "Vải", quantity: 22 },
]);

const headers = [
  { title: "Tên mặt hàng", key: "name" },
  { title: "Giá", key: "cost" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Số lượng còn", key: "quantity" },
  { title: "Chi tiết", key: "action" },
];
const router = useRouter();

const editDialog = ref(false);
const deleteDialog = ref(false);
const newDialog = ref(false);
const editedItem = ref<any | undefined>();
const deleteId = ref("");
const newItem = ref<any | undefined>();

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
  console.log("....");
  newItem.value = {
    id: "",
    name: "",
    quantity: 0,
    cost: 0,
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

const saveEdit = () => {
  const index = productList.value.findIndex(
    (productd) => productd.id === editedItem.value.id
  );

  console.log(editedItem.value);
  // Nếu tìm thấy sản phẩm, cập nhật giá trị
  if (index !== -1) {
    productList.value[index] = { ...editedItem.value }; // Cập nhật sản phẩm tại vị trí tìm được
  }

  // Đóng dialog sau khi lưu
  editDialog.value = false;
};

const deleteItem = () => {
  // Tìm vị trí của sản phẩm trong danh sách dựa trên deleteId
  const index = productList.value.findIndex(
    (productd) => productd.id === deleteId.value
  );

  // Nếu tìm thấy sản phẩm, xóa sản phẩm khỏi danh sách
  if (index !== -1) {
    productList.value.splice(index, 1); // Xóa sản phẩm tại vị trí tìm được
  }

  // Đặt lại deleteId và đóng dialog xóa
  deleteId.value = "";
  deleteDialog.value = false;
};
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="d-flex align-center">
        <VIcon icon="bx-building-house" size="2rem" class="me-2" />
        <span>Thông tin kho hàng</span>
      </VCardTitle>

      <VCardText class="mt-6">
        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Tên sản phẩm :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ warehouseName }}</div>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Mã kho hàng :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ props.id }}</div>
          </VCol>
        </VRow>

        <VCard class="mt-6">
          <VCardTitle
            class="text-h6 font-weight-medium d-flex align-center gap-2"
          >
            <VIcon icon="bx-package"></VIcon>
            Danh sách hàng trong kho
          </VCardTitle>
          <VCardText class="mt-3">
            <VDataTable
              :headers="headers"
              :items="productList"
              :items-per-page="20"
            >
              <template #item.cost="{ item }"> 500,000 VND </template>
              <template #item.action="{ item }">
                <IconBtn @click="router.push(`../product-info/${item.id}`)">
                  <VIcon icon="bx-info-circle" />
                </IconBtn>

                <IconBtn @click="openEditDialog(item)">
                  <VIcon icon="bx-edit" color="success" />
                </IconBtn>
                <IconBtn @click="openDeleteDialog(item.id)">
                  <VIcon color="error" icon="bx-trash" />
                </IconBtn>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCardText>
    </VCard>

    <VDialog v-model="editDialog" max-width="600px">
      <VCard title="Edit Item">
        <VCardText>
          <VFrom @submit.prevent>
            <VRow>
              <!-- fullName -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.name"
                  label="Tên"
                  :rules="[requiredValidator]"
                  readonly
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.id"
                  label="Mã sản phẩm"
                  :rules="[requiredValidator]"
                  readonly
                />
              </VCol>

              <!-- fullName -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.quantity"
                  label="Số lượng"
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>
          </VFrom>
        </VCardText>

        <VCardText>
          <div class="self-align-end d-flex gap-4 justify-end">
            <VBtn color="gray" variant="outlined" @click="closeEdit">
              <VIcon icon="bx-x"></VIcon> | Hủy bỏ
            </VBtn>
            <VBtn color="success" variant="elevated" @click="saveEdit"
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
                <VAutocomplete
                  v-model="newItem.name"
                  label="Tên"
                  :rules="[requiredValidator]"
                  :items="['cam', 'bưởi', 'táo', 'lê', 'mit']"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="newItem.quantity"
                  label="Số lượng"
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
            <VBtn color="success" variant="elevated" @click="saveNewItem"
              ><VIcon icon="bx-save"></VIcon>| Thêm mới
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog v-model="deleteDialog" max-width="500px">
      <VCard title="Bạn có muốn xóa thông tin xe này không?">
        <VCardText>
          <div class="d-flex justify-center gap-4">
            <VBtn
              variant="outlined"
              color="secondary"
              @click="() => (deleteDialog = false)"
            >
              Bỏ qua
            </VBtn>
            <VBtn color="error" variant="outlined" @click="deleteItem">
              Xác nhận xóa
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <div class="dock-div">
      <VBtn class="dock-button" color="success" @click="">
        <VIcon icon="bx-upload" class="me-2" /> | Upload file csv
      </VBtn>
      <VBtn @click="openNewDialog" class="dock-button ms-2">
        <VIcon icon="bxs-file-plus" class="me-2" /> | Thêm sản phẩm vào kho
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.dock-div {
  position: fixed; /* Cố định vị trí */
  top: 100px; /* Cách phía trên 20px */
  right: 50px; /* Cách phía phải 20px */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
}
.dock-button {
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}
.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}
</style>
