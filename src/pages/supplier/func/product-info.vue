import { defineComponent } from "@vue/composition-api";
<script setup lang="ts">
import { VCardText } from "vuetify/components";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const productName = ref("Táo - Tên sản phẩm");
const supplierName = ref("NCC1 - Nhà cung cấp 1");
const supplierId = ref<string>("123");
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

const router = useRouter();

const activeTab = ref("one");

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

const headers2 = [
  { key: "dropshipperName", align: " d-none" },
  { title: "Cửa hàng", key: "dropshipper" },
  { title: "Phí hoa hồng", key: "commissionFee" },
  { title: "Ngày đăng ký", key: "registrationDate" },
  { title: "Số đơn hoàn thành", key: "completedOrders" },
  { title: "Số đơn đợi", key: "pendingOrders" },
  { title: "Số lượng đã bán", key: "quantitySold" },
  { title: "", key: "action" },
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
  <div>
    <VCard>
      <VCardTitle class="d-flex align-center">
        <VIcon icon="bx-package" size="2rem" class="me-2" />
        <span>Thông tin mặt hàng</span>
      </VCardTitle>

      <VCardText class="mt-6">
        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Tên sản phẩm :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ productName }}</div>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Mã sản phẩm :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ props.id }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Số lượng hàng còn :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ totalQuantity }}</div>
          </VCol>
        </VRow>

        <VCard class="mt-6">
          <VCardTitle class="text-h6 font-weight-medium">
            <VRow style="direction: ltr" class="mt-6 mb-5">
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
            <VTabs v-model="activeTab">
              <VTab value="one">
                <div class="d-flex align-center">
                  <VIcon icon="bx-package" size="1.8rem" class="me-2" />
                  <span>Danh sách kho còn hàng</span>
                </div>
              </VTab>
              <VTab value="two">
                <div class="d-flex align-center">
                  <VIcon icon="bx-buildings" size="1.8rem" class="me-2" />
                  <span>Danh sách dropshipper bán</span>
                </div>
              </VTab>
            </VTabs>
          </VCardTitle>
          <VCardText class="mt-3">
            <VTabsWindow v-model="activeTab">
              <VTabsWindowItem value="one">
                <VCard>
                  <VCardText>
                    <VDataTable
                      :headers="headers"
                      :items="productStored"
                      :items-per-page="20"
                      :search="search"
                    >
                      <template #item.action="{ item }">
                        <IconBtn
                          @click="router.push(`../warehouse-info/${item.id}`)"
                        >
                          <VIcon icon="bx-info-circle" />
                        </IconBtn>
                      </template>
                    </VDataTable>
                  </VCardText>
                </VCard>
              </VTabsWindowItem>

              <VTabsWindowItem value="two">
                <VCard>
                  <VCardText>
                    <VDataTable
                      :items="dropshipperList"
                      :headers="headers2"
                      :items-per-page="20"
                      :search="search"
                    >
                      <template #item.dropshipper="{ item }">
                        <RouterLink
                          :to="`/supplier/dropshipper-info/${item.id}`"
                          >{{ item.dropshipperName }}</RouterLink
                        >
                      </template>
                      <template #item.action="{ item }">
                        <IconBtn @click="openDeleteDialog(item.id)">
                          <VIcon icon="bx-trash" color="error" />
                        </IconBtn>
                      </template>

                      <template #item.registrationDate="{ item }">
                        {{ formatDate(item.registrationDate) }}
                      </template>
                    </VDataTable>
                  </VCardText>
                </VCard>
              </VTabsWindowItem>
            </VTabsWindow>
          </VCardText>
        </VCard>
      </VCardText>
    </VCard>
    <VDialog v-model="deleteDialog" max-width="500px">
      <VCard title="Bạn có muốn hủy đăng kí của cửa hàng này không?">
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
  </div>
</template>
