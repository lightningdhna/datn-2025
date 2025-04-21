<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  deleteDialog: {
    type: Boolean,
    required: true,
  },
  editDialog: {
    type: Boolean,
    required: true,
  },
  newDialog: {
    type: Boolean,
    required: true,
  },
  deleteApi: {
    type: Function,
    required: true,
  },
  createApi: {
    type: Function,
    required: true,
  },
  updateApi: {
    type: Function,
    required: true,
  },

  itemList: {
    type: Array,
    required: true,
  },
  item: {
    required: true,
  },
  validateInfo: {
    type: Function,
    required:true,
  }
});

const delay: number = 2500;
const toast = useToast();

const isApiLoading = ref(false);
const isClickable = ref(true);

const emit = defineEmits([
  "update:deleteDialog",
  "update:editDialog",
  "update:newDialog",
  "updateList",
]);

// Biến phản ứng để quản lý trạng thái dialog
const localDeleteDialog = ref(props.deleteDialog);
const localEditDialog = ref(props.editDialog);
const localNewDialog = ref(props.newDialog);
// Đồng bộ giá trị từ props sang localDeleteDialog
watch(
  () => props.deleteDialog,
  (newValue: any) => {
    localDeleteDialog.value = newValue;
  }
);
// Phát sự kiện để đồng bộ giá trị từ localDeleteDialog về component cha
watch(
  () => localDeleteDialog.value,
  (newValue: any) => {
    emit("update:deleteDialog", newValue);
  }
);

// Đồng bộ giá trị từ props sang localEditDialog
watch(
  () => props.editDialog,
  (newValue: any) => {
    localEditDialog.value = newValue;
  }
);
watch(
  () => localEditDialog.value,
  (newValue: any) => {
    emit("update:editDialog", newValue);
  }
);

// Đồng bộ giá trị từ props sang localNewDialog
watch(
  () => props.newDialog,
  (newValue:any) => {
    localNewDialog.value = newValue;
  }
);
watch(
  () => localNewDialog.value,
  (newValue:any) => {
    emit("update:newDialog", newValue);
  }
);

const localList = ref([...props.itemList]);
// Đồng bộ danh sách từ props sang localList
watch(
  () => props.itemList,
  (newList: any) => {
    localList.value = [...newList];
  }
);
// Hàm thêm phần tử
const createItem = (newItem: any) => {
  localList.value.unshift(newItem); // Thêm phần tử vào danh sách cục bộ
  emit("updateList", [...localList.value]); // Phát sự kiện để cập nhật danh sách lên component cha
};

// Hàm sửa phần tử
const updateItem = (updatedItem: any) => {
  const index = localList.value.findIndex(
    (item: any) => item.id === updatedItem.id
  );
  if (index !== -1) {
    localList.value[index] = updatedItem; // Cập nhật phần tử trong danh sách cục bộ
    emit("updateList", [...localList.value]); // Phát sự kiện để cập nhật danh sách lên component cha
  }
};

// Hàm xóa phần tử
const deleteItem = (id: string) => {
  localList.value = localList.value.filter(
    (item: any) => item.id !== id
  ); // Xóa phần tử khỏi danh sách cục bộ
  emit("updateList", [...localList.value]); // Phát sự kiện để cập nhật danh sách lên component cha
};

const confirmDelete = async () => {
  isApiLoading.value = true;
  try {
    // Gửi yêu cầu xóa đến API
    const result = await props.deleteApi(props.item.id); // Giả sử bạn có hàm deleteProduct trong API

    if (result.success) {
      // Tìm vị trí của thông tin trong danh sách dựa trên deleteId

      deleteItem(props.item.id); // Gọi hàm xóa thông tin

      // Hiển thị thông báo thành công
      toast.success("Xóa dữ liệu thành công!");
      setTimeout(() => {
        localDeleteDialog.value = false;
      }, 100); // Đặt lại isSavingClickable sau 1 giây
    } else {
      // Hiển thị thông báo lỗi nếu API trả về lỗi
      toast.error(
        `Xóa dữ liệu thất bại: ${result.message || "Lỗi không xác định"}`
      );
    }
  } catch (error) {
    console.error("Lỗi khi gọi API xóa dữ liệu:", error);
    toast.error("Đã xảy ra lỗi khi xóa thông tin!");
  } finally {
    // Đặt lại deleteId và đóng dialog xóa
    isApiLoading.value = false;
    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
  }
};

  const confirmCreate = async () => {
  console.log(props.item)
  isClickable.value = false; // Vô hiệu hóa nút lưu để tránh nhấn nhiều lần

  // Kiểm tra dữ liệu đầu vào
  if (!props.validateInfo(props.item)) {
    toast.warning("Vui lòng nhập đầy đủ thông tin!");
    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
    return;
  }

  isApiLoading.value = true;
  try {
    // Gọi API để thêm thông tin mới
    const result = await props.createApi(props.item); // Giả sử bạn có hàm createProduct trong API

    if (result.success) {
      const newItem = result.data;
      createItem(newItem);

      // Hiển thị thông báo thành công
      toast.success("Thêm mới thành công!");

      setTimeout(() => {
        localNewDialog.value = false;
      }, 750); // Đặt lại isSavingClickable sau 1 giây
    } else {
      // Hiển thị thông báo lỗi nếu API trả về lỗi
      toast.error(
        `Thêm thông tin thất bại:\n ${result.message || "Lỗi không xác định"}`
      );
    }
  } catch (error) {
    console.error("Lỗi khi gọi API thêm thông tin:", error);
    toast.error("Đã xảy ra lỗi khi thêm thông tin!");
  } finally {
    isApiLoading.value = false;
    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
  }
};

