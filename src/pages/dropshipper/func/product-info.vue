import { defineComponent } from "@vue/composition-api";
<script setup lang="ts">
import { getProductById, getProductSummary } from '@/utils/dropshipper-product-api';
import { formatDate, formatPrice } from '@/utils/formatters';
import {
createRegistrationForCurrentDropshipper,
getRegistrationsByCurrentDropshipper,
removeRegistrationForCurrentDropshipper,
} from "@/utils/registration-api";
import { getWarehousesByProduct } from "@/utils/warehouse-api";
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const id = ref(route.params.id as string);

const isLoading = ref(true);
const product = ref<any>({
  id: '',
  name: '',
  description: '',
  price: 0,
  supplierName: '',
  supplierId: '',
  category: '',
  createdAt: '',
  updatedAt: '',
  status: '',
  images: [],
  date: null,
  weight: 0,
  volume: 0,
  note: '',
});

const productSummary = ref<any>({
  totalStock: 0,
  totalSales: 0,
  averageRating: 0,
  reviewCount: 0,
  totalStockQuantity: 0,
  warehouseCount: 0,
  dropshipperCount: 0,
});

const error = ref<string | null>(null);
const activeTab = ref(0);
const search = ref("");

// Registration status
const registrationStatus = ref<number | null>(null); // 0: pending, 1: approved, 2: rejected, null: not registered
const registrationId = ref<string | null>(null);
const registrationCommissionFee = ref<number>(5); // Default commission fee

// Dialog controls
const registrationDialog = ref(false);
const confirmDeleteDialog = ref(false);

// Fetch product details
const fetchProductDetails = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Get basic product information
    const productData = await getProductById(id.value);
    product.value = productData;
    
    // Get product summary
    const summaryData = await getProductSummary(id.value);
    productSummary.value = summaryData;

    // Fetch warehouses that have this product
    const warehouseResult = await getWarehousesByProduct(id.value);
    if (warehouseResult.success && warehouseResult.data) {
      productSummary.value.warehouseCount = warehouseResult.data.length;
      productSummary.value.totalStockQuantity = warehouseResult.data.reduce((total: number, warehouse: any) => total + (warehouse.warehouseProducts?.find((wp: any) => wp.productId === id.value)?.quantity || 0), 0);
    }

    // Check current dropshipper's registration status
    const registrationsResult = await getRegistrationsByCurrentDropshipper();
    if (registrationsResult.success && registrationsResult.data) {
      const registrations = registrationsResult.data;
      const currentRegistration = registrations.find(
        (reg: any) => reg.productId === id.value
      );

      if (currentRegistration) {
        registrationStatus.value = currentRegistration.status;
        registrationId.value = `${currentRegistration.dropshipperId}_${currentRegistration.productId}`;
        registrationCommissionFee.value = currentRegistration.commissionFee;
      } else {
        registrationStatus.value = null;
        registrationId.value = null;
      }
    }
  } catch (err) {
    console.error('Error fetching product details:', err);
    error.value = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.';
  } finally {
    isLoading.value = false;
  }
};

// Format rating for display
const formattedRating = (rating: number) => {
  return rating.toFixed(1);
};

// Get star rating display
const getRatingStars = (rating: number) => {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
};

// Get color for stock status
const getStockColor = (quantity: number) => {
  if (quantity <= 0) return 'error';
  if (quantity < 10) return 'warning';
  return 'success';
};

// Get text for stock status
const getStockText = (quantity: number) => {
  if (quantity <= 0) return 'Hết hàng';
  if (quantity < 10) return 'Sắp hết hàng';
  return 'Còn hàng';
};

// Navigate back
const goBack = () => {
  router.push('/dropshipper/func/product');
};

// Initialize component
onMounted(() => {
  if (id.value) {
    fetchProductDetails();
  } else {
    error.value = 'Không tìm thấy sản phẩm';
    isLoading.value = false;
  }
});

// Table headers
const warehouseHeaders = [
  { title: "Tên kho", key: "name" },
  { title: "Vị trí", key: "location" },
  { title: "Số lượng", key: "quantity", align: "end" },
  { title: "Chi tiết", key: "action", align: "center" },
] as const;

