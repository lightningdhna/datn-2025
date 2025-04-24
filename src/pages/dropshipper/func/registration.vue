<script setup lang="ts">
import { formatDate, formatPrice } from "@/utils/formatters";
import { getProductById } from "@/utils/product-api";
import {
createRegistrationForCurrentDropshipper,
getRegistrationsByCurrentDropshipper,
removeRegistrationForCurrentDropshipper,
} from "@/utils/registration-api";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const isLoading = ref(true);
const search = ref("");
const activeTab = ref(0);

// Data
const pendingRegistrations = ref<any[]>([]);
const approvedRegistrations = ref<any[]>([]);
const rejectedRegistrations = ref<any[]>([]);

// Dialogs
const registrationDialog = ref(false);
const confirmDeleteDialog = ref(false);
const selectedProduct = ref<any>(null);
const registrationCommissionFee = ref<number>(5); // Default commission fee

// Fetch registrations
const fetchRegistrations = async () => {
  isLoading.value = true;
  try {
    // Fetch pending registrations
    const pendingResult = await getRegistrationsByCurrentDropshipper(0);
    if (pendingResult.success && 'data' in pendingResult) {
      pendingRegistrations.value = pendingResult.data.map((reg: any) => ({
        id: `${reg.dropshipperId}_${reg.productId}`,
        productId: reg.productId,
        productName: reg.product?.name || "Unknown Product",
        productPrice: reg.product?.price || 0,
        supplierName: reg.product?.supplier?.name || "Unknown Supplier",
        supplierId: reg.product?.supplierId,
        commissionFee: reg.commissionFee,
        createdDate: new Date(reg.createdDate),
        status: reg.status,
      }));
    }

    // Fetch approved registrations
    const approvedResult = await getRegistrationsByCurrentDropshipper(1);
    if (approvedResult.success && 'data' in approvedResult) {
      approvedRegistrations.value = approvedResult.data.map((reg: any) => ({
        id: `${reg.dropshipperId}_${reg.productId}`,
        productId: reg.productId,
        productName: reg.product?.name || "Unknown Product",
        productPrice: reg.product?.price || 0,
        supplierName: reg.product?.supplier?.name || "Unknown Supplier",
        supplierId: reg.product?.supplierId,
        commissionFee: reg.commissionFee,
        createdDate: new Date(reg.createdDate),
        status: reg.status,
      }));
    }

    // Fetch rejected registrations
    const rejectedResult = await getRegistrationsByCurrentDropshipper(2);
    if (rejectedResult.success && 'data' in rejectedResult) {
      rejectedRegistrations.value = rejectedResult.data.map((reg: any) => ({
        id: `${reg.dropshipperId}_${reg.productId}`,
        productId: reg.productId,
        productName: reg.product?.name || "Unknown Product",
        productPrice: reg.product?.price || 0,
        supplierName: reg.product?.supplier?.name || "Unknown Supplier",
        supplierId: reg.product?.supplierId,
        commissionFee: reg.commissionFee,
        createdDate: new Date(reg.createdDate),
        status: reg.status,
      }));
    }
  } catch (error) {
    console.error("Lỗi khi tải đăng ký:", error);
    toast.error("Đã xảy ra lỗi khi tải danh sách đăng ký");
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchRegistrations();
});

// Table headers
const registrationHeaders = [
  { title: "Sản phẩm", key: "productName" },
  { title: "Giá", key: "productPrice", align: "end" },
  { title: "Nhà cung cấp", key: "supplierName" },
  { title: "Phí hoa hồng", key: "commissionFee", align: "end" },
  { title: "Ngày đăng ký", key: "createdDate" },
  { title: "Thao tác", key: "actions", align: "center" },
] as const;

// Navigation functions
const viewProductDetails = (productId: string) => {
  router.push(`/dropshipper/product-info/${productId}`);
};

const viewSupplierDetails = (supplierId: string) => {
  router.push(`/dropshipper/supplier-info/${supplierId}`);
};

