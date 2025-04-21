<script setup lang="ts">
import {
  getDropshippersBySupplierId,
  getDropshipperSupplierSummary,
} from "@/utils/dropshipper-api";
import { getSupplierId } from "@/utils/local-storage";
import { removeAllRegistrationsWithCurrentSupplierByDropshipper } from "@/utils/registration-api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

// Khai báo state
const isLoading = ref(true);
const error = ref<string | null>(null);
const dropshipperList = ref<any[]>([]);
const supplierId = getSupplierId();

// Track current month and year from summary data
const currentMonth = ref<number | null>(null);
const currentYear = ref<number | null>(null);

// Hàm lấy danh sách dropshipper
const fetchDropshippers = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    if (!supplierId) {
      error.value = "Không tìm thấy ID nhà cung cấp.";
      return;
    }

    const result = await getDropshippersBySupplierId(supplierId);
    if (result.success) {
      dropshipperList.value = result.data;

      // Lấy thêm thông tin tổng hợp cho mỗi dropshipper
      await Promise.all(
        dropshipperList.value.map(async (dropshipper) => {
          try {
            const summaryResult = await getDropshipperSupplierSummary(
              dropshipper.id,
              supplierId
            );

            if (summaryResult.success) {
              // Store month/year from first summary result
              if (currentMonth.value === null && summaryResult.data.month) {
                currentMonth.value = summaryResult.data.month;
              }
              if (currentYear.value === null && summaryResult.data.year) {
                currentYear.value = summaryResult.data.year;
              }

              dropshipper.completedOrders =
                summaryResult.data.completedOrderCount || 0;
              dropshipper.completedOrdersAllTime =
                summaryResult.data.completedOrderCountAllTime || 0;
              dropshipper.quantitySold =
                summaryResult.data.soldProductQuantity || 0;
              dropshipper.totalSoldQuantity =
                summaryResult.data.soldProductQuantityAllTime || 0;
              dropshipper.registeredProductCount =
                summaryResult.data.registeredProductCount || 0;
            }
          } catch (err) {
            console.error("Lỗi khi lấy thông tin tổng hợp:", err);
          }
        })
      );
    } else {
      error.value = result.message || "Không thể lấy danh sách dropshipper.";
    }
  } catch (err) {
    console.error("Lỗi khi gọi API:", err);
    error.value = "Đã xảy ra lỗi khi lấy dữ liệu.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDropshippers();
});

const headers = [
  { title: "Cửa hàng", key: "dropshipper" },
  {
    title: "Số sản phẩm đăng ký",
    key: "registeredProductCount",
    align: "end",
    maxWidth: "120px",
  },
  {
    title: "Đơn hoàn thành (tháng này)",
    key: "completedOrders",
    align: "end",
    maxWidth: "120px",
  },
  {
    title: "Đơn hoàn thành (tất cả)",
    key: "completedOrdersAllTime",
    align: "end",
    maxWidth: "120px",
  },
  {
    title: "SL đã bán (tháng này)",
    key: "quantitySold",
    align: "end",
    maxWidth: "120px",
  },
  {
    title: "SL đã bán (tất cả)",
    key: "totalSoldQuantity",
    align: "end",
    maxWidth: "120px",
  },
  {
    title: "",
    key: "action",
    align: "center",
    sortable: false,
    minWidth: "130px",
  },
];

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ";
  }

  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();

  return `ngày ${day}/${month}/${year}`;
};

const search = ref("");
const deleteDialog = ref(false);
const deleteId = ref("");
const deleteDropshipperName = ref("");

