<script setup lang="ts">
import {
getCurrentDropshipperInfo,
getCurrentDropshipperSummary,
updateCurrentDropshipper,
} from "@/utils/dropshipper-api";
import { getDropshipperId } from "@/utils/local-storage";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

// --- State ---
const toast = useToast();
const dropshipperName = ref<string | null>(null);
const id = ref<string | null>(null);
const supplierCount = ref<number | null>(null);
const registeredProductCount = ref<number | null>(null);
const completedOrderCount = ref<number | null>(null);
const soldProductQuantity = ref<number | null>(null);
const completedOrderCountAllTime = ref<number | null>(null);
const soldProductQuantityAllTime = ref<number | null>(null);
const currentMonth = ref<number | null>(null);
const currentYear = ref<number | null>(null);

const isLoading = ref(true);
const error = ref<string | null>(null);

const editDialog = ref(false);
const tempName = ref("");

// --- Fetch Data ---
onMounted(async () => {
  isLoading.value = true;
  error.value = null;
  const fetchedDropshipperId = getDropshipperId();
  console.log("Fetched Dropshipper ID:", fetchedDropshipperId);

  if (!fetchedDropshipperId) {
    error.value = "Không tìm thấy ID dropshipper trong local storage.";
    isLoading.value = false;
    return;
  }

  id.value = fetchedDropshipperId;

  try {
    // --- Fetch Dropshipper Dashboard Data ---
    const dashboardResponse = await getCurrentDropshipperSummary();
    if (dashboardResponse.success) {
      const dashboardData = dashboardResponse.data;
      dropshipperName.value = dashboardData.dropshipperName;
      supplierCount.value = dashboardData.supplierCount;
      registeredProductCount.value = dashboardData.registeredProductCount;
      completedOrderCount.value = dashboardData.completedOrderCount;
      soldProductQuantity.value = dashboardData.soldProductQuantity;
      completedOrderCountAllTime.value =
        dashboardData.completedOrderCountAllTime;
      soldProductQuantityAllTime.value =
        dashboardData.soldProductQuantityAllTime;
      currentMonth.value = dashboardData.month;
      currentYear.value = dashboardData.year;
    } else {
      console.error(
        "Lỗi khi lấy thông tin tổng hợp dropshipper:",
        dashboardResponse.message
      );

      // Fall back to basic dropshipper info if dashboard fails
      const dropshipperResponse = await getCurrentDropshipperInfo();
      if (dropshipperResponse.success) {
        const dropshipperData = dropshipperResponse.data;
        dropshipperName.value = dropshipperData.name;
      } else {
        error.value = `Lỗi khi lấy thông tin dropshipper: ${dropshipperResponse.message}`;
      }
    }
  } catch (err) {
    console.error("Lỗi trong quá trình fetch dữ liệu:", err);
    error.value = "Đã xảy ra lỗi khi tải dữ liệu.";
  } finally {
    isLoading.value = false;
  }
});

// --- Methods ---
const edit = () => {
  if (dropshipperName.value !== null) {
    editDialog.value = true;
    tempName.value = dropshipperName.value;
  }
};

const close = () => {
  editDialog.value = false;
};

const save = async () => {
  if (id.value) {
    const updateData = { name: tempName.value };

    try {
      const response = await updateCurrentDropshipper(updateData);
      if (response.success) {
        dropshipperName.value = tempName.value;
        toast.success("Đã cập nhật tên cửa hàng thành công");
        close();
      } else {
        toast.error(`Không thể cập nhật tên: ${response.message}`);
        console.error("Failed to update dropshipper name:", response.message);
      }
    } catch (err) {
      console.error("Error during update:", err);
      toast.error("Đã xảy ra lỗi khi cập nhật tên");
    }
  }
};

const requiredValidator = (value: string | null | undefined) => {
  return !!value || "Trường này là bắt buộc";
};
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex align-center">
      <VIcon icon="bx-store" size="2rem" class="me-2" />
      <span>Thông tin chung</span>
    </VCardTitle>

    <VCardText v-if="isLoading" class="text-center mt-6">
      <VProgressCircular indeterminate color="primary" />
      <p>Đang tải dữ liệu...</p>
    </VCardText>

    <VCardText v-else-if="error" class="text-center mt-6">
      <VAlert type="error" prominent>
        {{ error }}
      </VAlert>
    </VCardText>

    <VCardText v-else class="mt-6">
      <!-- Thông tin cơ bản -->
      <h4 class="mb-3">Thông tin cơ bản</h4>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Tên cửa hàng:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ dropshipperName ?? "N/A" }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Mã cửa hàng:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ id ?? "N/A" }}</div>
        </VCol>
      </VRow>

      <!-- Thông tin tổng quan -->
      <h4 class="mt-5 mb-3">Tổng quan</h4>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng nhà cung cấp liên kết:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ supplierCount ?? "N/A" }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng sản phẩm đăng ký bán:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ registeredProductCount ?? "N/A" }}</div>
        </VCol>
      </VRow>

      <!-- Thông tin tổng hợp theo tháng -->
      <h4 class="mt-5 mb-3">
        Tổng hợp tháng {{ currentMonth ?? "N/A" }}/{{ currentYear ?? "N/A" }}
      </h4>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng đơn hàng hoàn thành:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ completedOrderCount ?? "N/A" }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng sản phẩm đã bán:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ soldProductQuantity ?? "N/A" }}</div>
        </VCol>
      </VRow>

      <!-- Thông tin tổng hợp toàn thời gian -->
      <h4 class="mt-5 mb-3">Tổng hợp toàn thời gian</h4>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Tổng số đơn hàng hoàn thành:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">
            {{ completedOrderCountAllTime ?? "N/A" }}
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Tổng số sản phẩm đã bán:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">
            {{ soldProductQuantityAllTime ?? "N/A" }}
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <!-- Edit Dialog -->
  <VDialog v-model="editDialog" max-width="600px">
    <VCard title="Chỉnh sửa thông tin">
      <VCardText>
        <VForm @submit.prevent="save">
          <VRow>
            <!-- Dropshipper Name -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="tempName"
                label="Tên Cửa Hàng"
                :rules="[requiredValidator]"
                autofocus
              />
            </VCol>

            <!-- Dropshipper ID (Readonly) -->
            <VCol cols="12" sm="6">
              <VTextField
                :model-value="id"
                label="Mã Cửa Hàng"
                readonly
                disabled
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn color="error" variant="outlined" @click="close"> Hủy </VBtn>
        <VBtn color="success" variant="elevated" @click="save"> Lưu </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Edit Button: Disable if loading or error -->
  <div class="dock-button">
    <VBtn @click="edit" :disabled="isLoading || !!error || !dropshipperName">
      <VIcon icon="bx-edit" class="ms-0 me-1" />
      | Chỉnh sửa
    </VBtn>
  </div>
</template>

<style scoped>
.dock-button {
  position: fixed; /* Cố định vị trí */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
  inset-block-start: 100px; /* Cách phía trên 20px */
  inset-inline-end: 50px; /* Cách phía phải 20px */
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}

.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}

.text-button {
  font-weight: 500;
  min-block-size: 24px; /* Ensure consistent height even when empty */
}
</style>
