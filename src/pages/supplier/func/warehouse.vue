<script setup lang="ts">
import MyDatePicker from "@/components/MyDatePicker.vue";
import type { CustomerOrder } from "@/models/order";
import { requiredValidator } from "@/utils/validator";

const router = useRouter();

const search = ref("");

const firstDate = ref<Date | null>(null);
const lastDate = ref<Date | null>(null);

const warehouseList = ref([
  {
    id: "WH001",
    name: "Kho A",
    address: "Hà Nội",
    supplierName: "Nhà cung cấp 1",
    supplierId: "SUP001",
    totalQuantity: 500,
    products: [
      { id: "PRD001", name: "Táo" },
      { id: "PRD002", name: "Cam" },
      { id: "PRD003", name: "Chuối" },
    ],
  },
  {
    id: "WH002",
    name: "Kho B",
    address: "Hồ Chí Minh",
    supplierName: "Nhà cung cấp 2",
    supplierId: "SUP002",
    totalQuantity: 300,
    products: [
      { id: "PRD004", name: "Xoài" },
      { id: "PRD005", name: "Dưa hấu" },
      { id: "PRD006", name: "Ổi" },
    ],
  },
  {
    id: "WH003",
    name: "Kho C",
    address: "Đà Nẵng",
    supplierName: "Nhà cung cấp 3",
    supplierId: "SUP003",
    totalQuantity: 400,
    products: [
      { id: "PRD007", name: "Mận" },
      { id: "PRD008", name: "Dứa" },
      { id: "PRD009", name: "Nho" },
    ],
  },
  {
    id: "WH004",
    name: "Kho D",
    address: "Hải Phòng",
    supplierName: "Nhà cung cấp 4",
    supplierId: "SUP004",
    totalQuantity: 600,
    products: [
      { id: "PRD010", name: "Bưởi" },
      { id: "PRD011", name: "Chanh" },
      { id: "PRD012", name: "Quýt" },
    ],
  },
  {
    id: "WH005",
    name: "Kho E",
    address: "Cần Thơ",
    supplierName: "Nhà cung cấp 5",
    supplierId: "SUP005",
    totalQuantity: 200,
    products: [
      { id: "PRD013", name: "Dâu tây" },
      { id: "PRD014", name: "Kiwi" },
      { id: "PRD015", name: "Lựu" },
    ],
  },
  {
    id: "WH006",
    name: "Kho F",
    address: "Nha Trang",
    supplierName: "Nhà cung cấp 6",
    supplierId: "SUP006",
    totalQuantity: 350,
    products: [
      { id: "PRD016", name: "Đào" },
      { id: "PRD017", name: "Mít" },
      { id: "PRD018", name: "Na" },
    ],
  },
  {
    id: "WH007",
    name: "Kho G",
    address: "Vũng Tàu",
    supplierName: "Nhà cung cấp 7",
    supplierId: "SUP007",
    totalQuantity: 450,
    products: [
      { id: "PRD019", name: "Sầu riêng" },
      { id: "PRD020", name: "Me" },
      { id: "PRD021", name: "Chôm chôm" },
    ],
  },
  {
    id: "WH008",
    name: "Kho H",
    address: "Quảng Ninh",
    supplierName: "Nhà cung cấp 8",
    supplierId: "SUP008",
    totalQuantity: 500,
    products: [
      { id: "PRD022", name: "Vải" },
      { id: "PRD023", name: "Măng cụt" },
      { id: "PRD024", name: "Táo xanh" },
    ],
  },
  {
    id: "WH009",
    name: "Kho I",
    address: "Huế",
    supplierName: "Nhà cung cấp 9",
    supplierId: "SUP009",
    totalQuantity: 300,
    products: [
      { id: "PRD025", name: "Ổi đỏ" },
      { id: "PRD026", name: "Cam sành" },
      { id: "PRD027", name: "Dưa lê" },
    ],
  },
  {
    id: "WH010",
    name: "Kho J",
    address: "Bình Dương",
    supplierName: "Nhà cung cấp 10",
    supplierId: "SUP010",
    totalQuantity: 700,
    products: [
      { id: "PRD028", name: "Mít thái" },
      { id: "PRD029", name: "Dừa" },
      { id: "PRD030", name: "Chanh dây" },
    ],
  },
  // ... tiếp tục tạo thêm 20 kho tương tự
]);

const editDialog = ref(false);
const deleteDialog = ref(false);
const newDialog = ref(false);
const editedItem = ref<any | undefined>();
const deleteId = ref("");
const newItem = ref<any | undefined>();

const openEditDialog = (item: any) => {
  editedItem.value = { ...item };
  editDialog.value = true;
  console.log(editedItem.value);
};

const openDeleteDialog = (id: string) => {
  deleteId.value = id;
  deleteDialog.value = true;
};

const openNewDialog = () => {
  console.log("....");
  newItem.value = {
    id: "",
    name: "",
    address: "",
    supplierName: "",
    supplierId: "",
    totalQuantity: 0,
    products: [],
  };
  newDialog.value = true;
};