const confirmEdit = async () => {
  isClickable.value = false;
  console.log('aaaaaaaaaaaaa',props.item)
  if (!props.validateInfo(props.item)) {
    toast.warning("Vui lòng nhập đầy đủ thông tin!");
    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
    return;
  }
  const isChanged =
    JSON.stringify(props.item) !==
    JSON.stringify(
      props.itemList.find(
        (item: any) => item.id === props.item.id
      )
    );

  if (!isChanged) {
    toast.warning("Không có thay đổi nào được thực hiện!");

    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
    return;
  }

  isApiLoading.value = true;

  try {
    // Gọi API để cập nhật thông tin
    const result = await props.updateApi(props.item.id, props.item);


    if (result.success) {
      // Tìm vị trí của thông tin trong danh sách


      // Nếu tìm thấy thông tin, cập nhật giá trị trong danh sách
      updateItem(result.data)

      // Hiển thị thông báo thành công (nếu cần)
      toast.success("Cập nhật thông tin thành công!");
      setTimeout(() => {
        localEditDialog.value = false;
      }, 750); // Đặt lại isSavingClickable sau 1 giây
    } else {
      console.error("Lỗi khi cập nhật thông tin:", result.error);
      toast.error(`Cập nhật thông tin thất bại!\n${result.message || ""}`);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API cập nhật thông tin:", error);
    alert("Đã xảy ra lỗi khi cập nhật thông tin!");
  } finally {
    // Đóng dialog và tắt trạng thái loading
    isApiLoading.value = false;
    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
  }
};




</script>

<template>

<VDialog v-model="localEditDialog" max-width="600px">
    <VCard title="Edit Item">
      <VCardText>
        <VFrom @submit.prevent> 
          <slot name = "edit-form"></slot>

        </VFrom>
      </VCardText>

      <VCardText>
        <div class="self-align-end d-flex gap-4 justify-end">
          <VBtn
            color="gray"
            variant="outlined"
            :disabled="isApiLoading"
            @click="() => (localEditDialog = false)"
          >
            <VIcon icon="bx-x"></VIcon> | Hủy bỏ
          </VBtn>
          <VBtn
            :loading="isApiLoading"
            :disabled="!isClickable"
            color="success"
            variant="elevated"
            @click = "confirmEdit"
            ><VIcon icon="bx-save"></VIcon>| Lưu thay đổi
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>


  <VDialog v-model="localNewDialog" max-width="600px">
    <VCard title="Edit Item">
      <VCardText>
        <VFrom @submit.prevent> 
          <slot name = "new-form"></slot>

        </VFrom>
      </VCardText>

      <VCardText>
        <div class="self-align-end d-flex gap-4 justify-end">
          <VBtn
            color="gray"
            variant="outlined"
            :disabled="isApiLoading"
            @click="() => (localNewDialog = false)"
          >
            <VIcon icon="bx-x"></VIcon> | Hủy bỏ
          </VBtn>
          <VBtn
            :loading="isApiLoading"
            :disabled="!isClickable"
            color="success"
            variant="elevated"
            @click = "confirmCreate"
            ><VIcon icon="bx-save"></VIcon>| Thêm mới
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="localDeleteDialog" max-width="500px">
    <VCard title="Bạn có muốn xóa dữ liệu này không?">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn
            variant="outlined"
            color="secondary"
            @click="
              () => {
                localDeleteDialog = false;
              }
            "
            :disabled="isApiLoading"
          >
            Bỏ qua
          </VBtn>
          <VBtn
            :loading="isApiLoading"
            :disabled="!isClickable"
            color="error"
            variant="outlined"
            @click="confirmDelete"
          >
            Xác nhận xóa
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>


</template>

