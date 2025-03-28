import { defineComponent } from "@vue/composition-api";
<script setup lang="ts">
import { VCardText } from "vuetify/components";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const name = ref("dropshipper 1 - Tên cửa hàng");
const orderNumber = ref(10000);

// Tạo danh sách 30 phần tử
const reportList = ref(
  Array.from({ length: 100 }, (_, index) => ({
    productName: `Sản phẩm ${index + 1}`, // Tên sản phẩm
    id: `DSH-${Math.floor(1000 + Math.random() * 9000)}`, // ID ngẫu nhiên
    commissionFee: `${(Math.random() * 10 + 1).toFixed(2)}%`, // Chi phí hoa hồng (1% - 10%)
    registrationDate: new Date(Date.now() - Math.random() * 10000000000), // Ngày đăng ký ngẫu nhiên
    completedOrders: Math.floor(Math.random() * 500), // Số đơn đã hoàn thành (0-500)
    pendingOrders: Math.floor(Math.random() * 100), // Số đơn đợi duyệt (0-100)
    quantitySold: Math.floor(Math.random() * 1000), // Số lượng đã bán (0-1000)
  }))
);

const headers = [
  { key: "productName" , align: ' d-none'},
  { title: "Tên sản phẩm", key: "product" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Phí hoa hồng", key: "commissionFee" },
  { title: "Ngày đăng ký", key: "registrationDate" },
  { title: "Số đơn hoàn thành", key: "completedOrders" },
  { title: "Số đơn đợi", key: "pendingOrders" },
  { title: "Số lượng đã bán", key: "quantitySold" },
];

const router = useRouter();
const search = ref("");

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const day = parsedDate.getDate(); // Lấy ngày
  const month = parsedDate.getMonth() + 1; // Lấy tháng (tháng bắt đầu từ 0 nên cần +1)
  const year = parsedDate.getFullYear(); // Lấy năm

  return `ngày ${day}/${month}/${year}`; // Trả về chuỗi định dạng "ngày dd/mm/yyyy"
};
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex align-center">
      <VIcon icon="bx-package" size="2rem" class="me-2" />
      <span>Thông tin mặt hàng</span>
    </VCardTitle>

    <VCardText class="mt-6">
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Tên cửa hàng (dropshipper) :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ name }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Mã cửa hàng (dropshipper) :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ props.id }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số đơn đã hoàn thành :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ orderNumber }}</div>
        </VCol>
      </VRow>

      <VCard class="mt-6">
        <VCardTitle class="text-h6 font-weight-medium">
          <VIcon icon="bx-package"></VIcon>
          Danh sách sản phẩm đã đăng ký
          <VRow style="direction: ltr" class="mt-6">
            <VCol cols="12" offset-md="0" md="4">
              <VTextField
                v-model="search"
                placeholder="Search ..."
                append-inner-icon="bx-search"
                single-line
                hide-details
                dense
                outlined
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText class="mt-3">
          <VDataTable
            :headers="headers"
            :items="reportList"
            :items-per-page="20"
            :search="search"
          >
            <template #item.product="{ item }">
              <RouterLink :to="`/supplier/product-info/${item.id}`">{{
                item.productName
              }}</RouterLink>
            </template>
            <template #item.registrationDate="{ item }">
              {{ formatDate(item.registrationDate) }}
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCardText>
  </VCard>
  <!-- <a
    href="https://themeselection.com"
    target="_blank"
    rel="noopener noreferrer"
    class="text-primary ms-1"
    >ThemeSelection</a
  > -->
</template>
