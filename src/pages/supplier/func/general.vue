<script setup lang="ts">

const supplierName = ref("Ncc1 - Tên nhà cung cấp");
const id = ref("supa0182390");
const warehouseNumber = ref<number>(4);
const productNumber = ref<number>(20);
const dropshipperNumber = ref<number>(70);
const orderNumber = ref<number>(7000);

const editDialog = ref(false);

const tempName = ref('')

const edit = () => {
  editDialog.value = true;
  tempName.value = supplierName.value
};

const close = () => {
  editDialog.value = false;
};

const save = () => {
  // Perform save operation here
  supplierName.value = tempName.value;
  close();
};

const requiredValidator = (value: string | null | undefined) => {
  return !!value || "Trường này là bắt buộc";
};
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex align-center">
      <VIcon icon="bx-buildings" size="2rem" class="me-2" />
      <span>Thông tin chung</span>
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
          <div class="text-button">{{ id }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng sản phẩm :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ productNumber }}</div>
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
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng dropshipper :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ dropshipperNumber }}</div>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" sm="3">
          <div class="text-button">Số lượng đơn hàng hoàn thành :</div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="text-button">{{ orderNumber }}</div>
        </VCol>
      </VRow>
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
                v-model="tempName"
                label="Tên"
                :rules="[requiredValidator]"
              />
            </VCol>

            <!-- fullName -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="id"
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
          <VBtn color="error" variant="outlined" @click="close"> Cancel </VBtn>
          <VBtn color="success" variant="elevated" @click="save"> Save </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <div class="dock-button">
    <VBtn @click="edit">
      <VIcon icon="bx-edit" class="ms-0 me-1" />
      | Chỉnh sửa
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