const saveNewItem = () => {
  newItem.value.id = Math.random().toString(36).substr(2, 9);
  warehouseList.value.unshift(newItem.value);
  newDialog.value = false;
};

const closeEdit = () => {
  editDialog.value = false;
};

const saveEdit = () => {
  const index = warehouseList.value.findIndex(
    (warehouse) => warehouse.id === editedItem.value.id
  );

  console.log(editedItem.value);
  // Nếu tìm thấy sản phẩm, cập nhật giá trị
  if (index !== -1) {
    warehouseList.value[index] = { ...editedItem.value }; // Cập nhật sản phẩm tại vị trí tìm được
  }

  // Đóng dialog sau khi lưu
  editDialog.value = false;
};

const deleteItem = () => {
  // Tìm vị trí của sản phẩm trong danh sách dựa trên deleteId
  const index = warehouseList.value.findIndex(
    (warehouse) => warehouse.id === deleteId.value
  );

  // Nếu tìm thấy sản phẩm, xóa sản phẩm khỏi danh sách
  if (index !== -1) {
    warehouseList.value.splice(index, 1); // Xóa sản phẩm tại vị trí tìm được
  }

  // Đặt lại deleteId và đóng dialog xóa
  deleteId.value = "";
  deleteDialog.value = false;
};

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

  { title: "Tên kho hàng", key: "name" },
  { title: "Mã kho hàng", key: "id" },
  { title: "Địa chỉ", key: "address" },
  { title: "Tổng lượng hàng", key: "totalQuantity" },

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
  <div>
    <VCard>
      <VCardItem class="pb-3">
        <VCardTitle class="text-primary">
          <VIcon icon="bx-buildings"></VIcon>
          Danh sách Nhà kho
        </VCardTitle>
      </VCardItem>
      <div>
        <VCardText class="pt-0">
          <VRow style="direction: ltr;">
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
          :items="warehouseList || []"
          :search="search"
          :items-per-page="10"
          class="text-no-wrap"
        >
          <template #expanded-row="slotProps">
            <tr class="v-data-table__tr">
              <td :colspan="headers.length">
                <div class="ms-10">
                  <div>Danh sách mặt hàng</div>
                  <div class="d-flex space-between gap-2">
                    <div
                      v-for="product in slotProps.item.products"
                      :key="product.id"
                      class="mb-1"
                    >
                      <a
                        href="#"
                        @click.prevent="
                          router.push(`product-info/${product.id}`)
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

          <template #item.supplier="{ item }">
            <RouterLink :to="`supplier-info/${item.supplierId}`">
              {{ item.supplierName }}
            </RouterLink>
          </template>

          <!-- Delete -->
          <template #item.action="{ item }">
            <IconBtn @click="router.push(`warehouse-info/${item.id}`)">
              <VIcon icon="bx-info-circle" />
            </IconBtn>
            <IconBtn @click="openEditDialog(item)">
              <VIcon icon="bx-edit" color="success" />
            </IconBtn>
            <IconBtn @click="openDeleteDialog(item.id)">
              <VIcon color="error" icon="bx-trash" />
            </IconBtn>
          </template>
        </VDataTable>
      </div>
    </VCard>

    <VDialog v-model="editDialog" max-width="600px">
      <VCard title="Edit Item">
        <VCardText>
          <VFrom @submit.prevent>
            <VRow>
              <!-- fullName -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.name"
                  label="Tên"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.address"
                  label="Địa chỉ"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- fullName -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.id"
                  label="Mã"
                  :rules="[requiredValidator]"
                  readonly
                />
              </VCol>
            </VRow>
          </VFrom>
        </VCardText>

        <VCardText>
          <div class="self-align-end d-flex gap-4 justify-end">
            <VBtn color="gray" variant="outlined" @click="closeEdit">
              <VIcon icon="bx-x"></VIcon> | Hủy bỏ
            </VBtn>
            <VBtn color="success" variant="elevated" @click="saveEdit"
              ><VIcon icon="bx-save"></VIcon>| Lưu lại
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog v-model="newDialog" max-width="600px">
      <VCard title="Edit Item">
        <VCardText>
          <VFrom @submit.prevent>
            <VRow>
              <!-- fullName -->
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="newItem.name"
                  label="Tên"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="newItem.address"
                  label="Địa chỉ"
                  :rules="[requiredValidator]"
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
              ><VIcon icon="bx-save"></VIcon>| Thêm mới
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog v-model="deleteDialog" max-width="500px">
      <VCard title="Bạn có muốn xóa thông tin kho này không?">
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

  <div class="dock-div">
    <VBtn class="dock-button" color="success" @click="">
      <VIcon icon="bx-upload" class="me-2" /> | Upload file csv
    </VBtn>
    <VBtn @click="openNewDialog" class="dock-button ms-2">
      <VIcon icon="bxs-file-plus" class="me-2" /> | Thêm kho
    </VBtn>
  </div>
</template>

<style scoped>
.dock-div {
  position: fixed; /* Cố định vị trí */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
  inset-block-start: 100px; /* Cách phía trên 20px */
  inset-inline-end: 50px; /* Cách phía phải 20px */
}

.dock-button {
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}

.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}
</style>
