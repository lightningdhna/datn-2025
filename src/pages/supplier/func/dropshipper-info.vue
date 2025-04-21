<script setup lang="ts">
import {
  getDropshipperById,
  getDropshipperSummary,
  getDropshipperSupplierSummary,
} from "@/utils/dropshipper-api";
import { getSupplierId } from "@/utils/local-storage";
import {
  getRegistrationsByDropshipper,
  getRegistrationSummary,
  removeRegistration,
} from "@/utils/registration-api";
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
const error = ref<string | null>(null);
const search = ref("");

// --- Basic Dropshipper Information ---
const name = ref<string | null>(null);

// --- Overall Dropshipper Summary (all suppliers) ---
const overallCompletedOrders = ref<number | null>(null);
const overallRegisteredProducts = ref<number | null>(null);
const overallSuppliersCount = ref<number | null>(null);
const overallSoldQuantity = ref<number | null>(null);

// --- Summary with Current Supplier ---
const registeredProductCount = ref<number | null>(null);
const completedOrders = ref<number | null>(null); // Current month
const completedOrdersAllTime = ref<number | null>(null); // All time
const soldProductQuantity = ref<number | null>(null); // Current month
const soldProductQuantityAllTime = ref<number | null>(null); // All time

// --- Product Registration List (for current supplier) ---
const reportList = ref<any[]>([]);

// --- Define headers for the data table with sorting options ---
const headers = [
  { title: "Tên sản phẩm", key: "productName" },
  { title: "Mã sản phẩm", key: "productId" },
  { title: "Phí hoa hồng", key: "commissionFee", align: "end" },
  {
    title: "Ngày đăng ký",
    key: "registrationDate",
    align: "center",
    sortable: true,
  },
  {
    title: "Số đơn hoàn thành",
    key: "completedOrders",
    align: "center",
    sortable: true,
  },
  { title: "Số đơn đợi", key: "pendingOrders", align: "center" },
  {
    title: "Số lượng đã bán",
    key: "quantitySold",
    align: "center",
    sortable: true,
  },
  { title: "Tổng số lượng hàng còn", key: "stockRemaining", align: "center" },
  { title: "Hành động", key: "action", sortable: false, align: "center" },
];

