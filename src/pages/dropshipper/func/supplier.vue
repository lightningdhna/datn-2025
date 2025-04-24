<script setup lang="ts">
import { getProductsBySupplier } from "@/utils/dropshipper-product-api";
import { formatDate } from "@/utils/formatters";
import { getAllSuppliers, getSupplierSummary } from "@/utils/supplier-api";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  description?: string;
  productCount: number;
  createdAt: string;
  warehouses?: Array<{
    id: string;
    name: string;
  }>;
}

interface ProductSummary {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
}

const router = useRouter();
const toast = useToast();

const search = ref("");
const isLoading = ref(true);
const supplierList = ref<Supplier[]>([]);
const selectedSupplier = ref<Supplier | null>(null);
const showDialog = ref(false);
const supplierDetail = ref<any>(null);
const supplierProducts = ref<ProductSummary[]>([]);
const loadingDetail = ref(false);
const filterOptions = ref({
  hasProducts: false,
  hasWarehouses: false,
});

// Computed properties for filtering
const filteredSuppliers = computed(() => {
  let filtered = [...supplierList.value];
  
  if (filterOptions.value.hasProducts) {
    filtered = filtered.filter(supplier => 
      supplier.productCount && supplier.productCount > 0
    );
  }
  
  if (filterOptions.value.hasWarehouses) {
    filtered = filtered.filter(supplier => 
      supplier.warehouses && supplier.warehouses.length > 0
    );
  }
  
  return filtered;
});

