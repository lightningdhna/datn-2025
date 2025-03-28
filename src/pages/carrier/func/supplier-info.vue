<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const supplierName = ref("Ncc1 - Tên nhà cung cấp");
const warehouseNumber = ref<number>(4);
const producdtNumber = ref<number>(20);
const activeTab = ref("one");

const productList = [
  { id: "SP001", name: "Táo", quantityLeft: 50, quantitySold: 20 },
  { id: "SP002", name: "Cam", quantityLeft: 30, quantitySold: 15 },
  { id: "SP003", name: "Chuối", quantityLeft: 20, quantitySold: 10 },
  { id: "SP004", name: "Xoài", quantityLeft: 15, quantitySold: 5 },
  { id: "SP005", name: "Dưa hấu", quantityLeft: 25, quantitySold: 12 },
  { id: "SP006", name: "Lê", quantityLeft: 10, quantitySold: 8 },
  { id: "SP007", name: "Ổi", quantityLeft: 40, quantitySold: 18 },
  { id: "SP008", name: "Mận", quantityLeft: 35, quantitySold: 22 },
  { id: "SP009", name: "Dứa", quantityLeft: 18, quantitySold: 9 },
  { id: "SP010", name: "Nho", quantityLeft: 22, quantitySold: 11 },
  { id: "SP011", name: "Bưởi", quantityLeft: 60, quantitySold: 30 },
  { id: "SP012", name: "Chanh", quantityLeft: 45, quantitySold: 25 },
  { id: "SP013", name: "Quýt", quantityLeft: 12, quantitySold: 6 },
  { id: "SP014", name: "Dâu tây", quantityLeft: 28, quantitySold: 14 },
  { id: "SP015", name: "Kiwi", quantityLeft: 33, quantitySold: 17 },
  { id: "SP016", name: "Lựu", quantityLeft: 50, quantitySold: 20 },
  { id: "SP017", name: "Đào", quantityLeft: 30, quantitySold: 15 },
  { id: "SP018", name: "Mít", quantityLeft: 20, quantitySold: 10 },
  { id: "SP019", name: "Na", quantityLeft: 15, quantitySold: 5 },
  { id: "SP020", name: "Sầu riêng", quantityLeft: 25, quantitySold: 12 },
  { id: "SP021", name: "Me", quantityLeft: 10, quantitySold: 8 },
  { id: "SP022", name: "Chôm chôm", quantityLeft: 40, quantitySold: 18 },
  { id: "SP023", name: "Vải", quantityLeft: 35, quantitySold: 22 },
  { id: "SP024", name: "Măng cụt", quantityLeft: 18, quantitySold: 9 },
  { id: "SP025", name: "Thanh long", quantityLeft: 22, quantitySold: 11 },
  { id: "SP026", name: "Dừa", quantityLeft: 60, quantitySold: 30 },
  { id: "SP027", name: "Táo tàu", quantityLeft: 45, quantitySold: 25 },
  { id: "SP028", name: "Hồng xiêm", quantityLeft: 12, quantitySold: 6 },
  { id: "SP029", name: "Cóc", quantityLeft: 28, quantitySold: 14 },
  { id: "SP030", name: "Khế", quantityLeft: 33, quantitySold: 17 },
];