// --- Fetch Data ---
const fetchData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // 1. Get basic dropshipper information
    const dropshipperResult = await getDropshipperById(props.id);
    if (dropshipperResult.success) {
      name.value = dropshipperResult.data.name;
    } else {
      error.value = `Không thể tải thông tin cơ bản của dropshipper: ${dropshipperResult.message}`;
      toast.error(error.value);
      isLoading.value = false;
      return;
    }

    // 2. Get OVERALL dropshipper summary
    const overallSummaryResult = await getDropshipperSummary(props.id);
    if (overallSummaryResult.success) {
      overallCompletedOrders.value =
        overallSummaryResult.data.completedOrderCountAllTime ?? 0;
      overallRegisteredProducts.value =
        overallSummaryResult.data.registeredProductCount ?? 0;
      overallSuppliersCount.value =
        overallSummaryResult.data.supplierCount ?? 0;
      overallSoldQuantity.value =
        overallSummaryResult.data.soldProductQuantityAllTime ?? 0;
    } else {
      console.warn(
        `Không thể tải thông tin tổng hợp chung của dropshipper: ${overallSummaryResult.message}`
      );
      toast.warning("Không thể tải thông tin tổng hợp chung của dropshipper.");
    }

    // 3. Get dropshipper summary with the current supplier
    const supplierId = getSupplierId();
    if (supplierId) {
      const supplierSummaryResult = await getDropshipperSupplierSummary(
        props.id,
        supplierId
      );
      if (supplierSummaryResult.success) {
        registeredProductCount.value =
          supplierSummaryResult.data.registeredProductCount ?? 0;
        completedOrders.value =
          supplierSummaryResult.data.completedOrderCount ?? 0;
        completedOrdersAllTime.value =
          supplierSummaryResult.data.completedOrderCountAllTime ?? 0;
        soldProductQuantity.value =
          supplierSummaryResult.data.soldProductQuantity ?? 0;
        soldProductQuantityAllTime.value =
          supplierSummaryResult.data.soldProductQuantityAllTime ?? 0;
      } else {
        console.warn(
          `Không thể tải thông tin tổng hợp của dropshipper với nhà cung cấp này: ${supplierSummaryResult.message}`
        );
        toast.warning("Không thể tải thông tin tổng hợp với nhà cung cấp này.");
      }

      // 4. Get APPROVED registrations for this dropshipper with the current supplier
      const registrationsResult = await getRegistrationsByDropshipper(
        props.id,
        1 // Status 1 = Approved
      );

      if (
        registrationsResult.success &&
        Array.isArray(registrationsResult.data)
      ) {
        const filteredRegistrations = registrationsResult.data.filter(
          (item: any) => item.product?.supplierId === supplierId
        );

        // Create a placeholder for our enhanced registration list
        const enhancedRegistrations = [];

        // For each registration, fetch its detailed summary
        for (const registration of filteredRegistrations) {
          const baseRegistration = {
            productName: registration.product?.name || "Không có tên",
            productId: registration.productId,
            commissionFee: `${registration.commissionFee}%`,
            registrationDate: new Date(registration.createdDate),
            completedOrders: 0,
            pendingOrders: 0,
            quantitySold: 0,
            stockRemaining: 0,
            revenuePct: `${registration.commissionFee}%`,
            originalData: registration,
          };

          try {
            // Get detailed summary for this registration
            const summaryResult = await getRegistrationSummary(
              props.id,
              registration.productId
            );

            if (summaryResult.success) {
              enhancedRegistrations.push({
                ...baseRegistration,
                completedOrders: summaryResult.data.completedOrderCount || 0,
                pendingOrders: summaryResult.data.pendingOrderCount || 0,
                quantitySold: summaryResult.data.soldQuantity || 0,
                stockRemaining: summaryResult.data.availableQuantity || 0,
                revenuePct: `${summaryResult.data.commissionFee}%`,
              });
            } else {
              enhancedRegistrations.push(baseRegistration);
            }
          } catch (err) {
            console.warn(
              `Could not fetch summary for ${registration.productId}:`,
              err
            );
            enhancedRegistrations.push(baseRegistration);
          }
        }

        reportList.value = enhancedRegistrations;

        // Update registeredProductCount with the actual count from the filtered list
        registeredProductCount.value = reportList.value.length;
      } else {
        console.warn(
          `Không thể tải danh sách đăng ký đã duyệt: ${registrationsResult.message}`
        );
        reportList.value = [];
      }
    } else {
      console.warn("Không tìm thấy Supplier ID trong local storage.");
      toast.warning(
        "Không tìm thấy ID nhà cung cấp để tải thông tin tổng hợp riêng."
      );
    }
  } catch (err: any) {
    console.error("Error fetching data:", err);
    error.value = "Đã xảy ra lỗi nghiêm trọng khi tải dữ liệu.";
    toast.error(error.value);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

// --- Refresh Data ---
const refreshData = async () => {
  await fetchData();
  toast.success("Đã làm mới dữ liệu");
};

// --- Delete Registration ---
const deleteDialog = ref(false);
const deleteProductId = ref("");
const deleteProductName = ref("");

const openDeleteDialog = (productId: string, productName: string) => {
  deleteProductId.value = productId;
  deleteProductName.value = productName;
  deleteDialog.value = true;
};

const deleteItem = async () => {
  if (!deleteProductId.value) return;

  try {
    const result = await removeRegistration(deleteProductId.value, props.id);
    if (result.success) {
      toast.success(
        `Đã hủy đăng ký sản phẩm "${deleteProductName.value}" thành công`
      );
      const index = reportList.value.findIndex(
        (item) => item.productId === deleteProductId.value
      );
      if (index !== -1) {
        reportList.value.splice(index, 1);
        if (
          registeredProductCount.value !== null &&
          registeredProductCount.value > 0
        ) {
          registeredProductCount.value--;
        }
      }
    } else {
      toast.error(`Lỗi khi hủy đăng ký: ${result.message}`);
    }
  } catch (err: any) {
    console.error("Error removing registration:", err);
    toast.error("Đã xảy ra lỗi khi hủy đăng ký");
  } finally {
    deleteProductId.value = "";
    deleteProductName.value = "";
    deleteDialog.value = false;
  }
};

// --- Formatting ---
const formatDate = (date: Date | string | null) => {
  if (!date) return "Không có dữ liệu";
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Ngày không hợp lệ";
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Error parsing date:", date, e);
    return "Ngày lỗi";
  }
};

