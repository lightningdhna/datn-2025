<script setup lang="ts">
import { getSupplierId } from "@/utils/local-storage";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const search = ref("");
const isLoading = ref(true);
const error = ref<string | null>(null);
const statisticData = ref<any>(null);
const productStatistics = ref<any[]>([]);

// Table headers corresponding to the ProductStatisticsDto
const headers = [
  { title: "Tên sản phẩm", key: "productName", sortable: true },
  { title: "Mã sản phẩm", key: "productId", sortable: true },
  {
    title: "Tổng số lượng trong kho",
    key: "totalStock",
    sortable: true,
    align: "end",
  },
  {
    title: "Số lượng kho có hàng",
    key: "warehouseCount",
    sortable: true,
    align: "end",
  },
  {
    title: "Đơn đã hoàn thành",
    key: "completedOrderCount",
    sortable: true,
    align: "end",
  },
  {
    title: "SL đã bán",
    key: "soldQuantity",
    sortable: true,
    align: "end",
  },
  {
    title: "Đơn đang đợi xử lý",
    key: "pendingOrderCount",
    sortable: true,
    align: "end",
  },
  { title: "Thao tác", key: "actions", sortable: false, align: "center" },
];

// Fetch supplier statistics from the API
const fetchSupplierStatistics = async () => {
  isLoading.value = true;
  error.value = null;

  const supplierId = getSupplierId();
  if (!supplierId) {
    error.value = "Không tìm thấy ID nhà cung cấp trong local storage.";
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/statistic/supplier/${supplierId}`
    );
    statisticData.value = response.data;
    productStatistics.value = response.data.products || [];

    // Sort products by sold quantity by default (descending)
    productStatistics.value.sort((a, b) => b.soldQuantity - a.soldQuantity);
  } catch (err: any) {
    console.error("Error fetching statistics:", err);
    error.value =
      err.response?.data?.message || "Không thể tải dữ liệu thống kê.";
    toast.error(error.value);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSupplierStatistics();
});

// Calculate totals for summary cards
const totalProducts = () => productStatistics.value.length;
const totalStock = () =>
  productStatistics.value.reduce(
    (sum, product) => sum + (product.totalStock || 0),
    0
  );
const totalCompletedOrders = () =>
  productStatistics.value.reduce(
    (sum, product) => sum + (product.completedOrderCount || 0),
    0
  );
const totalPendingOrders = () =>
  productStatistics.value.reduce(
    (sum, product) => sum + (product.pendingOrderCount || 0),
    0
  );
const totalSoldQuantity = () =>
  productStatistics.value.reduce(
    (sum, product) => sum + (product.soldQuantity || 0),
    0
  );

// View product details function
const viewProductDetails = (productId) => {
  router.push(`/supplier/product-info/${productId}`);
};
</script>

<template>
  <div>
    <!-- Statistics Summary Cards -->
    <VRow class="match-height mb-6">
      <!-- Total Products Card -->
      <VCol cols="12" md="6" lg="3">
        <VCard>
          <VCardItem>
            <VCardTitle>Tổng sản phẩm</VCardTitle>
            <template #append>
              <VAvatar color="primary" variant="tonal" rounded>
                <VIcon icon="bx-package" />
              </VAvatar>
            </template>
          </VCardItem>

          <VCardText class="pt-2">
            <div class="text-h4 font-weight-medium">
              {{ isLoading ? "..." : totalProducts() }}
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Total Stock Card -->
      <VCol cols="12" md="6" lg="3">
        <VCard>
          <VCardItem>
            <VCardTitle>Tổng tồn kho</VCardTitle>
            <template #append>
              <VAvatar color="success" variant="tonal" rounded>
                <VIcon icon="bx-archive" />
              </VAvatar>
            </template>
          </VCardItem>

          <VCardText class="pt-2">
            <div class="text-h4 font-weight-medium">
              {{ isLoading ? "..." : totalStock() }}
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Completed Orders Card -->
      <VCol cols="12" md="6" lg="3">
        <VCard>
          <VCardItem>
            <VCardTitle>Đơn đã hoàn thành</VCardTitle>
            <template #append>
              <VAvatar color="info" variant="tonal" rounded>
                <VIcon icon="bx-check-circle" />
              </VAvatar>
            </template>
          </VCardItem>

          <VCardText class="pt-2">
            <div class="text-h4 font-weight-medium">
              {{ isLoading ? "..." : totalCompletedOrders() }}
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Pending Orders Card -->
      <VCol cols="12" md="6" lg="3">
        <VCard>
          <VCardItem>
            <VCardTitle>Đơn đang chờ</VCardTitle>
            <template #append>
              <VAvatar color="warning" variant="tonal" rounded>
                <VIcon icon="bx-time" />
              </VAvatar>
            </template>
          </VCardItem>

          <VCardText class="pt-2">
            <div class="text-h4 font-weight-medium">
              {{ isLoading ? "..." : totalPendingOrders() }}
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Main Statistics Table -->
    <VCard>
      <VCardItem>
        <VCardTitle class="text-primary d-flex align-center">
          <VIcon icon="bx-bar-chart-alt" class="me-2" />
          Thống kê sản phẩm
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <!-- Error Alert -->
        <VAlert
          v-if="error"
          type="error"
          variant="tonal"
          closable
          class="mb-4"
          @click:close="error = null"
        >
          {{ error }}
        </VAlert>

        <!-- Search Bar -->
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              v-model="search"
              placeholder="Tìm kiếm sản phẩm..."
              append-inner-icon="bx-search"
              single-line
              hide-details
              density="compact"
              variant="outlined"
            />
          </VCol>

          <VCol cols="12" md="8" class="d-flex justify-end align-center">
            <div class="text-subtitle-1">
              Tổng số sản phẩm đã bán:
              <strong>{{ totalSoldQuantity() }}</strong>
            </div>
          </VCol>
        </VRow>
      </VCardText>

      <!-- Statistics Table -->
      <VDataTable
        :headers="headers"
        :items="productStatistics"
        :search="search"
        :items-per-page="10"
        :loading="isLoading"
        item-value="productId"
        :sort-by="[{ key: 'soldQuantity', order: 'desc' }]"
      >
        <!-- Loading State -->
        <template #loading>
          <div class="d-flex align-center justify-center pa-5">
            <VProgressCircular indeterminate />
          </div>
        </template>

        <!-- Empty State -->
        <template #no-data>
          <div class="text-center py-6">
            <div v-if="isLoading">
              <VProgressCircular indeterminate class="mb-3" />
              <p>Đang tải dữ liệu thống kê...</p>
            </div>
            <div v-else>
              <VIcon
                icon="bx-info-circle"
                size="48px"
                color="info"
                class="mb-3"
              />
              <p>Không có dữ liệu sản phẩm</p>
            </div>
          </div>
        </template>

        <!-- Custom Cell Templates -->
        <template #item.productName="{ item }">
          <div class="font-weight-medium">{{ item.productName }}</div>
        </template>

        <template #item.productId="{ item }">
          <span class="text-medium-emphasis">{{ item.productId }}</span>
        </template>

        <template #item.totalStock="{ item }">
          <span :class="item.totalStock < 10 ? 'text-error' : 'text-success'">
            {{ item.totalStock }}
          </span>
        </template>

        <template #item.soldQuantity="{ item }">
          <span class="font-weight-medium">{{ item.soldQuantity }}</span>
        </template>

        <template #item.actions="{ item }">
          <div class="d-flex justify-center">
            <IconBtn @click="viewProductDetails(item.productId)">
              <VTooltip activator="parent" location="top"
                >Xem chi tiết</VTooltip
              >
              <VIcon icon="bx-info-circle" color="primary" />
            </IconBtn>
          </div>
        </template>
      </VDataTable>
    </VCard>
  </div>
</template>

<style scoped>
.match-height {
  display: flex;
  flex-wrap: wrap;
}
</style>
