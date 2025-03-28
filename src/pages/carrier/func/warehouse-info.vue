<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const warehouseName = ref("Kho hàng 1 - Tên kho hàng");
const supplierName = ref("NCC1");
const supplierId = ref("1234");

const productList = ref([
  { id: "P001", name: "Táo", quantity: 50 },
  { id: "P002", name: "Cam", quantity: 30 },
  { id: "P003", name: "Chuối", quantity: 20 },
  { id: "P004", name: "Xoài", quantity: 15 },
  { id: "P005", name: "Dưa hấu", quantity: 25 },
  { id: "P006", name: "Ổi", quantity: 10 },
  { id: "P007", name: "Mận", quantity: 40 },
  { id: "P008", name: "Dứa", quantity: 35 },
  { id: "P009", name: "Nho", quantity: 18 },
  { id: "P010", name: "Bưởi", quantity: 22 },
  { id: "P011", name: "Chanh", quantity: 28 },
  { id: "P012", name: "Quýt", quantity: 32 },
  { id: "P013", name: "Dâu tây", quantity: 12 },
  { id: "P014", name: "Kiwi", quantity: 45 },
  { id: "P015", name: "Lựu", quantity: 50 },
  { id: "P016", name: "Đào", quantity: 20 },
  { id: "P017", name: "Mít", quantity: 38 },
  { id: "P018", name: "Na", quantity: 25 },
  { id: "P019", name: "Sầu riêng", quantity: 30 },
  { id: "P020", name: "Me", quantity: 15 },
  { id: "P021", name: "Chôm chôm", quantity: 18 },
  { id: "P022", name: "Vải", quantity: 22 },
]);

const headers = [
  { title: "Tên mặt hàng", key: "name" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Số lượng còn", key: "quantity" },
  { title: "Chi tiết", key: "action" },
];
const router = useRouter();
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex align-center">
      <VIcon icon="bx-building-house" size="2rem" class="me-2" />
      <span>Thông tin kho hàng</span>
    </VCardTitle>

    <VCardText class="mt-6">
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Tên sản phẩm :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ warehouseName }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Mã kho hàng :</div>
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

      <VCard class="mt-6">
        <VCardTitle
          class="text-h6 font-weight-medium d-flex align-center gap-2"
        >
          <VIcon icon="bx-package"></VIcon>
          Danh sách hàng trong kho
        </VCardTitle>
        <VCardText class="mt-3">
          <VDataTable
            :headers="headers"
            :items="productList"
            :items-per-page="20"
          >
            <template #item.action="{ item }">
              <IconBtn>
                <VIcon
                  icon="bx-info-circle"
                  @click="router.push(`../product-info/${item.id}`)"
                />
              </IconBtn>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCardText>
  </VCard>
</template>