const formatNumber = (value: number | null | undefined) => {
  return value !== null && value !== undefined ? value : "N/A";
};
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="d-flex align-center">
        <VIcon icon="bx-store" size="2rem" class="me-2" />
        <span>Thông tin Dropshipper</span>
        <VSpacer />
        <VBtn
          v-if="!isLoading"
          color="primary"
          variant="text"
          @click="refreshData"
        >
          <VIcon icon="bx-refresh" class="me-2" /> Làm mới
        </VBtn>
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
        <VCard variant="outlined" class="mb-4">
          <VCardTitle>Thông tin cơ bản</VCardTitle>
          <VCardText>
            <VRow>
              <VCol cols="12" sm="4" md="3">
                <div class="text-button">Tên cửa hàng (Dropshipper):</div>
              </VCol>
              <VCol cols="12" sm="8" md="9">
                <div class="text-button">{{ name ?? "N/A" }}</div>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" sm="4" md="3">
                <div class="text-button">Mã cửa hàng (Dropshipper):</div>
              </VCol>
              <VCol cols="12" sm="8" md="9">
                <div class="text-button">{{ props.id }}</div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>

        <!-- Statistics Cards -->
        <VRow>
          <!-- Tổng quan CHUNG của Dropshipper -->
          <VCol cols="12" md="6">
            <VCard variant="outlined" class="h-100">
              <VCardTitle>
                <VIcon icon="bx-stats" class="me-2" />
                Tổng quan chung
              </VCardTitle>
              <VCardText>
                <VRow>
                  <VCol cols="8">
                    <div class="text-button">Tổng số sản phẩm đăng ký:</div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip color="primary" size="small">
                      {{ formatNumber(overallRegisteredProducts) }}
                    </VChip>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="8">
                    <div class="text-button">Tổng số đơn hoàn thành:</div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip color="success" size="small">
                      {{ formatNumber(overallCompletedOrders) }}
                    </VChip>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="8">
                    <div class="text-button">
                      Tổng số lượng sản phẩm đã bán:
                    </div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip color="success" size="small">
                      {{ formatNumber(overallSoldQuantity) }}
                    </VChip>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="8">
                    <div class="text-button">Tổng số nhà cung cấp hợp tác:</div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip color="info" size="small">
                      {{ formatNumber(overallSuppliersCount) }}
                    </VChip>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <!-- Tổng quan hợp tác với nhà cung cấp hiện tại -->
          <VCol cols="12" md="6">
            <VCard variant="outlined" class="h-100">
              <VCardTitle>
                <VIcon icon="bx-line-chart" class="me-2" />
                Tổng quan (Với tôi)
              </VCardTitle>
              <VCardText>
                <VRow>
                  <VCol cols="8">
                    <div class="text-button">
                      Số sản phẩm đã đăng ký (đã duyệt):
                    </div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip color="primary" size="small">
                      {{ formatNumber(registeredProductCount) }}
                    </VChip>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="8">
                    <div class="text-button">Đơn hoàn thành (tháng này):</div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip
                      :color="completedOrders ? 'success' : 'secondary'"
                      size="small"
                    >
                      {{ formatNumber(completedOrders) }}
                    </VChip>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="8">
                    <div class="text-button">Đơn hoàn thành (tất cả):</div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip
                      :color="completedOrdersAllTime ? 'success' : 'secondary'"
                      size="small"
                    >
                      {{ formatNumber(completedOrdersAllTime) }}
                    </VChip>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="8">
                    <div class="text-button">SL đã bán (tháng này):</div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip
                      :color="soldProductQuantity ? 'success' : 'secondary'"
                      size="small"
                    >
                      {{ formatNumber(soldProductQuantity) }}
                    </VChip>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="8">
                    <div class="text-button">SL đã bán (tất cả):</div>
                  </VCol>
                  <VCol cols="4" class="text-right">
                    <VChip
                      :color="
                        soldProductQuantityAllTime ? 'success' : 'secondary'
                      "
                      size="small"
                    >
                      {{ formatNumber(soldProductQuantityAllTime) }}
                    </VChip>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

        <!-- Danh sách sản phẩm đã đăng ký (với NCC này) -->
        <VCard class="mt-6">
          <VCardTitle class="text-h6 font-weight-medium">
            <VIcon icon="bx-package" class="me-2"></VIcon>
            Danh sách sản phẩm đã đăng ký (Đã duyệt)
            <VRow style="direction: ltr;" class="mt-6">
              <VCol cols="12" offset-md="0" md="4">
                <VTextField
                  v-model="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  append-inner-icon="bx-search"
                  single-line
                  hide-details
                  dense
                  outlined
                  clearable
                />
              </VCol>
            </VRow>
          </VCardTitle>
          <VCardText class="mt-3">
            <VDataTable
              :headers="headers"
              :items="reportList"
              :items-per-page="10"
              :search="search"
              :loading="isLoading"
              density="compact"
              hover
              class="elevation-1"
              no-data-text="Không có sản phẩm nào được đăng ký hoặc đã duyệt với nhà cung cấp này."
              loading-text="Đang tải danh sách sản phẩm..."
              :sort-by="[{ key: 'quantitySold', order: 'desc' }]"
            >
              <template #item.productName="{ item }">
                <RouterLink :to="`/supplier/product-info/${item.productId}`">
                  {{ item.productName }}
                </RouterLink>
              </template>

              <template #item.registrationDate="{ item }">
                {{ formatDate(item.registrationDate) }}
              </template>

              <template #item.completedOrders="{ item }">
                <VChip
                  size="x-small"
                  :color="item.completedOrders > 0 ? 'success' : 'secondary'"
                  class="font-weight-medium"
                >
                  {{ item.completedOrders }}
                </VChip>
              </template>

              <template #item.pendingOrders="{ item }">
                <VChip
                  size="x-small"
                  :color="item.pendingOrders > 0 ? 'warning' : 'secondary'"
                  class="font-weight-medium"
                >
                  {{ item.pendingOrders }}
                </VChip>
              </template>

              <template #item.quantitySold="{ item }">
                <VChip
                  size="x-small"
                  :color="item.quantitySold > 0 ? 'success' : 'secondary'"
                  class="font-weight-medium"
                >
                  {{ item.quantitySold }}
                </VChip>
              </template>

              <template #item.stockRemaining="{ item }">
                <VChip
                  size="x-small"
                  :color="
                    item.stockRemaining > 20
                      ? 'success'
                      : item.stockRemaining > 0
                      ? 'warning'
                      : 'error'
                  "
                  class="font-weight-medium"
                >
                  {{ item.stockRemaining }}
                </VChip>
              </template>

              <template #item.action="{ item }">
                <div class="d-flex justify-center">
                  <IconBtn
                    @click="
                      router.push(`/supplier/product-info/${item.productId}`)
                    "
                  >
                    <VTooltip activator="parent" location="top"
                      >Xem sản phẩm</VTooltip
                    >
                    <VIcon icon="bx-info-circle" color="info" />
                  </IconBtn>

                  <IconBtn
                    @click="openDeleteDialog(item.productId, item.productName)"
                  >
                    <VTooltip activator="parent" location="top"
                      >Hủy đăng ký</VTooltip
                    >
                    <VIcon icon="bx-trash" color="error" />
                  </IconBtn>
                </div>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCardText>
    </VCard>

    <!-- Delete Confirmation Dialog -->
    <VDialog v-model="deleteDialog" max-width="500px" persistent>
      <VCard title="Xác nhận hủy đăng ký">
        <VCardText>
          <p>
            Bạn có chắc chắn muốn hủy đăng ký bán sản phẩm
            <strong>"{{ deleteProductName }}"</strong> cho dropshipper
            <strong>{{ name ?? props.id }}</strong
            >?
          </p>
          <p class="text-caption text-error">
            Hành động này không thể hoàn tác và sẽ khiến dropshipper không thể
            bán sản phẩm này nữa.
          </p>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            variant="outlined"
            color="secondary"
            @click="deleteDialog = false"
          >
            Bỏ qua
          </VBtn>
          <VBtn color="error" variant="elevated" @click="deleteItem">
            Xác nhận hủy
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.text-button {
  font-weight: 500;
  min-block-size: 24px; /* Ensure consistent height */
}

.text-right {
  text-align: end;
}

:deep(.v-card-title) {
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
