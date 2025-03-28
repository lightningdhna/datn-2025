<script setup lang="ts">
import MyDatePicker from "@/components/MyDatePicker.vue";
import type { CustomerOrder } from "@/models/order";

const router = useRouter();
const activeTab = ref("1");

const search = ref("");
const deleteDialog = ref(false);

const firstDate = ref<Date | null>(null);
const lastDate = ref<Date | null>(null);

const resolveStatusColor = (status: string) => {
  if (status === "confirmed") return "info";
  if (status === "completed") return "success";
  if (status === "declined") return "error";
  if (status === "pending") return "warning";
};
const resolveStatusText = (status: string) => {
  if (status === "confirmed") return "Đang giao";
  if (status === "completed") return "Đã hoàn thành";
  if (status === "declined") return "Đã hủy";
  if (status === "pending") return "Đợi duyệt";
};

const orderList = [
  {
    id: "ORD001", // Thêm id
    productName: "Táo",
    productId: "PRD001",
    supplierName: "Nhà cung cấp 1",
    supplierId: "SUP001",
    orderDate: new Date("2023-01-15"),
    address: "Hà Nội",
    status: "pending", // Đang chờ xử lý
  },
  {
    id: "ORD002", // Thêm id
    productName: "Cam",
    productId: "PRD002",
    supplierName: "Nhà cung cấp 2",
    supplierId: "SUP002",
    orderDate: new Date("2023-02-10"),
    address: "Hồ Chí Minh",
    status: "completed", // Hoàn thành
  },
  {
    id: "ORD003", // Thêm id
    productName: "Chuối",
    productId: "PRD003",
    supplierName: "Nhà cung cấp 3",
    supplierId: "SUP003",
    orderDate: new Date("2023-03-05"),
    address: "Đà Nẵng",
    status: "confirmed", // Đã xác nhận
  },
  {
    id: "ORD004", // Thêm id
    productName: "Xoài",
    productId: "PRD004",
    supplierName: "Nhà cung cấp 4",
    supplierId: "SUP004",
    orderDate: new Date("2023-04-20"),
    address: "Hải Phòng",
    status: "declined", // Bị từ chối
  },
  {
    id: "ORD005", // Thêm id
    productName: "Dưa hấu",
    productId: "PRD005",
    supplierName: "Nhà cung cấp 5",
    supplierId: "SUP005",
    orderDate: new Date("2023-05-15"),
    address: "Cần Thơ",
    status: "pending",
  },
  {
    id: "ORD006", // Thêm id
    productName: "Ổi",
    productId: "PRD006",
    supplierName: "Nhà cung cấp 6",
    supplierId: "SUP006",
    orderDate: new Date("2023-06-10"),
    address: "Nha Trang",
    status: "completed",
  },
  {
    id: "ORD007", // Thêm id
    productName: "Mận",
    productId: "PRD007",
    supplierName: "Nhà cung cấp 7",
    supplierId: "SUP007",
    orderDate: new Date("2023-07-05"),
    address: "Vũng Tàu",
    status: "confirmed",
  },
  {
    id: "ORD008", // Thêm id
    productName: "Dứa",
    productId: "PRD008",
    supplierName: "Nhà cung cấp 8",
    supplierId: "SUP008",
    orderDate: new Date("2023-08-01"),
    address: "Quảng Ninh",
    status: "pending",
  },
  {
    id: "ORD009", // Thêm id
    productName: "Nho",
    productId: "PRD009",
    supplierName: "Nhà cung cấp 9",
    supplierId: "SUP009",
    orderDate: new Date("2023-09-15"),
    address: "Huế",
    status: "completed",
  },
  {
    id: "ORD010", // Thêm id
    productName: "Bưởi",
    productId: "PRD010",
    supplierName: "Nhà cung cấp 10",
    supplierId: "SUP010",
    orderDate: new Date("2023-10-10"),
    address: "Bình Dương",
    status: "declined",
  },
  {
    id: "ORD011", // Thêm id
    productName: "Chanh",
    productId: "PRD011",
    supplierName: "Nhà cung cấp 1",
    supplierId: "SUP001",
    orderDate: new Date("2023-11-01"),
    address: "Thanh Hóa",
    status: "pending",
  },
  {
    id: "ORD012", // Thêm id
    productName: "Quýt",
    productId: "PRD012",
    supplierName: "Nhà cung cấp 2",
    supplierId: "SUP002",
    orderDate: new Date("2023-12-05"),
    address: "Nghệ An",
    status: "completed",
  },
  {
    id: "ORD013", // Thêm id
    productName: "Dâu tây",
    productId: "PRD013",
    supplierName: "Nhà cung cấp 3",
    supplierId: "SUP003",
    orderDate: new Date("2024-01-10"),
    address: "Thái Nguyên",
    status: "confirmed",
  },
  {
    id: "ORD014", // Thêm id
    productName: "Kiwi",
    productId: "PRD014",
    supplierName: "Nhà cung cấp 4",
    supplierId: "SUP004",
    orderDate: new Date("2024-02-15"),
    address: "Hậu Giang",
    status: "pending",
  },
  {
    id: "ORD015", // Thêm id
    productName: "Lựu",
    productId: "PRD015",
    supplierName: "Nhà cung cấp 5",
    supplierId: "SUP005",
    orderDate: new Date("2024-03-20"),
    address: "Đồng Nai",
    status: "completed",
  },
  {
    id: "ORD016", // Thêm id
    productName: "Đào",
    productId: "PRD016",
    supplierName: "Nhà cung cấp 6",
    supplierId: "SUP006",
    orderDate: new Date("2024-04-25"),
    address: "Long An",
    status: "confirmed",
  },
  {
    id: "ORD017", // Thêm id
    productName: "Mít",
    productId: "PRD017",
    supplierName: "Nhà cung cấp 7",
    supplierId: "SUP007",
    orderDate: new Date("2024-05-30"),
    address: "Tiền Giang",
    status: "declined",
  },
  {
    id: "ORD018", // Thêm id
    productName: "Na",
    productId: "PRD018",
    supplierName: "Nhà cung cấp 8",
    supplierId: "SUP008",
    orderDate: new Date("2024-06-05"),
    address: "Bến Tre",
    status: "pending",
  },
  {
    id: "ORD019", // Thêm id
    productName: "Sầu riêng",
    productId: "PRD019",
    supplierName: "Nhà cung cấp 9",
    supplierId: "SUP009",
    orderDate: new Date("2024-07-10"),
    address: "Phú Thọ",
    status: "completed",
  },
  {
    id: "ORD020", // Thêm id
    productName: "Me",
    productId: "PRD020",
    supplierName: "Nhà cung cấp 10",
    supplierId: "SUP010",
    orderDate: new Date("2024-08-15"),
    address: "Quảng Nam",
    status: "confirmed",
  },
  // ... tiếp tục tạo thêm 10 phần tử tương tự
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
  { title: "Sản phẩm", key: "productName" },
  { title: "Nhà cung cấp", key: "supplierName" },
  { title: "Ngày đặt", key: "orderDate" },
  { title: "Địa chỉ", key: "address" },
  { title: "Số lượng", key: "quantity" },

  { title: "Trạng thái", key: "status" },

  { title: "Chi tiết", key: "action", sortable: false },
];