// Create new registration
const openRegistrationDialog = async (productId: string) => {
  try {
    isLoading.value = true;
    const productResult = await getProductById(productId);
    if (productResult.success && 'data' in productResult) {
      selectedProduct.value = productResult.data;
      registrationDialog.value = true;
    } else {
      const errorMessage = 'message' in productResult 
        ? productResult.message 
        : "Lỗi không xác định";
      toast.error(`Không thể tải thông tin sản phẩm: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Lỗi khi tải thông tin sản phẩm:", error);
    toast.error("Đã xảy ra lỗi khi tải thông tin sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

// Remove registration
const confirmRemoveRegistration = (registration: any) => {
  selectedProduct.value = {
    id: registration.productId,
    name: registration.productName,
  };
  confirmDeleteDialog.value = true;
};

// Create registration
const createRegistration = async () => {
  if (!selectedProduct.value?.id) return;

  try {
    isLoading.value = true;
    const createResult = await createRegistrationForCurrentDropshipper(
      selectedProduct.value.id,
      registrationCommissionFee.value
    );

    if (createResult.success) {
      toast.success("Đã đăng ký bán sản phẩm thành công!");
      registrationDialog.value = false;
      await fetchRegistrations(); // Refresh registrations
    } else {
      const errorMessage = 'message' in createResult 
        ? createResult.message 
        : "Lỗi không xác định";
      toast.error("Lỗi khi đăng ký sản phẩm: " + errorMessage);
    }
  } catch (error) {
    console.error("Lỗi khi đăng ký sản phẩm:", error);
    toast.error("Đã xảy ra lỗi khi đăng ký sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

// Delete registration
const deleteRegistration = async () => {
  if (!selectedProduct.value?.id) return;

  try {
    isLoading.value = true;
    const result = await removeRegistrationForCurrentDropshipper(selectedProduct.value.id);
    
    if (result.success) {
      toast.success("Đã xóa đăng ký thành công!");
      confirmDeleteDialog.value = false;
      await fetchRegistrations(); // Refresh registrations
    } else {
      const errorMessage = 'message' in result 
        ? result.message 
        : "Lỗi không xác định";
      toast.error("Lỗi khi xóa đăng ký: " + errorMessage);
    }
  } catch (error) {
    console.error("Lỗi khi xóa đăng ký:", error);
    toast.error("Đã xảy ra lỗi khi xóa đăng ký");
  } finally {
    isLoading.value = false;
    confirmDeleteDialog.value = false;
  }
};

// Refresh data
const refreshData = async () => {
  await fetchRegistrations();
  toast.success("Đã làm mới danh sách đăng ký");
};

// Get current registrations based on active tab
const currentRegistrations = computed(() => {
  switch (activeTab.value) {
    case 0:
      return pendingRegistrations.value;
    case 1:
      return approvedRegistrations.value;
    case 2:
      return rejectedRegistrations.value;
    default:
      return [];
  }
});
</script>

<template>
  <section>
    <VCard>
      <!-- HEADER -->
      <VCardItem>
        <VCardTitle class="text-h5 d-flex align-center">
          <VIcon icon="bx-registered" class="me-2" />
          Quản lý đăng ký sản phẩm
          <VSpacer />
          <VBtn
            icon
            size="small"
            variant="text"
            color="default"
            @click="refreshData"
          >
            <VIcon icon="bx-refresh" />
          </VBtn>
        </VCardTitle>
      </VCardItem>

      <VDivider />

      <VCardText>
        <VRow>
          <VCol cols="12" md="6">
              <VTextField
                v-model="search"
              density="compact"
              label="Tìm kiếm đăng ký"
              prepend-inner-icon="bx-search"
              clearable
                single-line
                hide-details
              />
            </VCol>
          <VCol cols="12" md="6" class="d-flex justify-end">
            <VBtn
            color="primary"
              prepend-icon="bx-plus"
              @click="router.push('/dropshipper/product')"
            >
              Thêm đăng ký mới
            </VBtn>
          </VCol>
          </VRow>

        <!-- Tabs -->
        <VTabs v-model="activeTab" class="mt-4">
          <VTab :value="0" class="text-capitalize">
            <VBadge
              :content="pendingRegistrations.length"
              :model-value="pendingRegistrations.length > 0"
              color="warning"
              class="me-3"
            >
              Chờ duyệt
            </VBadge>
          </VTab>
          <VTab :value="1" class="text-capitalize">
            <VBadge
              :content="approvedRegistrations.length"
              :model-value="approvedRegistrations.length > 0"
              color="success"
              class="me-3"
            >
              Đã duyệt
            </VBadge>
          </VTab>
          <VTab :value="2" class="text-capitalize">
            <VBadge
              :content="rejectedRegistrations.length"
              :model-value="rejectedRegistrations.length > 0"
              color="error"
              class="me-3"
            >
              Bị từ chối
            </VBadge>
          </VTab>
        </VTabs>

        <VWindow v-model="activeTab" class="mt-5">
          <VWindowItem v-for="tabIndex in [0, 1, 2]" :key="tabIndex" :value="tabIndex">
        <VDataTable
              :headers="registrationHeaders"
              :items="currentRegistrations"
          :search="search"
              :loading="isLoading"
              hover
              item-value="id"
            >
              <template #item.productPrice="{ item }">
                {{ formatPrice(item.productPrice) }}
              </template>

              <template #item.commissionFee="{ item }">
                {{ item.commissionFee }}%
              </template>

              <template #item.createdDate="{ item }">
                {{ formatDate(item.createdDate) }}
          </template>

              <template #item.actions="{ item }">
                <div class="d-flex gap-1 justify-center">
                  <VBtn
                    icon
                    size="small"
                    color="primary"
                    variant="text"
                    @click="viewProductDetails(item.productId)"
                  >
                    <VIcon icon="bx-package" />
                    <VTooltip activator="parent" location="top">
                      Xem chi tiết sản phẩm
                    </VTooltip>
                  </VBtn>

                  <VBtn
                    icon
                    size="small"
                    color="secondary"
                    variant="text"
                    @click="viewSupplierDetails(item.supplierId)"
                  >
                    <VIcon icon="bx-store" />
                    <VTooltip activator="parent" location="top">
                      Xem thông tin nhà cung cấp
                    </VTooltip>
                  </VBtn>

                  <VBtn
                    v-if="activeTab === 0" 
                    icon
                    size="small"
                    color="warning"
                    variant="text"
                    @click="openRegistrationDialog(item.productId)"
                  >
                    <VIcon icon="bx-edit" />
                    <VTooltip activator="parent" location="top">
                      Chỉnh sửa đăng ký
                    </VTooltip>
                  </VBtn>

                  <VBtn
                    v-if="activeTab !== 1"
                    icon
                    size="small"
                    color="error"
                    variant="text"
                    @click="confirmRemoveRegistration(item)"
                  >
                    <VIcon icon="bx-trash" />
                    <VTooltip activator="parent" location="top">
                      Xóa đăng ký
                    </VTooltip>
                  </VBtn>
                </div>
          </template>

              <template #no-data>
                <div class="text-center pa-4">
                  <p v-if="activeTab === 0">Không có đăng ký nào đang chờ duyệt</p>
                  <p v-else-if="activeTab === 1">Không có đăng ký nào đã được duyệt</p>
                  <p v-else>Không có đăng ký nào bị từ chối</p>
                </div>
          </template>
        </VDataTable>
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCard>

    <!-- Registration Dialog -->
    <VDialog
      v-model="registrationDialog"
      max-width="500px"
      persistent
    >
      <VCard v-if="selectedProduct">
        <VCardTitle class="text-h5">
          Cập nhật đăng ký
        </VCardTitle>
        <VCardText>
          <VRow class="mt-2">
            <VCol cols="12">
              <p>{{ selectedProduct.name }}</p>
              <p class="text-subtitle-2">Giá: {{ formatPrice(selectedProduct.price) }}</p>
              </VCol>
            <VCol cols="12">
              <VSlider
                v-model="registrationCommissionFee"
                label="Phí hoa hồng (%)"
                min="1"
                max="20"
                step="0.5"
                thumb-label
              ></VSlider>
              </VCol>
            <VCol cols="12">
              <p class="text-caption">
                * Cập nhật đăng ký sẽ xóa đăng ký hiện tại và tạo đăng ký mới.
                Đăng ký mới sẽ được gửi tới nhà cung cấp để duyệt lại.
              </p>
              </VCol>
            </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
            color="error"
            variant="text"
            @click="registrationDialog = false"
          >
            Hủy
          </VBtn>
          <VBtn
            color="primary"
            @click="createRegistration"
            :loading="isLoading"
          >
            Cập nhật
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Confirm Delete Dialog -->
    <VDialog
      v-model="confirmDeleteDialog"
      max-width="500px"
    >
      <VCard v-if="selectedProduct">
        <VCardTitle class="text-h5">
          Xác nhận xóa đăng ký
        </VCardTitle>
        <VCardText>
          Bạn có chắc chắn muốn xóa đăng ký của sản phẩm "{{ selectedProduct.name }}"?
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
            color="primary"
            variant="text"
            @click="confirmDeleteDialog = false"
          >
            Hủy
          </VBtn>
          <VBtn
            color="error"
            @click="deleteRegistration"
            :loading="isLoading"
          >
            Xác nhận xóa
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </section>
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