// Fetch supplier list from API
const fetchSupplierList = async () => {
  isLoading.value = true;
  try {
    const result = await getAllSuppliers();
    if (result.success && 'data' in result) {
      supplierList.value = result.data;
    } else {
      const errorMessage = 'error' in result ? result.error : "Unknown error";
      const userMessage = 'message' in result ? result.message : "Lỗi không xác định";
      console.error("Lỗi khi lấy danh sách nhà cung cấp:", errorMessage);
      toast.error(`Không thể lấy danh sách nhà cung cấp: ${userMessage}`);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    toast.error("Đã xảy ra lỗi khi tải danh sách nhà cung cấp");
  } finally {
    isLoading.value = false;
  }
};

// Fetch supplier detail
const fetchSupplierDetail = async (supplierId: string) => {
  loadingDetail.value = true;
  try {
    const [summaryResult, productsResult] = await Promise.all([
      getSupplierSummary(supplierId),
      getProductsBySupplier(supplierId)
    ]);
    
    if (summaryResult.success && 'data' in summaryResult) {
      supplierDetail.value = summaryResult.data;
    }
    
    if (productsResult.success && 'data' in productsResult) {
      supplierProducts.value = productsResult.data;
    }
    
    showDialog.value = true;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin chi tiết nhà cung cấp:", error);
    toast.error("Đã xảy ra lỗi khi tải thông tin chi tiết nhà cung cấp");
  } finally {
    loadingDetail.value = false;
  }
};

const viewSupplierDetail = (supplier: Supplier) => {
  selectedSupplier.value = supplier;
  router.push(`/dropshipper/supplier-info/${supplier.id}`);
};

const viewSupplierProducts = (supplier: Supplier) => {
  router.push({
    path: '/dropshipper/func/product',
    query: { supplierId: supplier.id }
  });
};

const resetFilters = () => {
  filterOptions.value = {
    hasProducts: false,
    hasWarehouses: false
  };
};

onMounted(() => {
  fetchSupplierList();
});

// Format the created date
const formatCreatedDate = (date: string) => {
  if (!date) return "N/A";
  return formatDate(new Date(date));
};

// headers
const headers = [
  { title: "", key: "data-table-expand", sortable: false },
  { title: "Tên nhà cung cấp", key: "name", sortable: true },
  { title: "Email", key: "email", sortable: true },
  { title: "Số điện thoại", key: "phone", sortable: true },
  { title: "Số lượng sản phẩm", key: "productCount", sortable: true, align: 'center' },
  { title: "Số lượng kho hàng", key: "warehouseCount", sortable: true, align: 'center' },
  { title: "Ngày gia nhập", key: "createdAt", sortable: true },
  { title: "Thao tác", key: "actions", sortable: false, align: 'center' },
] as const;
</script>

<template>
  <div>
    <!-- Summary Cards -->
    <VRow>
      <VCol cols="12" sm="6" lg="3">
        <VCard class="mb-4" elevation="3">
          <VCardItem>
            <template #prepend>
              <VAvatar rounded color="primary" variant="tonal" size="48">
                <VIcon size="24" icon="bx-buildings" />
              </VAvatar>
            </template>
            <VCardTitle>
              {{ supplierList.length || 0 }}
              <VCardSubtitle>Tổng số nhà cung cấp</VCardSubtitle>
            </VCardTitle>
          </VCardItem>
        </VCard>
      </VCol>
      
      <VCol cols="12" sm="6" lg="3">
        <VCard class="mb-4" elevation="3">
          <VCardItem>
            <template #prepend>
              <VAvatar rounded color="success" variant="tonal" size="48">
                <VIcon size="24" icon="bx-package" />
              </VAvatar>
            </template>
            <VCardTitle>
              {{ supplierList.reduce((sum, supplier) => sum + (supplier.productCount || 0), 0) }}
              <VCardSubtitle>Tổng số sản phẩm</VCardSubtitle>
            </VCardTitle>
          </VCardItem>
        </VCard>
      </VCol>
      
      <VCol cols="12" sm="6" lg="3">
        <VCard class="mb-4" elevation="3">
          <VCardItem>
            <template #prepend>
              <VAvatar rounded color="info" variant="tonal" size="48">
                <VIcon size="24" icon="bx-store" />
              </VAvatar>
            </template>
            <VCardTitle>
              {{ supplierList.reduce((sum, supplier) => sum + (supplier.warehouses?.length || 0), 0) }}
              <VCardSubtitle>Tổng số kho hàng</VCardSubtitle>
            </VCardTitle>
          </VCardItem>
        </VCard>
      </VCol>
      
      <VCol cols="12" sm="6" lg="3">
        <VCard class="mb-4" elevation="3">
          <VCardItem>
            <template #prepend>
              <VAvatar rounded color="warning" variant="tonal" size="48">
                <VIcon size="24" icon="bx-transfer-alt" />
              </VAvatar>
            </template>
            <VCardTitle>
              {{ supplierList.filter(s => s.productCount > 0).length }}
              <VCardSubtitle>Nhà cung cấp có sản phẩm</VCardSubtitle>
            </VCardTitle>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>

    <!-- Main Content -->
    <VCard>
      <VCardItem class="d-flex flex-wrap pb-2">
        <VCardTitle class="text-primary me-auto d-flex align-center">
          <VIcon icon="bx-buildings" class="me-2"></VIcon>
          Danh sách Nhà cung cấp
        </VCardTitle>
        <div class="d-flex align-center">
          <VBtn 
            color="primary" 
            variant="text" 
            size="small" 
            class="me-2"
            prepend-icon="bx-refresh"
            @click="fetchSupplierList"
            :loading="isLoading"
          >
            Làm mới
          </VBtn>
        </div>
      </VCardItem>

      <VDivider />
      
      <VCardText class="pt-4">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="search"
              placeholder="Tìm kiếm theo tên, email, mã số..."
              append-inner-icon="bx-search"
              density="compact"
              hide-details
              variant="outlined"
              class="mb-4"
            />
          </VCol>
          
          <VCol cols="12" md="8">
            <div class="d-flex flex-wrap gap-4 justify-end">
              <VCheckbox
                v-model="filterOptions.hasProducts"
                label="Có sản phẩm"
                density="compact"
                hide-details
              />
              
              <VCheckbox
                v-model="filterOptions.hasWarehouses"
                label="Có kho hàng"
                density="compact"
                hide-details
              />
              
              <VBtn
                size="small"
                variant="tonal"
                color="secondary"
                @click="resetFilters"
              >
                <VIcon icon="bx-reset" class="me-1" size="18"></VIcon>
                Xóa bộ lọc
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCardText>

      <!-- Data Table -->
      <VDataTable
        :headers="headers"
        :items="filteredSuppliers"
        :search="search"
        :items-per-page="10"
        :loading="isLoading"
        items-per-page-text="Nhà cung cấp trên trang"
        expand-on-click
        hover
        class="text-no-wrap supplier-table"
      >
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td :colspan="headers.length">
              <div class="px-4 py-3">
                <VCard flat border class="pa-3">
                  <VRow>
                    <VCol cols="12" sm="6" md="4" class="mb-2">
                      <div class="d-flex align-center">
                        <VIcon icon="bx-map" color="primary" class="me-2" />
                        <strong>Địa chỉ:</strong> 
                        <span class="ms-2">{{ slotProps.item.address || 'Chưa cập nhật' }}</span>
                      </div>
                    </VCol>
                    
                    <VCol cols="12" sm="6" md="4" class="mb-2">
                      <div class="d-flex align-center">
                        <VIcon icon="bx-globe" color="primary" class="me-2" />
                        <strong>Website:</strong> 
                        <span class="ms-2">
                          <a v-if="slotProps.item.website" :href="slotProps.item.website" target="_blank" class="text-decoration-none">
                            {{ slotProps.item.website }}
                          </a>
                          <span v-else>Chưa cập nhật</span>
                        </span>
                      </div>
                    </VCol>
                    
                    <VCol cols="12" sm="6" md="4" class="mb-2">
                      <div class="d-flex align-center">
                        <VIcon icon="bx-info-circle" color="primary" class="me-2" />
                        <strong>Mô tả:</strong> 
                        <span class="ms-2">{{ slotProps.item.description || 'Không có mô tả' }}</span>
                      </div>
                    </VCol>
                  </VRow>
                  
                  <VDivider class="my-3" />
                  
                  <div>
                    <div class="d-flex align-center mb-2">
                      <VIcon icon="bx-store" color="primary" class="me-2" />
                      <strong>Các kho hàng:</strong>
                    </div>
                    
                    <div v-if="slotProps.item.warehouses && slotProps.item.warehouses.length > 0" class="d-flex flex-wrap gap-2 mt-2">
                      <VChip
                        v-for="warehouse in slotProps.item.warehouses"
                        :key="warehouse.id"
                        color="primary"
                        variant="outlined"
                        class="mb-1"
                        @click="router.push(`/dropshipper/warehouse-info/${warehouse.id}`)"
                        style="cursor: pointer;"
                      >
                        <template #prepend>
                          <VIcon size="16" icon="bx-store-alt"></VIcon>
                        </template>
                        {{ warehouse.name }}
                      </VChip>
                    </div>
                    <div v-else class="text-medium-emphasis">Chưa có kho hàng nào</div>
                  </div>
                  
                  <VDivider class="my-3" />
                  
                  <div class="d-flex justify-end gap-2 mt-2">
                    <VBtn 
                      size="small" 
                      color="primary" 
                      variant="tonal"
                      @click="viewSupplierProducts(slotProps.item)"
                    >
                      <VIcon icon="bx-package" class="me-1" size="18"></VIcon>
                      Xem sản phẩm
                    </VBtn>
                    
                    <VBtn 
                      size="small" 
                      color="primary"
                      @click="viewSupplierDetail(slotProps.item)"
                    >
                      <VIcon icon="bx-info-circle" class="me-1" size="18"></VIcon>
                      Xem chi tiết
                    </VBtn>
                  </div>
                </VCard>
              </div>
            </td>
          </tr>
        </template>

        <template #item.name="{ item }">
          <div class="d-flex align-center">
            <VAvatar size="38" color="primary" variant="tonal" class="me-2">
              <VIcon icon="bx-building-house" />
            </VAvatar>
            <div>
              <div class="font-weight-medium">{{ item.name }}</div>
              <div class="text-xs text-medium-emphasis">ID: {{ item.id.slice(0, 8) }}...</div>
            </div>
          </div>
        </template>

        <template #item.productCount="{ item }">
          <VChip
            :color="item.productCount > 0 ? 'success' : 'error'"
            size="small"
            variant="tonal"
          >
            {{ item.productCount || 0 }}
          </VChip>
        </template>

        <template #item.warehouseCount="{ item }">
          <VChip
            :color="item.warehouses && item.warehouses.length > 0 ? 'info' : 'error'"
            size="small"
            variant="tonal"
          >
            {{ item.warehouses ? item.warehouses.length : 0 }}
          </VChip>
        </template>

        <template #item.createdAt="{ item }">
          <div class="d-flex align-center">
            <VIcon icon="bx-calendar" size="18" class="me-1" />
            {{ formatCreatedDate(item.createdAt) }}
          </div>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-center gap-1">
            <IconBtn @click="viewSupplierProducts(item)" color="success">
              <VTooltip activator="parent" location="top">Xem sản phẩm</VTooltip>
              <VIcon icon="bx-package" size="18" />
            </IconBtn>
            
            <IconBtn @click="viewSupplierDetail(item)" color="primary">
              <VTooltip activator="parent" location="top">Chi tiết</VTooltip>
              <VIcon icon="bx-info-circle" size="18" />
            </IconBtn>
          </div>
        </template>

        <template #no-data>
          <div class="d-flex flex-column align-center pa-5">
            <VIcon icon="bx-package" size="48" class="mb-2 text-medium-emphasis" />
            <p v-if="isLoading" class="text-primary font-weight-medium">Đang tải dữ liệu...</p>
            <template v-else>
              <p class="text-medium-emphasis font-weight-medium">Không tìm thấy nhà cung cấp nào</p>
              <p class="text-small text-disabled">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              <VBtn size="small" color="primary" class="mt-2" @click="resetFilters">Xóa bộ lọc</VBtn>
            </template>
          </div>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<style lang="scss">
.supplier-table {
  .v-data-table__td {
    padding-block: 12px;
    padding-inline: 16px;
  }
}
</style>
