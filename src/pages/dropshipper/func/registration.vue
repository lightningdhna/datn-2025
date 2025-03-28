<script setup lang="ts">
import MyDatePicker from "@/components/MyDatePicker.vue";
import { requiredValidator } from "@/utils/validator";

const router = useRouter();

const search = ref("");

const registrationList = ref(
  Array.from({ length: 30 }, (_, index) => {
    const fruits = [
      "Táo",
      "Cam",
      "Chuối",
      "Xoài",
      "Dưa hấu",
      "Ổi",
      "Mận",
      "Dứa",
      "Nho",
      "Bưởi",
      "Chanh",
      "Quýt",
      "Dâu tây",
      "Kiwi",
      "Lựu",
      "Đào",
      "Mít",
      "Na",
      "Sầu riêng",
      "Me",
      "Chôm chôm",
      "Vải",
      "Măng cụt",
      "Táo xanh",
      "Ổi đỏ",
      "Cam sành",
      "Dưa lê",
      "Mít thái",
      "Dừa",
      "Chanh dây",
    ];

    const randomDate = () => {
      const start = new Date(2020, 0, 1).getTime(); // Ngày bắt đầu (1/1/2020)
      const end = new Date().getTime(); // Ngày hiện tại
      return new Date(start + Math.random() * (end - start)); // Ngày ngẫu nhiên trong quá khứ
    };

    const randomStatus = () => (Math.random() > 0.5 ? "accepted" : "pending"); // Trạng thái ngẫu nhiên

    return {
      id: `REG${String(index + 1).padStart(3, "0")}`, // ID đăng ký
      productName: fruits[index % fruits.length], // Tên sản phẩm
      productId: `PRD${String(index + 1).padStart(3, "0")}`, // Mã sản phẩm
      price: (Math.random() * 100).toFixed(2), // Giá sản phẩm (ngẫu nhiên từ 0 đến 100)
      supplierName: `Nhà cung cấp ${index + 1}`, // Tên nhà cung cấp
      supplierId: `SUP${String(index + 1).padStart(3, "0")}`, // Mã nhà cung cấp
      commissionFee: Math.floor(Math.random() * 20) + 1, // Phí hoa hồng (1-20%)
      registrationDate: randomDate(), // Thời điểm đăng ký (ngẫu nhiên trong quá khứ)
      status: randomStatus(), // Trạng thái ngẫu nhiên (accepted hoặc pending)
    };
  })
);

const headers = [
  { title: "Tên kho hàng", key: "productName", align: " d-none" },
  { title: "Sản phẩm", key: "product" },

  { title: "", key: "supplierName", align: " d-none" },
  { title: "Nhà cung cấp", key: "supplier" },

  { title: "Giá", key: "price" },
  { title: "phí hoa hồng", key: "commissionFee" },

  { title: "Ngày đăng kí", key: "registrationDate" },
  { title: "Trạng thái", key: "status" },
];

const newDialog = ref(false);
const newItem = ref<any | undefined>();

const openNewDialog = () => {
  console.log("....");
  newItem.value = {
    id: "",
    productName: "",
    productId: "",
    price: 0,
    supplierName: "",
    supplierId: "",
    commissionFee: 0,
    registrationDate: new Date(),
    status: "pending",
  };
  newDialog.value = true;
};

const saveNewItem = () => {
  newItem.value.id = Math.random().toString(36).substr(2, 9);
  registrationList.value.unshift(newItem.value);
  newDialog.value = false;
};

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const day = parsedDate.getDate(); // Lấy ngày
  const month = parsedDate.getMonth() + 1; // Lấy tháng (cộng 1 vì getMonth() trả về giá trị từ 0-11)
  const year = parsedDate.getFullYear(); // Lấy năm

  return `Ngày ${day}/${month}/${year}`; // Định dạng ngày
};

const resolveStatusColor = (status: string) => {
  if (status === "pending") return "warning";
  if (status === "accepted") return "success";
};

const resolveStatusText = (status: string) => {
  if (status === "pending") return "Đang đợi duyệt";
  if (status === "accepted") return "Đã được chấp nhận";
};
</script>

<template>
  <div>
    <VCard>
      <VCardItem class="pb-3">
        <VCardTitle class="text-primary">
          <VIcon icon="bx-registered"></VIcon>
          Danh sách đăng ký
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
          :items="registrationList || []"
          :search="search"
          :items-per-page="10"
        >
          <template #item.product="{ item }">
            <RouterLink :to="`product-info/${item.productId}`">
              {{ item.productName }}
            </RouterLink>
          </template>
          <template #item.supplier="{ item }">
            <RouterLink :to="`supplier-info/${item.supplierId}`">
              {{ item.supplierName }}
            </RouterLink>
          </template>
          <template #item.registrationDate="{ item }">
            {{ formatDate(item.registrationDate) }}
          </template>
        </VDataTable>
      </div>
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
                  v-model="newItem.productName"
                  label="Tên sản phẩm"
                  readonly
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="newItem.productId"
                  label="Mã sản phẩm"
                  readonly
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="newItem.supplierName"
                  label="Tên nhà cung cấp"
                  readonly
                />
              </VCol>

              <VCol cols="12" sm="6">
                <MyDatePicker
                  v-model="newItem.registrationDate"
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
              ><VIcon icon="bx-save"></VIcon>| Thêm mới
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>

    <div class="dock-div">
      <VBtn class="dock-button" color="success" @click="">
        <VIcon icon="bx-upload" class="me-2" /> | Upload file csv
      </VBtn>
      <VBtn @click="openNewDialog" class="dock-button ms-2">
        <VIcon icon="bxs-user-plus" class="me-2" /> | Đăng ký
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
