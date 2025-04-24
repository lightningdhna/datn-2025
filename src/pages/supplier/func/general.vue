<script setup lang="ts">
import { getSupplierId } from "@/utils/local-storage";
import { getAllProductsBySupplier } from "@/utils/product-api";
import {
getCurrentSupplierInfo,
getCurrentSupplierSummary,
updateCurrentSupplier,
} from "@/utils/supplier-api";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

// --- State ---
const toast = useToast();
const supplierName = ref<string | null>(null);
const id = ref<string | null>(null);
const warehouseNumber = ref<number | null>(null);
const productNumber = ref<number | null>(null);
const dropshipperNumber = ref<number | null>(null);
const orderNumber = ref<number | null>(null);
const soldProductQuantity = ref<number | null>(null);
const currentMonth = ref<number | null>(null);
const currentYear = ref<number | null>(null);
const topDropshipper = ref<{
  id: string;
  name: string | null;
  quantity: number;
} | null>(null);

const isLoading = ref(true);
const error = ref<string | null>(null);

const editDialog = ref(false);
const tempName = ref("");

// --- Fetch Data ---
onMounted(async () => {
  isLoading.value = true;
  error.value = null;
  const fetchedSupplierId = getSupplierId();
  console.log("Fetched Supplier ID:", fetchedSupplierId);

  if (!fetchedSupplierId) {
    error.value = "Không tìm thấy ID nhà cung cấp trong local storage.";
    isLoading.value = false;
    return;
  }

  id.value = fetchedSupplierId;

  try {
    // --- Fetch Supplier Dashboard Data ---
    const dashboardResponse = await getCurrentSupplierSummary();
    if (dashboardResponse.success) {
      const dashboardData = dashboardResponse.data;
      supplierName.value = dashboardData.supplierName;
      warehouseNumber.value = dashboardData.warehouseCount;
      dropshipperNumber.value = dashboardData.dropshipperCount;
      orderNumber.value = dashboardData.completedOrderCount;
      soldProductQuantity.value = dashboardData.soldProductQuantity;
      topDropshipper.value = dashboardData.topDropshipper;
      currentMonth.value = dashboardData.month;
      currentYear.value = dashboardData.year;
    } else {
      console.error(
        "Lỗi khi lấy thông tin tổng hợp nhà cung cấp:",
        dashboardResponse.message
      );

      // Fall back to basic supplier info if dashboard fails
      const supplierResponse = await getCurrentSupplierInfo();
      if (supplierResponse.success) {
        const supplierData = supplierResponse.data;
        supplierName.value = supplierData.name;
      } else {
        error.value = `Lỗi khi lấy thông tin nhà cung cấp: ${supplierResponse.message}`;
      }
    }

    // --- Fetch Product Count ---
    const productResponse = await getAllProductsBySupplier();
    if (productResponse.success && Array.isArray(productResponse.data)) {
      productNumber.value = productResponse.data.length;
    } else {
      console.error("Lỗi khi lấy số lượng sản phẩm:", productResponse.message);
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
  if (supplierName.value !== null) {
    editDialog.value = true;
    tempName.value = supplierName.value;
  }
};

const close = () => {
  editDialog.value = false;
};

const save = async () => {
  if (id.value) {
    const updateData = { name: tempName.value };

    try {
      const response = await updateCurrentSupplier(updateData);
      if (response.success) {
        supplierName.value = tempName.value;
        toast.success("Đã cập nhật tên nhà cung cấp thành công");
        close();
      } else {
        toast.error(`Không thể cập nhật tên: ${response.message}`);
        console.error("Failed to update supplier name:", response.message);
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
      <VIcon icon="bx-buildings" size="2rem" class="me-2" />
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
          <div class="text-button">Tên Nhà cung cấp:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ supplierName ?? "N/A" }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Mã nhà cung cấp:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ id ?? "N/A" }}</div>
        </VCol>
      </VRow>

      <!-- Thông tin số lượng -->
      <h4 class="mt-5 mb-3">Tổng quan</h4>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng sản phẩm:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ productNumber ?? "N/A" }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng kho:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ warehouseNumber ?? "N/A" }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng dropshipper:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ dropshipperNumber ?? "N/A" }}</div>
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
          <div class="text-button">{{ orderNumber ?? "N/A" }}</div>
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

      <!-- Thông tin dropshipper nổi bật -->
      <h4 class="mt-5 mb-3">Dropshipper nổi bật</h4>
      <VRow v-if="topDropshipper">
        <VCol cols="12" sm="3">
          <div class="text-button">Tên dropshipper:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">
            {{ topDropshipper.name ?? "Không có tên" }}
          </div>
        </VCol>
      </VRow>
      <VRow v-if="topDropshipper">
        <VCol cols="12" sm="3">
          <div class="text-button">Mã dropshipper:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ topDropshipper.id }}</div>
        </VCol>
      </VRow>
      <VRow v-if="topDropshipper">
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng sản phẩm đã bán:</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ topDropshipper.quantity }}</div>
        </VCol>
      </VRow>
      <VRow v-else>
        <VCol cols="12">
          <div class="text-subtitle-1 text-medium-emphasis">
            Không có dữ liệu dropshipper nổi bật trong tháng này.
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>

  <!-- Edit Dialog remains largely the same, but ensure id is not null before showing -->
  <VDialog v-model="editDialog" max-width="600px">
    <VCard title="Chỉnh sửa thông tin">
      <VCardText>
        <VForm @submit.prevent="save">
          <VRow>
            <!-- Supplier Name -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="tempName"
                label="Tên Nhà Cung Cấp"
                :rules="[requiredValidator]"
                autofocus
              />
            </VCol>

            <!-- Supplier ID (Readonly) -->
            <VCol cols="12" sm="6">
              <VTextField
                :model-value="id"
                label="Mã Nhà Cung Cấp"
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
    <VBtn @click="edit" :disabled="isLoading || !!error || !supplierName">
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
