<script setup lang="ts">
import {
  approveRegistrationForCurrentSupplier,
  getPendingRegistrationsForCurrentSupplier,
  rejectRegistrationForCurrentSupplier,
} from "@/utils/registration-api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

// State management
const isLoading = ref(true);
const error = ref<string | null>(null);
const pendingRegistrations = ref<any[]>([]);
const search = ref("");

// Fetch all pending registrations for the current supplier
const fetchPendingRegistrations = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const result = await getPendingRegistrationsForCurrentSupplier();
    if (result.success) {
      pendingRegistrations.value = result.data.map((item: any) => ({
        id: item.id || "", // Registration ID if available
        dropshipperId: item.dropshipperId || "",
        dropshipperName: item.dropshipper?.name || "Không xác định",

        productId: item.productId || "",
        productName: item.product?.name || "Không xác định",

        commissionFee: `${item.commissionFee}%`,
        registrationDate: new Date(item.createdDate || Date.now()),
      }));
    } else {
      error.value =
        result.message || "Không thể tải danh sách đăng ký đang chờ duyệt.";
      toast.error(error.value);
    }
  } catch (err) {
    console.error("Error fetching pending registrations:", err);
    error.value = "Đã xảy ra lỗi khi tải dữ liệu đăng ký chờ duyệt.";
    toast.error(error.value);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPendingRegistrations();
});

// Table headers
const headers = [
  { title: "Cửa hàng", key: "dropshipper" },
  { title: "Tên sản phẩm", key: "product" },
  { title: "Mã sản phẩm", key: "productId" },
  { title: "Phí hoa hồng dự kiến", key: "commissionFee", maxWidth: "150px" },
  { title: "Ngày đăng ký", key: "registrationDate" },
  { title: "Hành động", key: "action", sortable: false, align: "center" },
];

// Date formatting utility
const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ";
  }

  const day = parsedDate.getDate().toString().padStart(2, "0");
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
};

// Rejection management
const rejectDialog = ref(false);
const rejectItem = ref<any>(null);

const openRejectDialog = (item: any) => {
  rejectItem.value = item;
  rejectDialog.value = true;
};

const handleReject = async () => {
  if (!rejectItem.value) return;

  isLoading.value = true;
  try {
    const result = await rejectRegistrationForCurrentSupplier(
      rejectItem.value.productId,
      rejectItem.value.dropshipperId
    );

    if (result.success) {
      toast.success(
        `Đã từ chối đăng ký của ${rejectItem.value.dropshipperName}`
      );

      // Remove from the list
      pendingRegistrations.value = pendingRegistrations.value.filter(
        (item) =>
          !(
            item.productId === rejectItem.value.productId &&
            item.dropshipperId === rejectItem.value.dropshipperId
          )
      );
    } else {
      toast.error(`Lỗi khi từ chối đăng ký: ${result.message}`);
    }
  } catch (err) {
    console.error("Error rejecting registration:", err);
    toast.error("Đã xảy ra lỗi khi từ chối đăng ký");
  } finally {
    isLoading.value = false;
    rejectDialog.value = false;
    rejectItem.value = null;
  }
};

// Approval management
const approveDialog = ref(false);
const approveItem = ref<any>(null);

const openApproveDialog = (item: any) => {
  approveItem.value = item;
  approveDialog.value = true;
};

const handleApprove = async () => {
  if (!approveItem.value) return;

  isLoading.value = true;
  try {
    const result = await approveRegistrationForCurrentSupplier(
      approveItem.value.productId,
      approveItem.value.dropshipperId
    );

    if (result.success) {
      toast.success(
        `Đã duyệt đăng ký của ${approveItem.value.dropshipperName}`
      );

      // Remove from the list
      pendingRegistrations.value = pendingRegistrations.value.filter(
        (item) =>
          !(
            item.productId === approveItem.value.productId &&
            item.dropshipperId === approveItem.value.dropshipperId
          )
      );
    } else {
      toast.error(`Lỗi khi duyệt đăng ký: ${result.message}`);
    }
  } catch (err) {
    console.error("Error approving registration:", err);
    toast.error("Đã xảy ra lỗi khi duyệt đăng ký");
  } finally {
    isLoading.value = false;
    approveDialog.value = false;
    approveItem.value = null;
  }
};
</script>