// Computed properties for button configuration
const registrationButtonConfig = computed(() => {
  if (registrationStatus.value === null) {
    // Not registered
    return {
      color: "success",
      text: "Đăng ký bán sản phẩm",
      icon: "bx-plus-circle",
      action: () => (registrationDialog.value = true),
    };
  } else if (registrationStatus.value === 0) {
    // Pending
    return {
      color: "warning",
      text: "Chỉnh sửa đăng ký",
      icon: "bx-edit",
      action: () => (registrationDialog.value = true),
    };
  } else if (registrationStatus.value === 1) {
    // Approved
    return {
      color: "primary",
      text: "Đăng ký lại",
      icon: "bx-refresh",
      action: () => (confirmDeleteDialog.value = true),
    };
  } else {
    // Rejected or other status
    return {
      color: "error",
      text: "Đăng ký bán lại",
      icon: "bx-plus-circle",
      action: () => (registrationDialog.value = true),
    };
  }
});

// Navigation functions
const viewWarehouseDetails = (warehouseId: string) => {
  router.push(`/dropshipper/warehouse-info/${warehouseId}`);
};

const viewSupplierDetails = (supplierId: string) => {
  router.push(`/dropshipper/supplier-info/${supplierId}`);
};

// Refresh data
const refreshData = async () => {
  if (id.value) {
    await fetchProductDetails();
    toast.success("Đã làm mới dữ liệu sản phẩm");
  }
};

