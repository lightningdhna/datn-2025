<script setup lang="ts">
const router = useRouter();

const productList = ref([
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
]);

const headers1 = [
  { title: "Tên sản phẩm", key: "name" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Giá", key: "cost" },
  { title: "Số lượng còn", key: "quantityLeft" },
  { title: "Số lượng đã bán", key: "quantitySold" },
  { title: "", key: "action" },
];

const requiredValidator = (value: string | null | undefined) => {
  return !!value || "Trường này là bắt buộc";
};

const search = ref("");

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
  newItem.value = {
    id: "",
    name: "",
    quantityLeft: 0,
    quantitySold: 0,
  };

  newDialog.value = true;
};

const saveNewItem = () => {
  newItem.value.id = Math.random().toString(36).substr(2, 9);
  productList.value.unshift(newItem.value);
  newDialog.value = false;
};

const closeEdit = () => {
  editDialog.value = false;
};

const saveEdit = () => {
  const index = productList.value.findIndex(
    (product) => product.id === editedItem.value.id
  );

  console.log(editedItem.value);
  // Nếu tìm thấy sản phẩm, cập nhật giá trị
  if (index !== -1) {
    productList.value[index] = { ...editedItem.value }; // Cập nhật sản phẩm tại vị trí tìm được
  }

  // Đóng dialog sau khi lưu
  editDialog.value = false;
};

const deleteItem = () => {
  // Tìm vị trí của sản phẩm trong danh sách dựa trên deleteId
  const index = productList.value.findIndex(
    (product) => product.id === deleteId.value
  );

  // Nếu tìm thấy sản phẩm, xóa sản phẩm khỏi danh sách
  if (index !== -1) {
    productList.value.splice(index, 1); // Xóa sản phẩm tại vị trí tìm được
  }

  // Đặt lại deleteId và đóng dialog xóa
  deleteId.value = "";
  deleteDialog.value = false;
};
</script>

<template>
  <VCard>
    <VCardTitle class="text-primary">
      <VIcon icon="bx-package"></VIcon>
      Danh sách sản phẩm
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
    <VCardText>
      <VDataTable
        class="mt-1"
        :headers="headers1"
        :items="productList"
        :items-per-page="20"
        :search="search"
      >
        <template #item.cost="{ item }"> 500,000 VND </template>
        <template #item.action="{ item }">
          <IconBtn @click="router.push(`/supplier/product-info/${item.id}`)">
            <VIcon icon="bx-info-circle" />
          </IconBtn>
          <IconBtn @click="openEditDialog(item)">
            <VIcon color="success" icon="bx-edit" />
          </IconBtn>
          <IconBtn @click="openDeleteDialog(item.id)">
            <VIcon color="error" icon="bx-trash" />
          </IconBtn>
        </template>
      </VDataTable>
    </VCardText>
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
                label="Giá"
                suffix=",000 VNĐ"
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
    <VCard title="Bạn có muốn xóa thông tin sản phẩm này không?">
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

  <div class="dock-button">
    <VBtn @click="openNewDialog">
      <VIcon icon="bxs-file-plus" class="ms-0 me-1" />
      | Thêm
    </VBtn>
  </div>
</template>

<style scoped>
.dock-button {
  position: fixed; /* Cố định vị trí */
  top: 100px; /* Cách phía trên 20px */
  right: 50px; /* Cách phía phải 20px */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}

.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}
</style>