<template>
  <div>
    <VCard>
      <VCardTitle>
        <VIcon icon="bx-list-check" size="2rem" class="me-2" />
        <span>Đăng ký đang chờ duyệt</span>
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
          :headers="headers"
          :items="pendingRegistrations"
          :items-per-page="10"
          :search="search"
        >
          <!-- Loading state -->
          <template #loading>
            <div class="d-flex align-center justify-center pa-5">
              <VProgressCircular indeterminate />
            </div>
          </template>

          <!-- Empty state -->
          <template #no-data>
            <div class="text-center py-6">
              <div v-if="isLoading">
                <VProgressCircular indeterminate class="mb-3" />
                <p>Đang tải dữ liệu...</p>
              </div>
              <div v-else>
                <VIcon
                  icon="bx-info-circle"
                  size="48px"
                  color="info"
                  class="mb-3"
                />
                <p>Không có đăng ký nào đang chờ duyệt</p>
              </div>
            </div>
          </template>

          <!-- Table cell templates -->
          <template #item.dropshipper="{ item }">
            <RouterLink
              :to="`/supplier/dropshipper-info/${item.dropshipperId}`"
            >
              {{ item.dropshipperName }}
            </RouterLink>
          </template>

          <template #item.product="{ item }">
            <RouterLink :to="`/supplier/product-info/${item.productId}`">
              {{ item.productName }}
            </RouterLink>
          </template>

          <template #item.registrationDate="{ item }">
            {{ formatDate(item.registrationDate) }}
          </template>

          <template #item.action="{ item }">
            <div class="d-flex justify-center">
              <IconBtn @click="openRejectDialog(item)" class="me-1">
                <VTooltip activator="parent" location="top">Từ chối</VTooltip>
                <VIcon icon="bx-x-circle" color="error" />
              </IconBtn>
              <IconBtn @click="openApproveDialog(item)">
                <VTooltip activator="parent" location="top">Chấp nhận</VTooltip>
                <VIcon icon="bx-check-circle" color="success" />
              </IconBtn>
            </div>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>

    <!-- Approve Dialog -->
    <VDialog v-model="approveDialog" max-width="500px" persistent>
      <VCard>
        <VCardTitle class="text-h5">Xác nhận chấp thuận đăng ký</VCardTitle>
        <VCardText v-if="approveItem">
          <p>
            Bạn có chắc chắn muốn chấp thuận cho dropshipper
            <strong>{{ approveItem.dropshipperName }}</strong> bán sản phẩm
            <strong>{{ approveItem.productName }}</strong> với phí hoa hồng
            <strong>{{ approveItem.commissionFee }}</strong> không?
          </p>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            variant="outlined"
            color="secondary"
            @click="approveDialog = false"
          >
            Hủy
          </VBtn>
          <VBtn
            variant="elevated"
            color="success"
            @click="handleApprove"
            :loading="isLoading"
          >
            Xác nhận duyệt
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Reject Dialog -->
    <VDialog v-model="rejectDialog" max-width="500px" persistent>
      <VCard>
        <VCardTitle class="text-h5">Xác nhận từ chối đăng ký</VCardTitle>
        <VCardText v-if="rejectItem">
          <p>
            Bạn có chắc chắn muốn từ chối đăng ký của dropshipper
            <strong>{{ rejectItem.dropshipperName }}</strong> để bán sản phẩm
            <strong>{{ rejectItem.productName }}</strong> không?
          </p>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            variant="outlined"
            color="secondary"
            @click="rejectDialog = false"
          >
            Hủy
          </VBtn>
          <VBtn
            variant="elevated"
            color="error"
            @click="handleReject"
            :loading="isLoading"
          >
            Xác nhận từ chối
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.v-card-title {
  flex-wrap: wrap;
}
</style>
