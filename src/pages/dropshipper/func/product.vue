<script setup lang="ts">
import { formatDate, formatPrice } from "@/utils/formatters";
import { getAllProducts, getProductSummary } from "@/utils/product-api";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  supplierId: string;
  supplierName: string;
  categoryId: string;
  categoryName: string;
  dateCreated: string;
  status: string;
  imageUrl: string;
  rating?: number;
  salesCount?: number;
  dropshipperCount?: number;
}

interface ProductSummaryInfoDto {
  productId: string;
  productName: string;
  totalStockQuantity: number;
  warehouseCount: number;
  dropshipperCount: number;
  totalSoldQuantity: number;
  completedOrderCount: number;
  monthlySoldQuantity: number;
  monthlyCompletedOrderCount: number;
  month: number;
  year: number;
}

const router = useRouter();
const products = ref<Product[]>([]);
const searchQuery = ref("");
const isLoading = ref(true);
const snackbar = ref({
  show: false,
  text: "",
  color: "",
});

// Data table headers
const headers = [
  { title: "", key: "data-table-expand" },
  { title: "Tên sản phẩm", key: "name" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Nhà cung cấp", key: "supplierName" },
  { title: "Giá (VNĐ)", key: "price" },
  { title: "Tồn kho", key: "stockQuantity", align: "center" },
  { title: "Số DS đăng ký", key: "dropshipperCount", align: "center" },
  { title: "Trạng thái", key: "status" },
  { title: "Thao tác", key: "actions", align: "center" },
];

// Fetch product list
const fetchProductList = async () => {
  isLoading.value = true;
  try {
    const result = await getAllProducts();
    if (result.success && "data" in result) {
      // Fetch additional data for each product
      const productsWithSummary = await Promise.all(
        result.data.map(async (rawProduct: any) => {
          const product = rawProduct as Product;
          try {
            const summaryResult = await getProductSummary(product.id);
            if (summaryResult.success && "data" in summaryResult) {
              return {
                ...product,
                stockQuantity: summaryResult.data.totalStockQuantity || 0,
                salesCount: summaryResult.data.totalSoldQuantity || 0,
                rating: 0, // API không có rating
                dropshipperCount: summaryResult.data.dropshipperCount || 0,
              };
            }
            return product;
          } catch (error) {
            console.error(
              `Error fetching summary for product ${product.id}:`,
              error
            );
            return {
              ...product,
              stockQuantity: 0,
              salesCount: 0,
              rating: 0,
              dropshipperCount: 0,
            };
          }
        })
      );

      products.value = productsWithSummary;
    } else {
      const errorMessage = "error" in result ? result.error : "Unknown error";
      console.error("Lỗi khi lấy danh sách sản phẩm:", errorMessage);
      snackbar.value = {
        show: true,
        text:
          "message" in result
            ? result.message
            : "Không thể tải danh sách sản phẩm",
        color: "error",
      };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    snackbar.value = {
      show: true,
      text: "Không thể tải danh sách sản phẩm",
      color: "error",
    };
  } finally {
    isLoading.value = false;
  }
};

// Filter products based on search query
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) return products.value;

  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query) ||
      product.supplierName.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
  );
});

// Get status color based on product status
const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "available":
      return "success";
    case "low stock":
      return "warning";
    case "inactive":
    case "unavailable":
      return "error";
    default:
      return "secondary";
  }
};

// Get status text
const getStatusText = (product: Product) => {
  if (!product.status) {
    if (product.stockQuantity <= 0) return "Hết hàng";
    if (product.stockQuantity < 10) return "Sắp hết hàng";
    return "Còn hàng";
  }
  return product.status;
};

// Get stock color based on quantity
const getStockColor = (quantity: number) => {
  if (quantity <= 0) return "error";
  if (quantity < 10) return "warning";
  return "success";
};

// Navigate to product detail page
const goToProductDetails = (productId: string) => {
  router.push(`/dropshipper/product-info/${productId}`);
};

// Navigate to supplier detail page
const goToSupplierDetails = (supplierId: string) => {
  router.push(`/dropshipper/supplier-info/${supplierId}`);
};

// Refresh a single product's data
const refreshProductData = async (productId: string) => {
  try {
    const index = products.value.findIndex((p) => p.id === productId);
    if (index !== -1) {
      const summaryResult = await getProductSummary(productId);
      if (summaryResult.success && "data" in summaryResult) {
        products.value[index] = {
          ...products.value[index],
          stockQuantity: summaryResult.data.totalStockQuantity || 0,
          salesCount: summaryResult.data.totalSoldQuantity || 0,
          rating: 0,
          dropshipperCount: summaryResult.data.dropshipperCount || 0,
        };
      }
    }
  } catch (error) {
    console.error(`Error refreshing product ${productId}:`, error);
    snackbar.value = {
      show: true,
      text: "Không thể làm mới dữ liệu sản phẩm",
      color: "error",
    };
  }
};

// Initialize component
onMounted(() => {
  fetchProductList();
});
</script>

