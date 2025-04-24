<script setup lang="ts">
import { formatDate, formatPrice } from "@/utils/formatters";
import { getAllProductsBySupplier } from "@/utils/product-api";
import { getRegistrationsByCurrentDropshipper } from "@/utils/registration-api";
import { getSupplierById } from "@/utils/supplier-api";
import { getWarehousesBySupplier } from "@/utils/warehouse-api";
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

const supplier = ref({
  id: "",
  name: "",
});

// Lists for tables
const warehouseList = ref<any[]>([]);
const productList = ref<any[]>([]);
const registeredProducts = ref<Record<string, boolean>>({});

// Tab management
const activeTab = ref("one");
const search = ref("");

// Fetch supplier information and related data
const fetchSupplierInfo = async (id: string) => {
  isLoading.value = true;
  try {
    // Get basic supplier info
    const supplierResult = await getSupplierById(id);
    if (!supplierResult.success) {
      toast.error(`Không thể tải thông tin nhà cung cấp: ${
        'message' in supplierResult ? supplierResult.message : "Lỗi không xác định"
      }`);
      router.push("/dropshipper/supplier");
      return;
    }
    
    if ('data' in supplierResult) {
      supplier.value = { ...supplierResult.data };
    }

    // Get warehouses
    const warehouseResult = await getWarehousesBySupplier(id);
    if (warehouseResult.success && 'data' in warehouseResult) {
      warehouseList.value = warehouseResult.data.map((warehouse: any) => ({
        id: warehouse.id,
        name: warehouse.name,
        location: `X:${warehouse.locationX.toFixed(2)}, Y:${warehouse.locationY.toFixed(2)}`,
        capacity: warehouse.capacity,
      }));
    } else {
      toast.warning("Không thể tải danh sách kho hàng");
    }

    // Get products
    const productResult = await getAllProductsBySupplier(id);
    if (productResult.success && 'data' in productResult) {
      productList.value = productResult.data;
    } else {
      toast.warning("Không thể tải danh sách sản phẩm");
    }

    // Get current dropshipper registrations to mark registered products
    const registrationsResult = await getRegistrationsByCurrentDropshipper();
    if (registrationsResult.success && 'data' in registrationsResult) {
      const registrations = registrationsResult.data;
      registeredProducts.value = {};
      
      registrations.forEach((reg: any) => {
        registeredProducts.value[reg.productId] = true;
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhà cung cấp:", error);
    toast.error("Đã xảy ra lỗi khi tải dữ liệu nhà cung cấp");
  } finally {
    isLoading.value = false;
  }
};

// Table headers
const warehouseHeaders = [
  { title: "Tên kho", key: "name" },
  { title: "Vị trí", key: "location" },
  { title: "Sức chứa", key: "capacity", align: "end" },
  { title: "Chi tiết", key: "action", align: "center" },
] as const;

const productHeaders = [
  { title: "Sản phẩm", key: "name" },
  { title: "Giá", key: "price", align: "end" },
  { title: "Ngày cập nhật", key: "date" },
  { title: "Trạng thái", key: "status", align: "center" },
  { title: "Chi tiết", key: "action", align: "center" },
] as const;

// Initialize component
onMounted(() => {
  if (props.id) {
    fetchSupplierInfo(props.id);
  }
});

// Refresh data
const refreshData = async () => {
  if (props.id) {
    await fetchSupplierInfo(props.id);
    toast.success("Đã làm mới dữ liệu nhà cung cấp");
  }
};

// Check registration status
const getRegistrationStatus = (productId: string) => {
  return registeredProducts.value[productId] ? "Đã đăng ký" : "Chưa đăng ký";
};

// View warehouse details
const viewWarehouseDetails = (warehouseId: string) => {
  router.push(`/dropshipper/warehouse-info/${warehouseId}`);
};

// View product details
const viewProductDetails = (productId: string) => {
  router.push(`/dropshipper/product-info/${productId}`);
};
</script>

<template>
  <section>
    <VCard>
      <!-- HEADER -->
      <VCardItem>
        <VCardTitle class="text-h5 d-flex align-center">
          <VIcon icon="bx-store" class="me-2" />
          Thông tin nhà cung cấp
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
          <!-- Supplier Info -->
          <VRow>
            <VCol cols="12" md="6">
              <div class="d-flex align-center mb-4">
                <div
                  class="d-flex flex-column justify-center me-6"
                  style="gap: 0.5rem;"
                >
                  <h3 class="text-h6">{{ supplier.name }}</h3>
                  <p class="text-caption">ID: {{ supplier.id }}</p>
                </div>
              </div>
            </VCol>
          </VRow>

          <!-- Tabs -->
          <VTabs v-model="activeTab" class="mb-5">
            <VTab value="one">Kho hàng</VTab>
            <VTab value="two">Sản phẩm</VTab>
          </VTabs>

          <VWindow v-model="activeTab">
            <!-- Warehouses Tab -->
            <VWindowItem value="one">
              <div class="d-flex align-center mb-4">
                <h4 class="text-h6">Danh sách kho hàng</h4>
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

              <VDataTableServer
                :headers="warehouseHeaders"
                :items="warehouseList"
                :search="search"
                :loading="isLoading"
                class="elevation-1"
                item-value="id"
              >
                <!-- Action column -->
                <template #item.action="{ item }">
                  <VBtn
                    icon
                    variant="text"
                    size="small"
                    color="primary"
                    @click="viewWarehouseDetails(item.id)"
                  >
                    <VIcon icon="bx-link-external" />
                  </VBtn>
                </template>
              </VDataTableServer>
            </VWindowItem>

            <!-- Products Tab -->
            <VWindowItem value="two">
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

              <VDataTableServer
                :headers="productHeaders"
                :items="productList"
                :search="search"
                :loading="isLoading"
                class="elevation-1"
                item-value="id"
              >
                <template #item.price="{ item }">
                  {{ formatPrice(item.price) }}
                </template>

                <template #item.date="{ item }">
                  {{ formatDate(item.date) }}
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
              </VDataTableServer>
            </VWindowItem>
          </VWindow>
        </div>
      </VCardText>
    </VCard>
  </section>
</template>
