<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const props = defineProps({
  deleteDialog: {
    type: Boolean,
    required: true,
  },
  editDialog: {
    type: Boolean,
    required: true,
  },

  deleteApi: {
    type: Function,
    required: true,
  },

  updateApi: {
    type: Function,
    required: true,
  },
  currentItem: {
    required: true,
  },

  item: {
    required: true,
  },
  validateInfo: {
    type: Function,
    required: true,
  },
});

const delay: number = 2500;
const toast = useToast();

const isApiLoading = ref(false);
const isClickable = ref(true);

const emit = defineEmits([
  "update:deleteDialog",
  "update:editDialog",
  "update:currentItem",
]);

// Biến phản ứng để quản lý trạng thái dialog
const localDeleteDialog = ref(props.deleteDialog);
const localEditDialog = ref(props.editDialog);
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

const confirmDelete = async () => {
  isApiLoading.value = true;
  try {
    // Gửi yêu cầu xóa đến API
    const result = await props.deleteApi(props.item.id); // Giả sử bạn có hàm deleteProduct trong API

    if (result.success) {
      // Tìm vị trí của sản phẩm trong danh sách dựa trên deleteId

      // Hiển thị thông báo thành công
      toast.success("Xóa dữ liệu thành công!");
      const currentPath = router.currentRoute.value.path; // Lấy đường dẫn hiện tại
      const parentPath = currentPath.replace(/-info\/[^/]+$/, "");
      router.push(parentPath);
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
    toast.error("Đã xảy ra lỗi khi xóa sản phẩm!");
  } finally {
    // Đặt lại deleteId và đóng dialog xóa
    isApiLoading.value = false;
    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
  }
};

const confirmEdit = async () => {
  isClickable.value = false;
  console.log("aaaaaaaaaaaaa", props.item);
  if (!props.validateInfo(props.item)) {
    toast.warning("Vui lòng nhập đầy đủ thông tin sản phẩm!");
    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
    return;
  }
  const isChanged =
    JSON.stringify(props.item) !== JSON.stringify(props.currentItem);

  if (!isChanged) {
    toast.warning("Không có thay đổi nào được thực hiện!");

    setTimeout(() => {
      isClickable.value = true;
    }, delay); // Đặt lại isSavingClickable sau 1 giây
    return;
  }

  isApiLoading.value = true;

  try {
    // Gọi API để cập nhật sản phẩm
    const result = await props.updateApi(props.item.id, props.item);

    if (result.success) {
      emit("update:currentItem", props.item);
      // Hiển thị thông báo thành công (nếu cần)
      toast.success("Cập nhật sản phẩm thành công!");
      setTimeout(() => {
        localEditDialog.value = false;
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
          <slot name="edit-form"></slot>
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
            @click="confirmEdit"
            ><VIcon icon="bx-save"></VIcon>| Lưu thay đổi
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
