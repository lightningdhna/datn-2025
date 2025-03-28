<script setup lang="ts">
import { isTemplateExpression } from "typescript";

const router = useRouter();

const dropshipperList = ref(
  Array.from({ length: 30 }, (_, index) => ({
    dropshipperName: `Dropshipper ${index + 1}`, // Tên dropshipper
    id: `DSH-${Math.floor(1000 + Math.random() * 9000)}`, // Mã ngẫu nhiên
    commissionFee: `${(Math.random() * 10 + 1).toFixed(2)}%`, // Phí hoa hồng (1% - 10%)
    registrationDate: new Date(Date.now() - Math.random() * 10000000000), // Ngày đăng ký ngẫu nhiên
    completedOrders: Math.floor(Math.random() * 500), // Số đơn hoàn thành (0-500)
    pendingOrders: Math.floor(Math.random() * 100), // Số đơn đợi (0-100)
    quantitySold: Math.floor(Math.random() * 1000), // Số lượng đã bán (0-1000)
  }))
);

const headers = [
  { key: "dropshipperName", align: " d-none" },
  { title: "Cửa hàng", key: "dropshipper" },
  { title: "Số đơn hoàn thành", key: "completedOrders" },
  { title: "Số đơn đợi", key: "pendingOrders" },
  { title: "Số lượng đã bán", key: "quantitySold" },

  { key: "action" },
];

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

const search = ref("");
const deleteDialog = ref(false);
const deleteId = ref("");

const openDeleteDialog = (id: string) => {
  deleteId.value = id;
  deleteDialog.value = true;
};

const deleteItem = () => {
  // Tìm vị trí của sản phẩm trong danh sách dựa trên deleteId
  const index = dropshipperList.value.findIndex(
    (dropshipper) => dropshipper.id === deleteId.value
  );

  // Nếu tìm thấy sản phẩm, xóa sản phẩm khỏi danh sách
  if (index !== -1) {
    dropshipperList.value.splice(index, 1); // Xóa sản phẩm tại vị trí tìm được
  }

  // Đặt lại deleteId và đóng dialog xóa
  deleteId.value = "";
  deleteDialog.value = false;
};
</script>

<template>
  <VCard>
    <VCardTitle class="">
      <VIcon icon="bx-package" size="2rem" class="me-2" />
      <span>Danh sách dropshipper</span>
      <VRow class="mt-2 mb-4">
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
    <VCardText>
      <VCard>
        <VCardText>
          <VDataTable
            :items="dropshipperList"
            :headers="headers"
            :items-per-page="20"
            :search="search"
          >
            <template #item.dropshipper="{ item }">
              <RouterLink :to="`/supplier/dropshipper-info/${item.id}`">{{
                item.dropshipperName
              }}</RouterLink>
            </template>

            <template #item.registrationDate="{ item }">
              {{ formatDate(item.registrationDate) }}
            </template>
            <template #item.action="{ item }">
              <IconBtn @click="router.push(`/supplier/dropshipper-info/${item.id}`)">
                <VIcon icon="bx-info-circle" color="secondary" />
              </IconBtn>
              <IconBtn @click="openDeleteDialog(item.id)">
                <VIcon icon="bx-trash" color="error" />
              </IconBtn>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCardText>
  </VCard>

  <VDialog v-model="deleteDialog" max-width="500px">
    <VCard title="Bạn có muốn xóa thông tin xe này không?">
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
            Xác nhận xóa
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
