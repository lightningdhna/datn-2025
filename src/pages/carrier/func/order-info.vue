<script setup lang="ts">
import { VCardText } from "vuetify/components";

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const dateCreated = ref<Date>(new Date());
const productName = ref("Táo - Tên mặt hàng");
const productId = ref("prd1");
const demandNumber = ref<number>(10);
const supplierName = ref<string>("NCC1 - Tên nhà cung cấp");
const supplierId = ref("Ncc1");
const quantityLeft = ref(550);
const dropshipperName = ref("dp1 - Tên dropshipper ( cửa hàng)");
const dropshipperId = ref("dp1");
const customerLocation = ref("đâu đó ở Hà nội, Việt nam");
const status = ref("pending");

const deleteDialog = ref(false);
const deleteItem = async () => {
  console.log("on deleting item");
};

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

const resolveStatusColor = (status: string) => {
  if (status === "confirmed") return "primary";
  if (status === "completed") return "success";
  if (status === "declined") return "error";
  if (status === "pending") return "warning";
};
const resolveStatusText = (status: string) => {
  if (status === "confirmed") return "Đang giao";
  if (status === "completed") return "Đã hoàn thành";
  if (status === "declined") return "X";
  if (status === "pending") return "Đợi duyệt";
};

const totalQuantity = ref<number>(1);
const productStored = ref([
  { id: "WH001", name: "Kho A", location: "Hà Nội", quantity: 50 },
  { id: "WH002", name: "Kho B", location: "Hồ Chí Minh", quantity: 30 },
  { id: "WH003", name: "Kho C", location: "Đà Nẵng", quantity: 20 },
  { id: "WH004", name: "Kho D", location: "Hải Phòng", quantity: 15 },
  { id: "WH005", name: "Kho E", location: "Cần Thơ", quantity: 25 },
  { id: "WH006", name: "Kho F", location: "Nha Trang", quantity: 10 },
  { id: "WH007", name: "Kho G", location: "Vũng Tàu", quantity: 40 },
  { id: "WH008", name: "Kho H", location: "Quảng Ninh", quantity: 35 },
  { id: "WH009", name: "Kho I", location: "Huế", quantity: 18 },
  { id: "WH010", name: "Kho J", location: "Bình Dương", quantity: 22 },
  { id: "WH011", name: "Kho K", location: "Thanh Hóa", quantity: 28 },
  { id: "WH012", name: "Kho L", location: "Nghệ An", quantity: 32 },
  { id: "WH013", name: "Kho M", location: "Bắc Ninh", quantity: 12 },
  { id: "WH014", name: "Kho N", location: "Lâm Đồng", quantity: 45 },
  { id: "WH015", name: "Kho O", location: "Bà Rịa - Vũng Tàu", quantity: 50 },
  { id: "WH016", name: "Kho P", location: "Hậu Giang", quantity: 20 },
  { id: "WH017", name: "Kho Q", location: "Đồng Nai", quantity: 38 },
  { id: "WH018", name: "Kho R", location: "Long An", quantity: 25 },
  { id: "WH019", name: "Kho S", location: "Tiền Giang", quantity: 30 },
  { id: "WH020", name: "Kho T", location: "Bến Tre", quantity: 15 },
  { id: "WH021", name: "Kho U", location: "Phú Thọ", quantity: 18 },
  { id: "WH022", name: "Kho V", location: "Thái Nguyên", quantity: 22 },
]);

const headers = [
  { title: "Tên kho", key: "name" },
  { title: "Địa chỉ kho", key: "location" },
  { title: "Số lượng còn", key: "quantity" },
  { title: "Chi tiết", key: "action" },
];
// Ví dụ: Gán giá trị cho `dateCreated`
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex align-center">
      <VIcon icon="bx-receipt" size="2rem" class="me-2" />
      <span>Thông tin đơn hàng</span>
    </VCardTitle>

    <VCardText class="mt-6">
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Mã đơn hàng :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ props.id }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Trạng thái :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div :class="`text-button text-${resolveStatusColor(status)}`">
            {{ resolveStatusText(status) }}
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Sản phẩm :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <RouterLink
            class="text-primary text-button"
            :to="`../product-info/${productId}`"
          >
            {{ productName }}</RouterLink
          >
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng yêu cầu :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ demandNumber }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Địa chỉ :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">
            {{ customerLocation }}
          </div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Thời điểm tạo :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ formatDate(dateCreated) }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Nhà cung cấp :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <RouterLink
            class="text-button text-primary"
            :to="`../supplier-info/${supplierId}`"
          >
            {{ supplierName }}
          </RouterLink>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Dropshipper :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <RouterLink
            class="text-button text-primary"
            :to="`../dropshipper/${dropshipperId}`"
          >
            {{ dropshipperName }}
          </RouterLink>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng hàng còn :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ quantityLeft }}</div>
        </VCol>
      </VRow>

      <VCard class="mt-6">
        <VCardTitle class="text-h6 font-weight-medium">
          Danh sách kho còn hàng
        </VCardTitle>
        <VCardText class="mt-3">
          <VDataTable
            :headers="headers"
            :items="productStored"
            :items-per-page="20"
          >
            <template #item.action="{ item }">
              <IconBtn>
                <VIcon
                  icon="bx-info-circle"
                  @click="router.push(`../warehouse-info/${item.id}`)"
                />
              </IconBtn>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCardText>
  </VCard>
  <div class="dock-button d-flex align-items-center gap-2">
    <VBtn v-if="false && status === 'pending'" color="primary" variant="tonal">
      Duyệt
    </VBtn>
    <VBtn
      v-if="status === 'pending'"
      color="error"
      variant="tonal"
      @click="
        () => {
          deleteDialog = true;
        }
      "
    >
      <VIcon icon="bx-trash" class="me-2"></VIcon>
      Hủy đơn
    </VBtn>
  </div>

  <VDialog v-model="deleteDialog" max-width="500px">
    <VCard title="Bạn có muốn hủy đơn hàng này không?">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn
            variant="outlined"
            color="secondary"
            @click="() => (deleteDialog = false)"
          >
            Bỏ qua
          </VBtn>
          <VBtn color="error" variant="outlined" @click="deleteItem">
            Xác nhận hủy
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.dock-button {
  position: fixed; /* Cố định vị trí */
  top: 100px; /* Cách phía trên 20px */
  right: 50px; /* Cách phía phải 20px */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}

.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}
</style>
