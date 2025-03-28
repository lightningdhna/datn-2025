<script setup lang="ts">
import MyDatePicker from "@/components/MyDatePicker.vue";
import type { CustomerOrder } from "@/models/order";

const router = useRouter();

const search = ref("");
const deleteDialog = ref(false);

const firstDate = ref<Date | null>(null);
const lastDate = ref<Date | null>(null);

const supplierList = [
  {
    id: "SUP001", // Thêm id
    name: "Nhà cung cấp 1",
    joinDate: new Date("2023-01-15"),
    warehouseCount: 3,
    productCount: 50,
    warehouses: [
      { id: "WH001", name: "Kho A" },
      { id: "WH002", name: "Kho B" },
      { id: "WH003", name: "Kho C" },
    ],
  },
  {
    id: "SUP002", // Thêm id
    name: "Nhà cung cấp 2",
    joinDate: new Date("2023-02-10"),
    warehouseCount: 2,
    productCount: 30,
    warehouses: [
      { id: "WH004", name: "Kho D" },
      { id: "WH005", name: "Kho E" },
    ],
  },
  {
    id: "SUP003", // Thêm id
    name: "Nhà cung cấp 3",
    joinDate: new Date("2023-03-05"),
    warehouseCount: 4,
    productCount: 70,
    warehouses: [
      { id: "WH006", name: "Kho F" },
      { id: "WH007", name: "Kho G" },
      { id: "WH008", name: "Kho H" },
      { id: "WH009", name: "Kho I" },
    ],
  },
  {
    id: "SUP004", // Thêm id
    name: "Nhà cung cấp 4",
    joinDate: new Date("2023-04-20"),
    warehouseCount: 5,
    productCount: 100,
    warehouses: [
      { id: "WH010", name: "Kho J" },
      { id: "WH011", name: "Kho K" },
      { id: "WH012", name: "Kho L" },
      { id: "WH013", name: "Kho M" },
      { id: "WH014", name: "Kho N" },
    ],
  },
  {
    id: "SUP005", // Thêm id
    name: "Nhà cung cấp 5",
    joinDate: new Date("2023-05-15"),
    warehouseCount: 3,
    productCount: 40,
    warehouses: [
      { id: "WH015", name: "Kho O" },
      { id: "WH016", name: "Kho P" },
      { id: "WH017", name: "Kho Q" },
    ],
  },
  {
    id: "SUP006", // Thêm id
    name: "Nhà cung cấp 6",
    joinDate: new Date("2023-06-10"),
    warehouseCount: 2,
    productCount: 25,
    warehouses: [
      { id: "WH018", name: "Kho R" },
      { id: "WH019", name: "Kho S" },
    ],
  },
  {
    id: "SUP007", // Thêm id
    name: "Nhà cung cấp 7",
    joinDate: new Date("2023-07-05"),
    warehouseCount: 4,
    productCount: 60,
    warehouses: [
      { id: "WH020", name: "Kho T" },
      { id: "WH021", name: "Kho U" },
      { id: "WH022", name: "Kho V" },
      { id: "WH023", name: "Kho W" },
    ],
  },
  {
    id: "SUP008", // Thêm id
    name: "Nhà cung cấp 8",
    joinDate: new Date("2023-08-01"),
    warehouseCount: 3,
    productCount: 35,
    warehouses: [
      { id: "WH024", name: "Kho X" },
      { id: "WH025", name: "Kho Y" },
      { id: "WH026", name: "Kho Z" },
    ],
  },
  {
    id: "SUP009", // Thêm id
    name: "Nhà cung cấp 9",
    joinDate: new Date("2023-09-15"),
    warehouseCount: 2,
    productCount: 20,
    warehouses: [
      { id: "WH027", name: "Kho AA" },
      { id: "WH028", name: "Kho AB" },
    ],
  },
  {
    id: "SUP010", // Thêm id
    name: "Nhà cung cấp 10",
    joinDate: new Date("2023-10-10"),
    warehouseCount: 5,
    productCount: 80,
    warehouses: [
      { id: "WH029", name: "Kho AC" },
      { id: "WH030", name: "Kho AD" },
      { id: "WH031", name: "Kho AE" },
      { id: "WH032", name: "Kho AF" },
      { id: "WH033", name: "Kho AG" },
    ],
  },
  // ... tiếp tục tạo thêm 20 nhà cung cấp tương tự
];
// // Danh sách đã lọc dựa trên khoảng thời gian
// const filteredOrderList = computed(() => {
//   // Nếu cả firstDate và lastDate đều không có giá trị, trả về toàn bộ danh sách
//   if (!firstDate.value && !lastDate.value) return orderList.value;