const headers1 = [
  { title: "Tên sản phẩm", key: "name" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Số lượng còn", key: "quantityLeft" },
  { title: "Số lượng đã bán", key: "quantitySold" },
  { title: "", key: "action" },
];

const warehouseList = [
  {
    id: "WH001",
    name: "Kho Hà Nội",
    location: "Hà Nội",
    productNumber: 100,
    productList: [
      { id: "P001", name: "Táo" },
      { id: "P002", name: "Cam" },
      { id: "P003", name: "Chuối" },
      { id: "P004", name: "Xoài" },
      { id: "P005", name: "Dưa hấu" },
    ],
  },
  {
    id: "WH002",
    name: "Kho TP.HCM",
    location: "TP.HCM",
    productNumber: 0,
    productList: [],
  },
  {
    id: "WH003",
    name: "Kho Đà Nẵng",
    location: "Đà Nẵng",
    productNumber: 45,
    productList: [
      { id: "P006", name: "Ổi" },
      { id: "P007", name: "Mận" },
      { id: "P008", name: "Dứa" },
      { id: "P009", name: "Nho" },
      { id: "P010", name: "Bưởi" },
    ],
  },
  {
    id: "WH004",
    name: "Kho Hải Phòng",
    location: "Hải Phòng",
    productNumber: 30,
    productList: [
      { id: "P011", name: "Chanh" },
      { id: "P012", name: "Quýt" },
      { id: "P013", name: "Dâu tây" },
      { id: "P014", name: "Kiwi" },
    ],
  },
  {
    id: "WH005",
    name: "Kho Cần Thơ",
    location: "Cần Thơ",
    productNumber: 60,
    productList: [
      { id: "P015", name: "Lựu" },
      { id: "P016", name: "Đào" },
      { id: "P017", name: "Mít" },
      { id: "P018", name: "Na" },
      { id: "P019", name: "Sầu riêng" },
    ],
  },
  {
    id: "WH006",
    name: "Kho Bình Dương",
    location: "Bình Dương",
    productNumber: 15,
    productList: [
      { id: "P020", name: "Me" },
      { id: "P021", name: "Chôm chôm" },
      { id: "P022", name: "Vải" },
    ],
  },
  {
    id: "WH007",
    name: "Kho Đồng Nai",
    location: "Đồng Nai",
    productNumber: 80,
    productList: [
      { id: "P023", name: "Măng cụt" },
      { id: "P024", name: "Thanh long" },
      { id: "P025", name: "Dừa" },
      { id: "P026", name: "Táo tàu" },
    ],
  },
  {
    id: "WH008",
    name: "Kho Quảng Ninh",
    location: "Quảng Ninh",
    productNumber: 5,
    productList: [{ id: "P027", name: "Hồng xiêm" }],
  },
  {
    id: "WH009",
    name: "Kho Huế",
    location: "Thừa Thiên Huế",
    productNumber: 28,
    productList: [
      { id: "P028", name: "Cóc" },
      { id: "P029", name: "Khế" },
    ],
  },
  {
    id: "WH010",
    name: "Kho Nha Trang",
    location: "Khánh Hòa",
    productNumber: 50,
    productList: [
      { id: "P030", name: "Táo" },
      { id: "P031", name: "Cam" },
      { id: "P032", name: "Chuối" },
      { id: "P033", name: "Xoài" },
      { id: "P034", name: "Dưa hấu" },
    ],
  },
  {
    id: "WH011",
    name: "Kho Vũng Tàu",
    location: "Bà Rịa - Vũng Tàu",
    productNumber: 20,
    productList: [
      { id: "P035", name: "Mận" },
      { id: "P036", name: "Ổi" },
    ],
  },
  {
    id: "WH012",
    name: "Kho Lâm Đồng",
    location: "Lâm Đồng",
    productNumber: 70,
    productList: [
      { id: "P037", name: "Dâu tây" },
      { id: "P038", name: "Kiwi" },
      { id: "P039", name: "Chanh dây" },
    ],
  },
  {
    id: "WH013",
    name: "Kho Bắc Ninh",
    location: "Bắc Ninh",
    productNumber: 10,
    productList: [{ id: "P040", name: "Na" }],
  },
  {
    id: "WH014",
    name: "Kho Thanh Hóa",
    location: "Thanh Hóa",
    productNumber: 90,
    productList: [
      { id: "P041", name: "Xoài" },
      { id: "P042", name: "Dưa hấu" },
      { id: "P043", name: "Táo" },
    ],
  },
  {
    id: "WH015",
    name: "Kho Nghệ An",
    location: "Nghệ An",
    productNumber: 35,
    productList: [
      { id: "P044", name: "Cam" },
      { id: "P045", name: "Chuối" },
    ],
  },
];

const headers2 = [
  { title: "", key: "data-table-expand" },
  { title: "Tên kho", key: "name" },
  { title: "Mã kho", key: "id" },
  { title: "Địa chỉ", key: "location" },
  { title: "Số lượng mặt hàng", key: "productNumber" },
  { title: "", key: "action" },
];

const router = useRouter();
const handleRowClick1 = (row: any) => {
  console.log(typeof row);
  console.log(row);
  console.log(row.name, row.id);
};
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex align-center">
      <VIcon icon="bx-buildings" size="2rem" class="me-2" />
      <span>Thông tin Nhà cung cấp</span>
    </VCardTitle>

    <VCardText class="mt-6">
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Tên Nhà cung cấp :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ supplierName }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Mã nhà cung cấp :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ props.id }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng sản phẩm :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ producdtNumber }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng kho :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ warehouseNumber }}</div>
        </VCol>
      </VRow>
    </VCardText>

    <VCard class="mt-3">
      <v-tabs v-model="activeTab">
        <v-tab value="one">
          <div class="d-flex align-center">
            <VIcon icon="bx-package" size="1.8rem" class="me-2" />
            <span>Danh sách mặt hàng</span>
          </div>
        </v-tab>
        <v-tab value="two">
          <div class="d-flex align-center">
            <VIcon icon="bx-buildings" size="1.8rem" class="me-2" />
            <span>Danh sách kho hàng</span>
          </div></v-tab
        >
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="activeTab">
          <v-tabs-window-item value="one">
            <VCard>
              <VCardText>
                <VDataTable
                  class="mt-1"
                  :headers="headers1"
                  :items="productList"
                  :items-per-page="20"
                  @click:row="handleRowClick1"
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
          </v-tabs-window-item>

          <v-tabs-window-item value="two">
            <VCard>
              <VCardText>
                <VDataTable
                  class="mt-1"
                  :headers="headers2"
                  :items="warehouseList"
                  :items-per-page="20"
                  expand-on-click
                >
                  <template #expanded-row="slotProps">
                    <tr class="v-data-table__tr">
                      <td :colspan="headers2.length">
                        <div class = "ms-10">
                          <div>Danh sách sản phẩm</div>
                          <div class="d-flex space-between gap-2">
                            <div
                              v-for="product in slotProps.item.productList"
                              :key="product.id"
                              class="mb-1"
                            >
                              <a
                                href="#"
                                @click.prevent="
                                  router.push(`../product-info/${product.id}`)
                                "
                                class="text-decoration-none text-primary"
                              >
                                {{ product.name }}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>

                  <template #item.action="{ item }">
                    <IconBtn>
                      <VIcon icon="bx-info-circle" />
                    </IconBtn>
                  </template>
                </VDataTable>
              </VCardText>
            </VCard>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </VCard>
  </VCard>
</template>
