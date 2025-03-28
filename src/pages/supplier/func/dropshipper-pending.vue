<script setup lang="ts">
import { isTemplateExpression } from "typescript";

const router = useRouter();

const dropshipperList = ref(
  Array.from({ length: 5 }, (_, index) => ({
    dropshipperName: `Dropshipper ${index + 1}`, // Tên dropshipper
    id: `DSH-${Math.floor(1000 + Math.random() * 9000)}`, // Mã ngẫu nhiên

    productName: `Sản phẩm ${index + 1}`, // Tên sản phẩm
    productId: `PRD-${Math.floor(1000 + Math.random() * 9000)}`, // ID ngẫu nhiên

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

  { key: "productName", align: " d-none" },
  { title: "Tên sản phẩm", key: "product" },
  { title: "Mã sản phẩm", key: "id" },

  { title: "Phí hoa hồng dự kiến", key: "commissionFee", maxWidth: "100px" },
  { title: "Ngày đăng ký", key: "registrationDate" },

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

const acceptDialog = ref(false);
const acceptId = ref("");

const openAcceptDialog = (id: string) => {
  acceptId.value = id;
  acceptDialog.value = true;
};

const acceptItem = () => {
  const index = dropshipperList.value.findIndex(
    (dropshipper) => dropshipper.id === acceptId.value
  );

  if (index !== -1) {
    dropshipperList.value.splice(index, 1); // Xóa sản phẩm tại vị trí tìm được
  }

  acceptId.value = "";
  acceptDialog.value = false;
};
</script>

<template>
  <div>
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
              <template #item.product="{ item }">
                <RouterLink :to="`/supplier/product-info/${item.id}`">{{
                  item.productName
                }}</RouterLink>
              </template>
              <template #item.dropshipper="{ item }">
                <RouterLink :to="`/supplier/dropshipper-info/${item.id}`">{{
                  item.dropshipperName
                }}</RouterLink>
              </template>

              <template #item.registrationDate="{ item }">
                {{ formatDate(item.registrationDate) }}
              </template>
              <template #item.action="{ item }">
                <IconBtn @click="openDeleteDialog(item.id)">
                  <VIcon icon="bx-trash" color="error" />
                </IconBtn>
                <IconBtn @click="openAcceptDialog(item.id)">
                  <VIcon icon="bx-check" color="success" />
                </IconBtn>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCardText>
    </VCard>

    <VDialog v-model="acceptDialog" max-width="500px">
      <VCard title="Bạn có muốn duyệt đăng ký này không?">
        <VCardText>
          <div class="d-flex justify-center gap-4">
            <VBtn
              variant="outlined"
              color="secondary"
              @click="() => (acceptDialog = false)"
            >
              Bỏ qua
            </VBtn>
            <VBtn color="success" variant="outlined" @click="acceptItem">
              Xác nhận duyệt
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog v-model="deleteDialog" max-width="500px">
      <VCard title="Bạn có muốn xóa đăng ký này không?">
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
  </div>
</template>