//   return orderList.value.filter((order: CustomerOrder) => {
//     const createdDate = new Date(order.createdDate).getTime();

//     // Nếu không có firstDate hoặc lastDate, bỏ qua so sánh tương ứng
//     const startDate = firstDate.value
//       ? new Date(firstDate.value).getTime()
//       : Number.NEGATIVE_INFINITY;
//     const endDate = lastDate.value
//       ? new Date(lastDate.value).getTime()
//       : Number.POSITIVE_INFINITY;

//     return createdDate >= startDate && createdDate <= endDate;
//   });
// });

// headers
const headers = [
  { title: "", key: "data-table-expand", sortable: false },

  { title: "Sản phẩm", key: "name" },
  { title: "Số lượng mặt hàng", key: "productCount" },
  { title: "Số lượng kho hàng", key: "warehouseCount" },
  { title: "ngày gia nhập", key: "joinDate" },

  { title: "Chi tiết", key: "action", sortable: false },
];

const statusMap = new Map<string, string>([
  ["pending", "Đang chờ xử lý"],
  ["confirmed", "Đã xác nhận"],
  ["completed", "Hoàn thành"],
  ["declined", "Bị từ chối"],
]);

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const month = parsedDate.toLocaleString("vi-VN", { month: "long" });
  const year = parsedDate.getFullYear();

  return ` ${month}/${year}`;
};
</script>

<template>
  <VCardItem class="pb-3">
    <VCardTitle class="text-primary">
      <VIcon icon="bx-buildings"></VIcon>
      Danh sách Nhà cung cấp
    </VCardTitle>
  </VCardItem>
  <div>
    <VCardText class="pt-0">
      <VRow style="direction: ltr">
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
        <!-- <VCol
          cols="auto"
          md="2"
          offset-md="2"

          style="flex-grow: 1;"
        >
          <MyDatePicker
            v-model="firstDate"
            clearable
            hide-details="auto"
            color="primary"
            label="from"
          />
        </vcol>
        <VCol
          cols="7"
          md="2"
          style="flex-grow: 1;"
        >
          <MyDatePicker
            v-model="lastDate"
            clearable
            hide-details="auto"
            color="primary"
            label="to"
          />
        </vcol> -->
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable
      :headers="headers"
      :items="supplierList || []"
      :search="search"
      :items-per-page="10"
      class="text-no-wrap"
    >
      <template #expanded-row="slotProps">
        <tr class="v-data-table__tr">
          <td :colspan="headers.length">
            <div class="ms-10">
              <div>Danh sách kho</div>
              <div class="d-flex space-between gap-2">
                <div
                  v-for="warehouse in slotProps.item.warehouses"
                  :key="warehouse.id"
                  class="mb-1"
                >
                  <a
                    href="#"
                    @click.prevent="
                      router.push(`warehouse-info/${warehouse.id}`)
                    "
                    class="text-decoration-none text-primary"
                  >
                    {{ warehouse.name }}
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </template>

      <template #item.joinDate="{ item }">
        <p class="mi-1">
          {{ formatDate(item.joinDate) }}
        </p>
      </template>

      <!-- Delete -->
      <template #item.action="{ item }">
        <IconBtn @click="router.push(`supplier-info/${item.id}`)">
          <VIcon icon="bx-info-circle" />
        </IconBtn>
      </template>
    </VDataTable>
  </div>
</template>
