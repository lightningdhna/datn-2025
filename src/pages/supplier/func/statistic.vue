<script setup lang="ts">
import { ref } from "vue";

const search = ref("");

const statisticList = ref(
  Array.from({ length: 30 }, (_, index) => ({
    productName: ` PRD ${index + 1}`, // Tên nhà cung cấp
    id: `PRD${String(index + 1).padStart(3, "0")}`, // ID nhà cung cấp
    totalProducts: Math.floor(Math.random() * 1000) + 1, // Số mặt hàng (1-1000)
    totalWarehouses: Math.floor(Math.random() * 10) + 1, // Số kho (1-10)
    completedOrders: Math.floor(Math.random() * 500) + 1, // Số đơn hàng đã hoàn thành (1-500)
    pendingOrders: Math.floor(Math.random() * 200) + 1, // Số đơn hàng đang đợi (1-200)
  }))
);

const headers = [
  { title: "Tên mặt hàng", key: "product" },
  { title: "Số lượng hàng còn", key: "totalProducts" },
  { title: "Số lượng kho hàng", key: "totalWarehouses" },
  { title: "Số đơn hoàn thành", key: "completedOrders" },
  { title: "Số đơn đợi", key: "pendingOrders" },

];
</script>

<template>
  <VCardItem class="pb-3">
    <VCardTitle class="text-primary">
      <VIcon icon="bx-buildings"></VIcon>
      Thống kê số lượng đơn hàng
    </VCardTitle>
  </VCardItem>

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
    </VRow>
  </VCardText>

  <!-- 👉 Data Table  -->
  <VDataTable
    :headers="headers"
    :items="statisticList"
    :search="search"
    :items-per-page="10"
  >
    <template #item.product="{ item }">
      <RouterLink
        class="text-button text-primary"
        :to="`product-info/${item.productName}`"
      >
        {{ item.id }}
      </RouterLink>
    </template>
  </VDataTable>
</template>