const openDeleteDialog = (id: string, name: string) => {
  deleteId.value = id;
  deleteDropshipperName.value = name;
  deleteDialog.value = true;
};
// Xử lý xóa tất cả đăng ký của một dropshipper với nhà cung cấp hiện tại
const deleteItem = async () => {
  if (!deleteId.value) return;

  try {
    // Gọi API xóa tất cả đăng ký của dropshipper với nhà cung cấp hiện tại
    const result = await removeAllRegistrationsWithCurrentSupplierByDropshipper(
      deleteId.value
    );

    if (result.success) {
      // Xóa dropshipper khỏi danh sách hiển thị
      dropshipperList.value = dropshipperList.value.filter(
        (dropshipper) => dropshipper.id !== deleteId.value
      );

      toast.success(
        `Đã xóa tất cả đăng ký sản phẩm của ${deleteDropshipperName.value}!`
      );
    } else {
      toast.error(result.message || "Không thể xóa đăng ký của dropshipper.");
    }
  } catch (error) {
    console.error("Lỗi khi xóa đăng ký:", error);
    toast.error("Đã xảy ra lỗi khi xóa đăng ký sản phẩm.");
  } finally {
    deleteId.value = "";
    deleteDropshipperName.value = "";
    deleteDialog.value = false;
  }
};
</script>

<template>
  <VCard>
    <VCardTitle class="">
      <VIcon icon="bx-store" size="2rem" class="me-2" />
      <span>Danh sách dropshipper</span>

      <!-- Thêm hiển thị thời gian -->
      <div
        v-if="currentMonth && currentYear"
        class="text-subtitle-2 text-medium-emphasis mt-1"
      >
        Dữ liệu "tháng này" là tháng {{ currentMonth }}/{{ currentYear }}
      </div>

      <VRow class="mt-2 mb-4">
        <VCol cols="12" offset-md="0" md="4">
          <VTextField
            v-model="search"
            placeholder="Tìm kiếm..."
            append-inner-icon="bx-search"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <VAlert
        v-if="error"
        type="error"
        variant="tonal"
        closable
        @click:close="error = null"
      >
        {{ error }}
      </VAlert>

      <VDataTable
        :loading="isLoading"
        :items="dropshipperList"
        :headers="headers"
        :items-per-page="10"
        :search="search"
        :sort-by="[{ key: 'totalSoldQuantity', order: 'desc' }]"
      >
        <template #loading>
          <div class="d-flex align-center justify-center pa-5">
            <VProgressCircular indeterminate />
          </div>
        </template>

        <template #no-data>
          <p class="text-center py-5">
            {{
              isLoading
                ? "Đang tải dữ liệu..."
                : "Không tìm thấy dropshipper nào."
            }}
          </p>
        </template>

        <template #item.dropshipper="{ item }">
          <RouterLink :to="`/supplier/dropshipper-info/${item.id}`">
            {{ item.name }}
          </RouterLink>
        </template>

        <template #item.action="{ item }">
          <IconBtn
            @click="router.push(`/supplier/dropshipper-info/${item.id}`)"
          >
            <VTooltip activator="parent" location="top">Xem chi tiết</VTooltip>
            <VIcon icon="bx-info-circle" color="secondary" />
          </IconBtn>
          <IconBtn @click="openDeleteDialog(item.id, item.name)">
            <VTooltip activator="parent" location="top">Hủy đăng ký</VTooltip>
            <VIcon icon="bx-trash" color="error" />
          </IconBtn>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>

  <VDialog v-model="deleteDialog" max-width="500px">
    <VCard title="Xác nhận hủy đăng ký">
      <VCardText>
        Bạn có chắc chắn muốn xóa tất cả đăng ký sản phẩm của dropshipper "{{
          deleteDropshipperName
        }}" không?
        <div class="text-body-2 mt-2 text-error">
          Lưu ý: Tất cả sản phẩm mà dropshipper này đã đăng ký với cửa hàng của
          bạn sẽ bị hủy.
        </div>
        <div class="d-flex justify-center gap-4 mt-4">
          <VBtn
            variant="outlined"
            color="secondary"
            @click="() => (deleteDialog = false)"
          >
            Hủy bỏ
          </VBtn>
          <VBtn color="error" variant="outlined" @click="deleteItem">
            Xác nhận xóa
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
