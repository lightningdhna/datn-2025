<script setup lang="ts">
import { getAllWarehouses } from "@/utils/warehouse-api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const isLoading = ref(true);
const warehouseList = ref<any[]>([]);
const search = ref("");

// Fetch all warehouses
const fetchWarehouses = async () => {
  isLoading.value = true;
  try {
    const result = await getAllWarehouses();
    if (result.success && result.data) {
      warehouseList.value = result.data.map((warehouse: any) => ({
        id: warehouse.id,
        name: warehouse.name,
        location: `X:${warehouse.locationX.toFixed(2)}, Y:${warehouse.locationY.toFixed(2)}`,
        supplierId: warehouse.supplierId,
        supplierName: warehouse.supplier ? warehouse.supplier.name : "N/A",
        capacity: warehouse.capacity || 0,
        timeToLoad: warehouse.timeToLoad || 0,
        productCount: warehouse.warehouseProducts ? warehouse.warehouseProducts.length : 0,
      }));
    } else {
      toast.error(`Không thể tải danh sách kho hàng: ${result.message || "Lỗi không xác định"}`);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    toast.error("Đã xảy ra lỗi khi tải danh sách kho hàng");
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchWarehouses();
});

// Table headers
const headers = [
  { title: "Tên kho", key: "name" },
  { title: "Vị trí", key: "location" },
  { title: "Nhà cung cấp", key: "supplierName" },
  { title: "Sức chứa", key: "capacity", align: "end" },
  { title: "Số mặt hàng", key: "productCount", align: "end" },
  { title: "Thao tác", key: "actions", align: "center" },
] as const;

// Navigation functions
const viewWarehouseDetails = (id: string) => {
  router.push(`/dropshipper/warehouse-info/${id}`);
};

const viewSupplierDetails = (id: string) => {
  router.push(`/dropshipper/supplier-info/${id}`);
};

// Refresh data
const refreshData = async () => {
  await fetchWarehouses();
  toast.success("Đã làm mới danh sách kho hàng");
};
</script>

<template>
  <section>
    <VCard>
      <VCardItem>
        <VCardTitle class="text-h5 d-flex align-center">
          <VIcon icon="bx-buildings" class="me-2" />
          Danh sách kho hàng
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
              label="Tìm kiếm kho hàng"
              prepend-inner-icon="bx-search"
              clearable
              single-line
              hide-details
            />
          </VCol>
        </VRow>

        <VDataTable
          :headers="headers"
          :items="warehouseList"
          :search="search"
          :loading="isLoading"
          class="mt-4"
          hover
        >
          <template #item.actions="{ item }">
            <div class="d-flex gap-1 justify-center">
              <VBtn
                icon
                size="small"
                color="primary"
                variant="text"
                @click="viewWarehouseDetails(item.id)"
              >
                <VIcon icon="bx-info-circle" />
                <VTooltip activator="parent" location="top">
                  Xem chi tiết kho
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
            </div>
          </template>

          <template #no-data>
            <div class="text-center pa-4">
              Không có dữ liệu kho hàng
            </div>
          </template>

          <template #loading>
            <div class="text-center pa-4">
              <VProgressCircular
                indeterminate
                color="primary"
                class="ma-4"
              />
              <div>Đang tải dữ liệu...</div>
            </div>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
  </section>
</template>
