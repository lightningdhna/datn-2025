<script setup lang="ts">
import { requiredValidator } from "@/utils/validator";
import {
  createWarehouseForCurrentSupplier,
  deleteWarehouse,
  getWarehousesForCurrentSupplier,
  getWarehouseSummary,
  updateWarehouse,
} from "@/utils/warehouse-api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();

const isLoading = ref(true);
const warehouseList = ref<any[]>([]); // Khởi tạo warehouseList là một mảng rỗng
const error = ref<string | null>(null);

const fetchWarehouseList = async () => {
  isLoading.value = true;
  try {
    const result = await getWarehousesForCurrentSupplier();
    if (result.success) {
      warehouseList.value = result.data;

      // Fetch summary data for each warehouse to get product details
      await Promise.all(
        warehouseList.value.map(async (warehouse) => {
          const summaryResult = await getWarehouseSummary(warehouse.id);
          if (summaryResult.success) {
            warehouse.totalQuantity = summaryResult.data.totalProductQuantity;
            warehouse.products = summaryResult.data.products;
          }
        })
      );
    } else {
      console.error("Lỗi khi lấy danh sách kho:", result.error);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchWarehouseList();
});

const headers = [
  { title: "", key: "data-table-expand" },
  { title: "Tên kho", key: "name" },
  { title: "Mã kho", key: "id" },
  { title: "Địa chỉ", key: "location" },
  { title: "Thời gian tải (phút)", key: "timeToLoad", maxWidth: "120px" },
  { title: "Số lượng sản phẩm", key: "totalQuantity", maxWidth: "150px" },
  { title: "", key: "action", minWidth: "150px" },
];

const search = ref("");

const editDialog = ref(false);
const deleteDialog = ref(false);
const newDialog = ref(false);

const pickedItem = ref<any | undefined>();

const openEditDialog = (item: any) => {
  pickedItem.value = { ...item };
  editDialog.value = true;
};

const openDeleteDialog = (item: any) => {
  pickedItem.value = { ...item };
  deleteDialog.value = true;
};

const openNewDialog = () => {
  pickedItem.value = {
    name: "", // Tên kho
    // address: "", // Địa chỉ kho
    locationX: 0, // Tọa độ X
    locationY: 0, // Tọa độ Y
    timeToLoad: 0,
    capacity: 1000,
  };

  newDialog.value = true;
};

const validateWarehouseInfo = (warehouse: any) => {
  return (
    warehouse.name 
  );
};

const updateList = (updatedList: any) => {
  warehouseList.value = updatedList; // Cập nhật danh sách trong component cha
};
</script>

<template>
  <ManagementDialog
    :itemList="warehouseList"
    @updateList="updateList"
    :deleteApi="deleteWarehouse"
    :createApi="createWarehouseForCurrentSupplier"
    :updateApi="updateWarehouse"
    v-model:deleteDialog="deleteDialog"
    v-model:newDialog="newDialog"
    v-model:editDialog="editDialog"
    :item="pickedItem"
    :validateInfo="validateWarehouseInfo"
  >
    <template #new-form>
      <VRow>
        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItem.name"
            label="Tên kho"
            :rules="[requiredValidator]"
          />
        </VCol>
        <VCol cols="12" sm="6">
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField v-model.number="pickedItem.locationX" label="Tọa độ X" />
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField v-model.number="pickedItem.locationY" label="Tọa độ Y" />
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
            v-model.number="pickedItem.timeToLoad"
            label="Thời gian tải (phút)"
          />
        </VCol>
      </VRow>
    </template>
    <template #edit-form>
      <VRow>
        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItem.name"
            label="Tên kho"
            :rules="[requiredValidator]"
          />
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItem.id"
            label="Mã kho"
            :rules="[requiredValidator]"
            readonly
          />
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField v-model.number="pickedItem.locationX" label="Tọa độ X" />
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField v-model.number="pickedItem.locationY" label="Tọa độ y" />
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
            v-model.number="pickedItem.timeToLoad"
            label="Thời gian tải (phút)"
          />
        </VCol>
      </VRow>
    </template>
  </ManagementDialog>

  <VCard>
    <VCardTitle class="text-primary">
      <VIcon icon="bx-buildings"></VIcon>
      Danh sách kho
      <VRow style="direction: ltr;" class="mt-6">
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
        :headers="headers"
        :items="warehouseList"
        :items-per-page="10"
        :search="search"
        :loading="isLoading"
        expand-on-click
      >
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td :colspan="headers.length">
              <div class="ms-10">
                <div>Danh sách mặt hàng</div>
                <div class="d-flex flex-wrap gap-2 mt-2">
                  <div
                    v-for="product in slotProps.item.products"
                    :key="product.productId"
                    class="mb-1 me-3"
                  >
                    <a
                      href="#"
                      @click.prevent="
                        router.push(
                          `/supplier/product-info/${product.productId}`
                        )
                      "
                      class="text-decoration-none text-primary"
                    >
                      {{ product.productName }} ({{ product.quantity }})
                    </a>
                  </div>
                </div>
                <div
                  v-if="
                    !slotProps.item.products || !slotProps.item.products.length
                  "
                  class="text-subtitle-1 text-medium-emphasis"
                >
                  Không có sản phẩm trong kho này
                </div>
              </div>
            </td>
          </tr>
        </template>
        <template #item.action="{ item }">
          <IconBtn @click="router.push(`/supplier/warehouse-info/${item.id}`)">
            <VIcon icon="bx-info-circle" />
          </IconBtn>
          <IconBtn @click="openEditDialog(item)">
            <VIcon color="success" icon="bx-edit" />
          </IconBtn>
          <IconBtn @click="openDeleteDialog(item)">
            <VIcon color="error" icon="bx-trash" />
          </IconBtn>
        </template>
        <template #item.location="{ item }">
          ( {{ Math.round(item.locationX) }} ,
          {{ Math.round(item.locationY) }} )
        </template>
      </VDataTable>
    </VCardText>
  </VCard>

  <div class="dock-div">
    <VBtn class="dock-button" color="success" disabled>
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