const headers2 = [
  { title: "Sản phẩm", key: "productName" },
  { title: "Nhà cung cấp", key: "supplierName" },
  { title: "Ngày đặt", key: "orderDate" },
  { title: "Địa chỉ", key: "address" },
  { title: "Số lượng", key: "quantity" },

  { title: "Số lượng", key: "quantity" },

  { title: "Chi tiết", key: "action", sortable: false },
];

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const hours = parsedDate.getHours(); // Lấy giờ
  const day = parsedDate.getDate(); // Lấy ngày
  const month = parsedDate.getMonth() + 1; // Lấy tháng (0-based nên cần +1)
  const year = parsedDate.getFullYear(); // Lấy năm

  return `${hours}h ngày ${day}/${month}/${year}`;
};

const pendingOrders = computed(() => {
  return orderList.filter((order) => order.status === "pending");
});
const confirmedOrders = computed(() => {
  return orderList.filter((order) => order.status === "confirmed");
});
const completedOrder = computed(() => {
  return orderList.filter((order) => order.status === "completed");
});
</script>

<template>
  <VCard>
    <VCardTitle class="text-primary">
      <VIcon icon="bx-receipt"></VIcon>
      Danh sách đơn hàng
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
    <VTabs v-model="activeTab" class="mt-6">
      <VTab value="1">
        <div class="d-flex align-center">
          <span>Tất cả</span>
        </div>
      </VTab>
      <VTab value="2">
        <div class="d-flex align-center text-success">
          <span>Đã hoàn thành</span>
        </div>
      </VTab>
      <VTab value="3">
        <div class="d-flex align-center text-info">
          <span>Đang giao</span>
        </div>
      </VTab>
      <VTab value="4">
        <div class="d-flex align-center text-warning">
          <span>Đợi duyệt</span>
        </div>
      </VTab>
    </VTabs>
    <VCardText>
      <VTabsWindow v-model="activeTab">
        <VTabsWindowItem value="1">
          <VDataTable
            :items="orderList"
            :headers="headers"
            class="text-button"
            :items-per-page="20"
            :search="search"
          >
            <template #item.productName="{ item }">
              <RouterLink :to="`product-info/${item.productId}`">
                {{ item.productName }}
              </RouterLink>
            </template>

            <template #item.supplierName="{ item }">
              <RouterLink :to="`product-info/${item.supplierId}`">
                {{ item.supplierName }}
              </RouterLink>
            </template>

            <template #item.orderDate="{ item }">
              <div class="text-button">
                {{ formatDate(item.orderDate) }}
              </div>
            </template>
            <template #item.status="{ item }">
              <VChip
                :color="resolveStatusColor(item.status)"
                size="small"
                class="font-weight-medium"
              >
                {{ resolveStatusText(item.status) }}
              </VChip>
            </template>
            <template #item.action="{ item }">
              <IconBtn>
                <VIcon
                  icon="bx-info-circle"
                  @click="router.push(`order-info/${item.id}`)"
                />
              </IconBtn>
            </template>
          </VDataTable>
        </VTabsWindowItem>
        <VTabsWindowItem value="2">
          <VDataTable
            :items="completedOrder"
            :headers="headers2"
            class="text-button"
            :items-per-page="20"
            :search="search"
          >
            <template #item.productName="{ item }">
              <RouterLink :to="`product-info/${item.productId}`">
                {{ item.productName }}
              </RouterLink>
            </template>

            <template #item.supplierName="{ item }">
              <RouterLink :to="`product-info/${item.supplierId}`">
                {{ item.supplierName }}
              </RouterLink>
            </template>

            <template #item.orderDate="{ item }">
              <div class="text-button">
                {{ formatDate(item.orderDate) }}
              </div>
            </template>

            <template #item.action="{ item }">
              <IconBtn>
                <VIcon
                  icon="bx-info-circle"
                  @click="router.push(`order-info/${item.id}`)"
                />
              </IconBtn>
            </template>
          </VDataTable>
        </VTabsWindowItem>
        <VTabsWindowItem value="3">
          <VDataTable
            :items="confirmedOrders"
            :headers="headers2"
            class="text-button"
            :items-per-page="20"
            :search="search"
          >
            <template #item.productName="{ item }">
              <RouterLink :to="`product-info/${item.productId}`">
                {{ item.productName }}
              </RouterLink>
            </template>

            <template #item.supplierName="{ item }">
              <RouterLink :to="`product-info/${item.supplierId}`">
                {{ item.supplierName }}
              </RouterLink>
            </template>

            <template #item.orderDate="{ item }">
              <div class="text-button">
                {{ formatDate(item.orderDate) }}
              </div>
            </template>

            <template #item.action="{ item }">
              <IconBtn>
                <VIcon
                  icon="bx-info-circle"
                  @click="router.push(`order-info/${item.id}`)"
                />
              </IconBtn>
            </template>
          </VDataTable>
        </VTabsWindowItem>
        <VTabsWindowItem value="4">
          <VDataTable
            :items="pendingOrders"
            :headers="headers2"
            class="text-button"
            :items-per-page="20"
            :search="search"
          >
            <template #item.productName="{ item }">
              <RouterLink :to="`product-info/${item.productId}`">
                {{ item.productName }}
              </RouterLink>
            </template>

            <template #item.supplierName="{ item }">
              <RouterLink :to="`product-info/${item.supplierId}`">
                {{ item.supplierName }}
              </RouterLink>
            </template>

            <template #item.orderDate="{ item }">
              <div class="text-button">
                {{ formatDate(item.orderDate) }}
              </div>
            </template>

            <template #item.action="{ item }">
              <IconBtn>
                <VIcon
                  icon="bx-info-circle"
                  @click="router.push(`order-info/${item.id}`)"
                />
              </IconBtn>
            </template>
          </VDataTable>
        </VTabsWindowItem>
      </VTabsWindow>
    </VCardText>
  </VCard>
</template>
