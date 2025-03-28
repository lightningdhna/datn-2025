import { defineComponent } from "@vue/composition-api";
<script setup lang="ts">
import { requiredValidator } from "@/utils/validator";
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
const newDialog = ref(false);
const newItem = ref<any | undefined>();

const openNewDialog = () => {
  console.log("....");
  newItem.value = {
    id: "",
    name: "",
    commissionFee: 0,
    dateRegistered: new Date(),
  };
  newDialog.value = true;
};

const saveNewItem = () => {
  newDialog.value = false;
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
            <div class="text-button">Nhà cung cấp :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <RouterLink
              class="text-primary text-button"
              :to="`../supplier-info/${supplierId}`"
            >
              {{ supplierName }}
            </RouterLink>
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

    <VDialog v-model="newDialog" max-width="600px">
      <VCard title="Edit Item">
        <VCardText>
          <VFrom @submit.prevent>
            <VRow>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="newItem.commissionFee"
                  label="Phí hoa hồng mong muốn"
                  :rules="[requiredValidator]"
                  suffix="%"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VAutocomplete
                  v-model="productName"
                  label="Tên sản phẩm"
                  readonly
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField v-model="props.id" label="Mã sản phẩm" readonly />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="supplierName"
                  label="Tên nhà cung cấp"
                  readonly
                />
              </VCol>

              <VCol cols="12" sm="6">
                <MyDatePicker
                  v-model="newItem.dateRegistered"
                  label="Ngày đăng ký"
                  disable
                />
              </VCol>
            </VRow>
          </VFrom>
        </VCardText>

        <VCardText>
          <div class="self-align-end d-flex gap-4 justify-end">
            <VBtn
              color="gray"
              variant="outlined"
              @click="() => (newDialog = false)"
            >
              <VIcon icon="bx-x"></VIcon> | Hủy bỏ
            </VBtn>
            <VBtn color="success" variant="elevated" @click="saveNewItem"
              ><VIcon icon="bx-save"></VIcon>| Đăng ký
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <div class="dock-div">
      <VBtn @click="openNewDialog" class="dock-button ms-2">
        <VIcon icon="bx-user-plus" class="me-2" /> | Đăng ký
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.dock-div {
  position: fixed; /* Cố định vị trí */
  top: 100px; /* Cách phía trên 20px */
  right: 50px; /* Cách phía phải 20px */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
}
.dock-button {
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}
.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}
</style>