<template>
  <VCard>
    <VCardTitle class="text-primary">
      <VIcon icon="bx-package" size="28" class="me-2" />
      Danh sách sản phẩm
      <VRow style="direction: ltr;" class="mt-6">
        <VCol cols="12" offset-md="0" md="4">
          <VTextField
            v-model="searchQuery"
            placeholder="Tìm kiếm theo tên, mã, nhà cung cấp..."
            append-inner-icon="bx-search"
            hide-details
            variant="outlined"
            density="compact"
          />
        </VCol>
      </VRow>
    </VCardTitle>

    <VCardText>
      <VDataTable
        class="mt-1"
        :headers="headers"
        :items="filteredProducts"
        :items-per-page="10"
        :items-per-page-options="[10, 20, 50]"
        :search="searchQuery"
        :loading="isLoading"
        :sort-by="[{ key: 'dateCreated', order: 'desc' }]"
        expand-on-click
        item-value="id"
        density="compact"
      >
        <!-- Expanded row content -->
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td></td>
            <td :colspan="headers.length - 2">
              <div class="px-2 py-3">
                <VRow>
                  <VCol cols="12" md="6">
                    <div class="d-flex align-center mb-2">
                      <strong class="me-2">Mô tả:</strong>
                      <span style="white-space: pre-wrap;">{{
                        slotProps.item.description || "Không có mô tả"
                      }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <strong class="me-2">Danh mục:</strong>
                      <span>{{
                        slotProps.item.categoryName || "Chưa phân loại"
                      }}</span>
                    </div>
                  </VCol>
                  <VCol cols="12" md="6">
                    <div class="d-flex align-center mb-2">
                      <strong class="me-2">Ngày tạo:</strong>
                      <span>{{ formatDate(slotProps.item.dateCreated) }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <strong class="me-2">Đã bán:</strong>
                      <span>{{ slotProps.item.salesCount || 0 }} sản phẩm</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                      <VBtn
                        size="small"
                        color="primary"
                        variant="tonal"
                        :loading="isLoading"
                        @click="refreshProductData(slotProps.item.id)"
                      >
                        <VIcon size="small" icon="bx-refresh" class="me-1" />
                        Làm mới dữ liệu
                      </VBtn>
                    </div>
                  </VCol>
                </VRow>
              </div>
            </td>
          </tr>
        </template>

        <!-- Item name with image -->
        <template #item.name="{ item }">
          <div class="d-flex align-center">
            <VAvatar size="40" variant="tonal" class="me-3">
              <VImg
                :src="item.imageUrl || '/images/product-placeholder.png'"
                :alt="item.name"
              />
            </VAvatar>
            <div>
              <div class="font-weight-medium">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis">
                {{ item.categoryName || "Chưa phân loại" }}
              </div>
            </div>
          </div>
        </template>

        <!-- Supplier name - Make it clickable -->
        <template #item.supplierName="{ item }">
          <div
            class="d-flex align-center cursor-pointer"
            @click="goToSupplierDetails(item.supplierId)"
          >
            <VAvatar size="30" color="primary" variant="tonal" class="me-2">
              <VIcon icon="bx-store" />
            </VAvatar>
            <div class="text-primary text-decoration-underline">
              {{ item.supplierName }}
            </div>
            <VTooltip activator="parent" location="top">
              Xem thông tin nhà cung cấp
            </VTooltip>
          </div>
        </template>

        <!-- Price -->
        <template #item.price="{ item }">
          {{ formatPrice(item.price) }}
        </template>

        <!-- Stock quantity -->
        <template #item.stockQuantity="{ item }">
          <VChip
            :color="getStockColor(item.stockQuantity)"
            size="small"
            variant="outlined"
          >
            {{ item.stockQuantity }}
          </VChip>
        </template>

        <!-- Dropshipper count -->
        <template #item.dropshipperCount="{ item }">
          <VChip
            :color="item.dropshipperCount > 0 ? 'info' : 'secondary'"
            size="small"
          >
            {{ item.dropshipperCount }}
          </VChip>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip :color="getStatusColor(item.status)" size="small" label>
            {{ getStatusText(item) }}
          </VChip>
        </template>

        <!-- Actions column -->
        <template #item.actions="{ item }">
          <div class="d-flex gap-1 justify-center">
            <VBtn
              icon
              size="small"
              color="primary"
              variant="text"
              @click="goToProductDetails(item.id)"
            >
              <VIcon icon="bx-info-circle" />
              <VTooltip activator="parent" location="top">
                Xem chi tiết sản phẩm
              </VTooltip>
            </VBtn>
          </div>
        </template>

        <!-- Loading state -->
        <template #loading>
          <div class="d-flex align-center justify-center pa-5">
            <VProgressCircular indeterminate color="primary" />
          </div>
        </template>

        <!-- No data state -->
        <template #no-data>
          <div class="d-flex flex-column align-center justify-center pa-5">
            <VIcon icon="bx-alert-circle" size="48" color="grey" />
            <div class="text-subtitle-1 mt-2">Không tìm thấy sản phẩm nào</div>
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>

  <!-- Snackbar for notifications -->
  <VSnackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    timeout="3000"
    location="top"
  >
    {{ snackbar.text }}
    <template #actions>
      <VBtn color="white" variant="text" @click="snackbar.show = false">
        Đóng
      </VBtn>
    </template>
  </VSnackbar>
</template>

<style scoped>
.v-data-table {
  border-radius: 8px;
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 960px) {
  .v-text-field {
    inline-size: 100%;
    margin-block-start: 16px;
  }
}
</style>
