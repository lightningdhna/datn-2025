<script setup lang="ts">
import { ref } from "vue";

const search = ref("");

const statisticList = ref(
  Array.from({ length: 30 }, (_, index) => ({
    productName: `PRD ${index + 1}`, // Tên mặt hàng
    id: `PRD${String(index + 1).padStart(3, "0")}`, // ID mặt hàng
    totalProducts: Math.floor(Math.random() * 1000) + 1, // Số mặt hàng (1-1000)
    totalWarehouses: Math.floor(Math.random() * 10) + 1, // Số kho (1-10)
    completedOrders: Math.floor(Math.random() * 500) + 1, // Số đơn hàng đã hoàn thành (1-500)
    pendingOrders: Math.floor(Math.random() * 200) + 1, // Số đơn hàng đang đợi (1-200)
    price: (Math.random() * 100).toFixed(2), // Giá (ngẫu nhiên từ 0 đến 100)
    supplierName: `Supplier ${index + 1}`, // Tên nhà cung cấp
    supplierId: `SUP${String(index + 1).padStart(3, "0")}`, // Mã nhà cung cấp
    soldQuantity: Math.floor(Math.random() * 300) + 1, // Số lượng đã bán (1-300)
  }))
);

const headers = [
  { title: "Tên mặt hàng", key: "product" },
  { title: "Giá", key: "price" },
  { title: "Nhà cung cấp", key: "supplierName", align: " d-none" },
  { title: "Nhà cung cấp", key: "supplier" },
  { title: "Số lượng hàng còn", key: "totalProducts" },
  { title: "Số lượng kho hàng", key: "totalWarehouses" },
  { title: "Số đơn đợi", key: "pendingOrders" },
  { title: "Số đơn hoàn thành", key: "completedOrders" },
  { title: "Số lượng đã bán", key: "soldQuantity" },
];
</script>

<template>
  <VCard>
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
      <template #item.supplier="{ item }">
        <RouterLink :to="`supplier-info/${item.supplierId}`">
          {{ item.supplierName }}
        </RouterLink>
      </template>
      <template #item.product="{ item }">
        <RouterLink
          class="text-button text-primary"
          :to="`product-info/${item.productName}`"
        >
          {{ item.id }}
        </RouterLink>
      </template>
    </VDataTable>
  </VCard>
</template>
