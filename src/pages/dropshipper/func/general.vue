<script setup lang="ts">
const name = ref("Cửa hàng 1 - Tên cửa hàng");
const id = ref("supa0182390");

const editDialog = ref(false);

const tempName = ref("");

const edit = () => {
  editDialog.value = true;
  tempName.value = name.value;
};

const close = () => {
  editDialog.value = false;
};

const save = () => {
  // Perform save operation here
  name.value = tempName.value;
  close();
};

const requiredValidator = (value: string | null | undefined) => {
  return !!value || "Trường này là bắt buộc";
};
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="d-flex align-center">
        <VIcon icon="bx-buildings" size="2rem" class="me-2" />
        <span>Thông tin chung</span>
      </VCardTitle>

      <VCardText class="mt-6">
        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Tên cửa hàng :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ name }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Mã cửa hàng :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ id }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Số lượng đơn hàng đã hoàn thành :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ 50 }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Số lượng hàng đã bán được :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ 1000 }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Số lượng sản phẩm đang đăng ký :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ 10000 }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Số lượng nhà cung cấp liên kết :</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ 10000 }}</div>
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
            <VBtn color="error" variant="outlined" @click="close">
              Cancel
            </VBtn>
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
