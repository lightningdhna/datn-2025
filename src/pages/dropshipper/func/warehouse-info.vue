<script setup lang="ts">
import { formatPrice } from "@/utils/formatters";
import { getRegistrationsByCurrentDropshipper } from "@/utils/registration-api";
import { getWarehouseById } from "@/utils/warehouse-api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const toast = useToast();
const isLoading = ref(true);
const search = ref("");

// Data
const warehouse = ref<any>({
  id: "",
  name: "",
  locationX: 0,
  locationY: 0,
  capacity: 0,
  timeToLoad: 0,
  supplierId: "",
  supplierName: "",
});

const warehouseProducts = ref<any[]>([]);
const registeredProducts = ref<Record<string, boolean>>({});

// Fetch warehouse data
const fetchWarehouseData = async () => {
  isLoading.value = true;
  try {
    // Fetch warehouse details
    const warehouseResult = await getWarehouseById(props.id);
    if (warehouseResult.success && warehouseResult.data) {
      const data = warehouseResult.data;
      warehouse.value = {
        id: data.id,
        name: data.name,
        locationX: data.locationX,
        locationY: data.locationY,
        capacity: data.capacity,
        timeToLoad: data.timeToLoad,
        supplierId: data.supplierId,
        supplierName: data.supplier ? data.supplier.name : "N/A",
      };

      // Extract warehouse products
      if (data.warehouseProducts && data.warehouseProducts.length > 0) {
        warehouseProducts.value = data.warehouseProducts.map((wp: any) => ({
          id: wp.productId,
          name: wp.product?.name || "Unknown Product",
          quantity: wp.quantity,
          price: wp.product?.price || 0,
          date: wp.product?.date || new Date(),
          weight: wp.product?.weight || 0,
          volume: wp.product?.volume || 0,
        }));
      }
    } else {
      toast.error(`Không thể tải thông tin kho hàng: ${warehouseResult.message || "Lỗi không xác định"}`);
      router.push("/dropshipper/warehouse");
      return;
    }

    // Get current dropshipper registrations to mark registered products
    const registrationsResult = await getRegistrationsByCurrentDropshipper();
    if (registrationsResult.success && registrationsResult.data) {
      const registrations = registrationsResult.data;
      registeredProducts.value = {};
      
      registrations.forEach((reg: any) => {
        registeredProducts.value[reg.productId] = true;
      });
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu kho hàng:", error);
    toast.error("Đã xảy ra lỗi khi tải thông tin kho hàng");
    router.push("/dropshipper/warehouse");
  } finally {
    isLoading.value = false;
  }
};

// Table headers
const productHeaders = [
  { title: "Sản phẩm", key: "name" },
  { title: "Số lượng", key: "quantity", align: "end" },
  { title: "Giá", key: "price", align: "end" },
  { title: "Trạng thái", key: "status", align: "center" },
  { title: "Chi tiết", key: "action", align: "center" },
] as const;

// Initialize component
onMounted(() => {
  if (props.id) {
    fetchWarehouseData();
  }
});

// Check registration status
const getRegistrationStatus = (productId: string) => {
  return registeredProducts.value[productId] ? "Đã đăng ký" : "Chưa đăng ký";
};

// Navigation functions
const viewProductDetails = (productId: string) => {
  router.push(`/dropshipper/product-info/${productId}`);
};

const viewSupplierDetails = (supplierId: string) => {
  router.push(`/dropshipper/supplier-info/${supplierId}`);
};

// Refresh data
const refreshData = async () => {
  if (props.id) {
    await fetchWarehouseData();
    toast.success("Đã làm mới dữ liệu kho hàng");
  }
};
</script>

<template>
  <section>
    <VCard>
      <!-- HEADER -->
      <VCardItem>
        <VCardTitle class="text-h5 d-flex align-center">
          <VIcon icon="bx-home" class="me-2" />
          Thông tin kho hàng
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
        <VRow v-if="isLoading">
          <VCol cols="12" class="text-center">
            <VProgressCircular indeterminate color="primary" />
          </VCol>
        </VRow>

        <div v-else>
          <!-- Warehouse Info -->
          <VRow>
            <VCol cols="12" md="6">
              <div class="d-flex flex-column mb-4">
                <h3 class="text-h6">{{ warehouse.name }}</h3>
                <div class="d-flex flex-wrap gap-y-3 mt-2">
                  <div class="me-6">
                    <div class="text-caption text-medium-emphasis">
                      Vị trí
                    </div>
                    <div class="text-body-1 font-weight-medium">
                      X: {{ warehouse.locationX.toFixed(2) }}, Y: {{ warehouse.locationY.toFixed(2) }}
                    </div>
                  </div>

                  <div class="me-6">
                    <div class="text-caption text-medium-emphasis">
                      Sức chứa
                    </div>
                    <div class="text-body-1 font-weight-medium">
                      {{ warehouse.capacity }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Thời gian xử lý
                    </div>
                    <div class="text-body-1 font-weight-medium">
                      {{ warehouse.timeToLoad }} phút
                    </div>
                  </div>
                </div>

                <div class="mt-3">
                  <div class="text-caption text-medium-emphasis">Nhà cung cấp</div>
                  <div 
                    class="text-body-1 font-weight-medium text-primary cursor-pointer"
                    @click="viewSupplierDetails(warehouse.supplierId)"
                  >
                    {{ warehouse.supplierName }}
                  </div>
                </div>
              </div>
            </VCol>
          </VRow>

          <!-- Products List -->
          <div class="mt-4">
            <div class="d-flex align-center mb-4">
              <h4 class="text-h6">Danh sách sản phẩm</h4>
              <VSpacer />
              <VTextField
                v-model="search"
                density="compact"
                placeholder="Tìm kiếm"
                prepend-inner-icon="bx-search"
                style="max-inline-size: 300px;"
                hide-details
              />
            </div>

            <VDataTable
              :headers="productHeaders"
              :items="warehouseProducts"
              :search="search"
              :loading="isLoading"
              class="elevation-1"
              hover
              item-value="id"
            >
              <template #item.price="{ item }">
                {{ formatPrice(item.price) }}
              </template>

              <template #item.status="{ item }">
                <VChip
                  :color="registeredProducts[item.id] ? 'success' : 'warning'"
                  size="small"
                >
                  {{ getRegistrationStatus(item.id) }}
                </VChip>
              </template>

              <template #item.action="{ item }">
                <VBtn
                  icon
                  variant="text"
                  size="small"
                  color="primary"
                  @click="viewProductDetails(item.id)"
                >
                  <VIcon icon="bx-link-external" />
                </VBtn>
              </template>

              <template #no-data>
                <div class="text-center pa-4">
                  Không có dữ liệu sản phẩm trong kho
                </div>
              </template>
            </VDataTable>
          </div>
        </div>
      </VCardText>
    </VCard>
  </section>
</template>