// Registration logic
const createRegistration = async () => {
  if (!id.value) return;

  try {
    isLoading.value = true;
    
    // If there's an existing registration, remove it first
    if (registrationId.value) {
      const deleteResult = await removeRegistrationForCurrentDropshipper(id.value);
      if (!deleteResult.success) {
        toast.error("Không thể xóa đăng ký cũ: " + (deleteResult.message || "Lỗi không xác định"));
        return;
      }
    }

    // Create new registration
    const createResult = await createRegistrationForCurrentDropshipper(
      id.value,
      registrationCommissionFee.value
    );

    if (createResult.success) {
      toast.success("Đã đăng ký bán sản phẩm thành công!");
      registrationDialog.value = false;
      await fetchProductDetails(); // Refresh data to update status
    } else {
      toast.error("Lỗi khi đăng ký sản phẩm: " + (createResult.message || "Lỗi không xác định"));
    }
  } catch (error) {
    console.error("Lỗi khi đăng ký sản phẩm:", error);
    toast.error("Đã xảy ra lỗi khi đăng ký sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

// Delete registration to re-register
const deleteRegistration = async () => {
  if (!id.value) return;

  try {
    isLoading.value = true;
    const result = await removeRegistrationForCurrentDropshipper(id.value);
    
    if (result.success) {
      toast.success("Đã xóa đăng ký thành công!");
      confirmDeleteDialog.value = false;
      registrationDialog.value = true; // Open registration dialog
      await fetchProductDetails(); // Refresh data to update status
    } else {
      toast.error("Lỗi khi xóa đăng ký: " + (result.message || "Lỗi không xác định"));
    }
  } catch (error) {
    console.error("Lỗi khi xóa đăng ký:", error);
    toast.error("Đã xảy ra lỗi khi xóa đăng ký");
  } finally {
    isLoading.value = false;
    confirmDeleteDialog.value = false;
  }
};
</script>

<template>
  <VCard>
    <template #prepend>
      <div class="d-flex align-center pa-2">
        <VBtn
          icon
          variant="text"
          color="default"
          size="small"
          @click="goBack"
        >
          <VIcon icon="mdi-arrow-left" />
        </VBtn>
      </div>
    </template>
    
    <VCardItem>
      <VCardTitle class="text-h5 d-flex align-center">
        <VIcon icon="mdi-package-variant" class="me-2" />
        Chi tiết sản phẩm
      </VCardTitle>
    </VCardItem>

    <VDivider />

    <!-- Loading and error states -->
    <VCardText v-if="isLoading">
      <div class="d-flex justify-center align-center pa-4">
        <VProgressCircular indeterminate color="primary" />
      </div>
    </VCardText>

    <VCardText v-else-if="error">
      <VAlert type="error" variant="tonal">
        {{ error }}
      </VAlert>
      <div class="d-flex justify-center mt-4">
        <VBtn color="primary" @click="goBack">
          Quay lại danh sách sản phẩm
        </VBtn>
      </div>
    </VCardText>

    <!-- Product details when loaded -->
    <template v-else>
      <VCardText>
        <VRow>
          <!-- Product Images -->
          <VCol cols="12" md="5">
            <VCard flat class="border rounded mb-4">
              <VImg
                :src="product.images && product.images.length > 0 
                  ? product.images[0] 
                  : '/images/product-placeholder.png'"
                :alt="product.name"
                height="300"
                cover
                class="rounded"
              />
            </VCard>

            <VRow v-if="product.images && product.images.length > 1">
              <VCol v-for="(image, index) in product.images.slice(1, 5)" :key="index" cols="3">
                <VImg
                  :src="image"
                  :alt="`${product.name} - ${index + 1}`"
                  height="70"
                  cover
                  class="rounded border"
                />
              </VCol>
            </VRow>
          </VCol>

          <!-- Product Information -->
          <VCol cols="12" md="7">
            <h1 class="text-h4 mb-2">{{ product.name }}</h1>
            
            <div class="d-flex align-center mb-4">
              <VRating
                :model-value="productSummary.averageRating"
                color="amber"
                density="comfortable"
                half-increments
                readonly
                size="small"
              />
              <span class="text-body-1 ms-2">
                {{ formattedRating(productSummary.averageRating) }}
              </span>
              <span class="text-caption text-medium-emphasis ms-2">
                ({{ productSummary.reviewCount }} đánh giá)
              </span>
              <VDivider vertical class="mx-4" />
              <span class="text-body-2">
                <span class="text-success font-weight-bold">{{ productSummary.totalSales }}</span> đã bán
              </span>
            </div>

            <div class="text-h5 font-weight-bold primary--text mb-4">
              {{ formatPrice(product.price) }}
            </div>

            <VDivider class="mb-4" />

            <div class="product-details mb-4">
              <div class="detail-item d-flex">
                <div class="detail-label text-medium-emphasis">Trạng thái:</div>
                <div class="detail-value">
                  <VChip
                    :color="getStockColor(productSummary.totalStock)"
                    size="small"
                    label
                  >
                    {{ getStockText(productSummary.totalStock) }}
                  </VChip>
                </div>
              </div>

              <div class="detail-item d-flex">
                <div class="detail-label text-medium-emphasis">Số lượng còn:</div>
                <div class="detail-value">{{ productSummary.totalStock }}</div>
              </div>

              <div class="detail-item d-flex">
                <div class="detail-label text-medium-emphasis">Mã sản phẩm:</div>
                <div class="detail-value">{{ product.id }}</div>
              </div>

              <div class="detail-item d-flex">
                <div class="detail-label text-medium-emphasis">Nhà cung cấp:</div>
                <div class="detail-value">{{ product.supplierName }}</div>
              </div>

              <div class="detail-item d-flex">
                <div class="detail-label text-medium-emphasis">Danh mục:</div>
                <div class="detail-value">{{ product.category || 'Chưa phân loại' }}</div>
              </div>

              <div class="detail-item d-flex">
                <div class="detail-label text-medium-emphasis">Ngày nhập:</div>
                <div class="detail-value">{{ formatDate(product.createdAt) }}</div>
              </div>

              <div class="detail-item d-flex">
                <div class="detail-label text-medium-emphasis">Cập nhật lần cuối:</div>
                <div class="detail-value">{{ formatDate(product.updatedAt) }}</div>
              </div>
            </div>

            <VDivider class="mb-4" />

            <!-- Action buttons -->
            <div class="d-flex gap-4">
              <VBtn
                color="primary"
                block
                :disabled="productSummary.totalStock <= 0"
                size="large"
                class="text-capitalize"
                @click="router.push(`/dropshipper/order/new?productId=${product.id}`)"
              >
                <VIcon icon="mdi-cart-outline" start class="me-1" />
                Tạo đơn hàng
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <!-- Product tabs -->
      <VTabs v-model="activeTab">
        <VTab value="0">Mô tả sản phẩm</VTab>
        <VTab value="1">Thông số</VTab>
        <VTab value="2">Đánh giá</VTab>
      </VTabs>

      <VDivider />

      <VWindow v-model="activeTab">
        <!-- Description tab -->
        <VWindowItem value="0">
          <VCardText>
            <div class="text-body-1">
              <div v-if="product.description" class="mt-2 description-content">
                {{ product.description }}
              </div>
              <div v-else class="text-center pa-4 text-medium-emphasis">
                Không có mô tả cho sản phẩm này.
              </div>
            </div>
          </VCardText>
        </VWindowItem>

        <!-- Specifications tab -->
        <VWindowItem value="1">
          <VCardText>
            <VTable>
              <tbody>
                <tr>
                  <td class="font-weight-bold" width="30%">Mã sản phẩm</td>
                  <td>{{ product.id }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Tên sản phẩm</td>
                  <td>{{ product.name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Danh mục</td>
                  <td>{{ product.category || 'Chưa phân loại' }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Nhà cung cấp</td>
                  <td>{{ product.supplierName }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Giá</td>
                  <td>{{ formatPrice(product.price) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Ngày nhập</td>
                  <td>{{ formatDate(product.createdAt) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Trạng thái</td>
                  <td>
                    <VChip
                      :color="getStockColor(productSummary.totalStock)"
                      size="small"
                      label
                    >
                      {{ getStockText(productSummary.totalStock) }}
                    </VChip>
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VWindowItem>

        <!-- Reviews tab -->
        <VWindowItem value="2">
          <VCardText>
            <div class="d-flex justify-center align-center pa-4">
              <div class="text-center">
                <div class="text-h3 primary--text mb-2">
                  {{ formattedRating(productSummary.averageRating) }}
                </div>
                <VRating
                  :model-value="productSummary.averageRating"
                  color="amber"
                  readonly
                  half-increments
                  size="small"
                />
                <div class="text-subtitle-1 mt-2">
                  {{ productSummary.reviewCount }} đánh giá
                </div>
              </div>
            </div>

            <VDivider class="my-4" />

            <div class="text-center pa-4 text-medium-emphasis">
              Chưa có đánh giá nào cho sản phẩm này.
            </div>
          </VCardText>
        </VWindowItem>
      </VWindow>
    </template>
  </VCard>

  <!-- Registration Dialog -->
  <VDialog
    v-model="registrationDialog"
    max-width="500px"
    persistent
  >
    <VCard>
      <VCardTitle class="text-h5">
        {{ registrationId ? 'Chỉnh sửa đăng ký' : 'Đăng ký bán sản phẩm' }}
      </VCardTitle>
      <VCardText>
        <VRow class="mt-2">
          <VCol cols="12">
            <p>{{ product.name }}</p>
            <p class="text-subtitle-2">Giá: {{ formatPrice(product.price) }}</p>
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
              * Đăng ký sản phẩm này sẽ được gửi tới nhà cung cấp để duyệt.
              Nhà cung cấp có thể chấp nhận hoặc từ chối đăng ký của bạn.
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
          {{ registrationId ? 'Cập nhật' : 'Đăng ký' }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Confirm Delete Dialog -->
  <VDialog
    v-model="confirmDeleteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle class="text-h5">
        Xác nhận xóa đăng ký
      </VCardTitle>
      <VCardText>
        Bạn đang yêu cầu xóa đăng ký hiện tại để đăng ký lại sản phẩm này.
        Việc này sẽ đưa sản phẩm vào trạng thái chờ duyệt lại. Bạn có chắc chắn muốn tiếp tục?
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
</template>

<style scoped>
.product-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
}

.detail-label {
  font-weight: 500;
  min-inline-size: 140px;
}

.detail-value {
  flex: 1;
}

.description-content {
  line-height: 1.6;
  white-space: pre-line;
}

@media (max-width: 600px) {
  .detail-item {
    flex-direction: column;
    margin-block-end: 12px;
  }

  .detail-label {
    margin-block-end: 4px;
  }
}
</style>
