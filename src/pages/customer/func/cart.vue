<script setup lang="ts">
import type { PickedProduct } from "@/models/product";

const deleteDialog = ref(false);

const orderList = ref<PickedProduct[]>([
  {
    id: "1",
    name: "Product A",
    quantity: 3,
    price: 120.0,
    totalPrice: 120.0 * 3,
  },
  {
    id: "2",
    name: "Product B",
    quantity: 2,
    price: 75.0,
    totalPrice: 75.0 * 2,
  },
  {
    id: "6",
    name: "Product C",
    quantity: 1,
    price: 50.0,
    totalPrice: 50.0 * 1,
  },
  {
    id: "3",
    name: "Product D",
    quantity: 4,
    price: 200.0,
    totalPrice: 200.0 * 4,
  },
  {
    id: "4",
    name: "Product E",
    quantity: 5,
    price: 30.0,
    totalPrice: 30.0 * 5,
  },
  {
    id: "5",
    name: "Product F",
    quantity: 2,
    price: 150.0,
    totalPrice: 150.0 * 2,
  },

  // Thêm sản phẩm mới với giá trị ngẫu nhiên
  {
    id: "7",
    name: "Product G",
    quantity: 3,
    price: 90.0,
    totalPrice: 90.0 * 3,
  },
  {
    id: "8",
    name: "Product H",
    quantity: 1,
    price: 300.0,
    totalPrice: 300.0 * 1,
  },
  {
    id: "9",
    name: "Product I",
    quantity: 6,
    price: 45.0,
    totalPrice: 45.0 * 6,
  },
]);

// headers
const headers = [
  { title: "Sản phẩm", key: "name" },
  { title: "Số lượng", key: "quantity" },
  { title: "Giá", key: "totalPrice" },

  { title: "", key: "action", sortable: false },
];

const selectedItem = ref<string>("");

// 👉 methods
const clickDelete = async (itemId: string) => {
  selectedItem.value = itemId.toString();
  deleteDialog.value = true;
};

const deleteItem = async () => {
  if (!orderList.value) return;

  const index = orderList.value.findIndex(
    (item: CustomerOrder) => item.id === selectedItem.value
  );

  console.log(selectedItem.value);
  await orderList.value.splice(index, 1);
  deleteDialog.value = false;
};

// Computed property để tính tổng giá trị
const totalAmount = computed(() => {
  return orderList.value.reduce((sum, item) => sum + item.totalPrice, 0);
});
</script>

<template>
  <div>
    <VCardItem class="pb-3">
      <VCardTitle class="text-primary">
        Giỏ hàng
      </VCardTitle>
    </VCardItem>
    <div>
      <!-- 👉 Data Table  -->
      <VDataTable
        :headers="headers"
        :items="orderList || []"
        :items-per-page="20"
        class="text-no-wrap"
      >
        <template #item.quantity="{ item }">
          <div style="display: flex; align-items: center;">
            <IconBtn @click="() => { if (item.quantity > 1) { item.quantity -= 1; item.totalPrice = item.price * item.quantity } }">
              <VIcon icon="bx-minus" />
            </IconBtn>
            <p
              class="mi-1"
              style="margin-block: 0;margin-inline: 8px;"
            >
              {{ item.quantity }}
            </p>
            <IconBtn @click="item.quantity += 1; item.totalPrice = item.price * item.quantity">
              <VIcon icon="bx-plus" />
            </IconBtn>
          </div>
        </template>
        <!-- Delete -->
        <template #item.action="{ item }">
          <IconBtn @click="clickDelete(item.id)">
            <VIcon icon="bx-trash" />
          </IconBtn>
        </template>
      </VDataTable>
    </div>

    <VRow>
      <VCol
        cols="12"
        sm="5"
        offset="6"
      >
        <VCard class="mt-8 ms-auto text-center text-sm-start">
          <VRow justify="end">
            <VCol
              cols="12"
              sm="5"
            >
              <VCardItem class="pb-3">
                <VCardTitle>
                  Tổng giá
                </VCardTitle>
                <VCardText>
                  {{ totalAmount }}
                </VCardText>
              </VCardItem>
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <VCardItem class="pb-3">
                <VBtn variant="tonal">
                  xác nhận
                  <VIcon
                    end
                    icon="ri-check-double-line"
                  />
                </VBtn>
              </VCardItem>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol md="6" />
    </VRow>

    <VDialog
      v-model="deleteDialog"
      max-width="500px"
    >
      <VCard title="Xác nhận xóa">
        <VCardText>
          <div class="d-flex justify-center gap-4">
            <VBtn
              variant="outlined"
              color="secondary"
              @click="() => (deleteDialog = false)"
            >
              Bỏ qua
            </VBtn>
            <VBtn
              color="error"
              variant="outlined"
              @click="deleteItem"
            >
              Xác nhận
            </VBtn>
          </div>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
