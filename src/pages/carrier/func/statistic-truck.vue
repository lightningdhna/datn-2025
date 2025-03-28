<script setup lang="ts">
import { ref } from "vue";

const search = ref("");

const statisticList = ref(
  Array.from({ length: 50 }, (_, index) => ({
    truckName: `Xe tải ${index + 1}`, // Tên xe
    truckId: `29H-${Math.floor(10000 + Math.random() * 90000)}`, // Biển số xe (ID)
    completedOrders: Math.floor(Math.random() * 500) + 1, // Số đơn hàng đã thực hiện (1-500)
    weight: (Math.random() * 10 + 1).toFixed(2), // Khối lượng (1-10 tấn)
    volume: (Math.random() * 50 + 1).toFixed(2), // Thể tích (1-50 m³)
    distance: (Math.random() * 10000 + 100).toFixed(2), // Quãng đường đã đi (100-10,000 km)
    averageSpeed: (Math.random() * 80 + 20).toFixed(2), // Vận tốc trung bình (20-100 km/h)
    totalCost: (Math.random() * 10000 + 50000).toFixed(0) * 1000, // Tổng chi phí (50,000 - 1,000,000 VNĐ)
    status: Math.random() > 0.5 ? "active" : "inactive", // Trạng thái (active/inactive)
  }))
);

const headers = [
  { title: "Nhà cung cấp", key: "truckName" },
  { title: "Biển số xe", key: "truckId" },
  { title: "Số đơn hoàn thành", key: "completedOrders" },
  { title: "Quãng đường đã đi", key: "distance" },

  { title: "Khối lượng tối đa", key: "weight" },
  { title: "Thể tích tối đa", key: "volume" },
  { title: "Vận tóc trung bình", key: "averageSpeed" },
  { title: "Tổng chi phí", key: "totalCost" },
  { title: "Trạng thái", key: "status" },
];

const resolveStatusColor = (status: string) => {
  if (status === "active") return "success";
  if (status === "inactive") return "warning";
};

const resolveStatusText = (status: string) => {
  if (status === "active") return "Đang hoạt động";
  if (status === "inactive") return "Bảo dưỡng";
};

const formatCurrency = (value: string | number) => {
  return Number(value).toLocaleString("vi-VN");
};
</script>

<template>
  <VCardItem class="pb-3">
    <VCardTitle class="text-primary">
      <VIcon icon="bx-buildings"></VIcon>
      Danh sách Nhà cung cấp
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
    <!-- Status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusColor(item.status)"
        size="small"
        class="font-weight-medium"
      >
        {{ resolveStatusText(item.status) }}
      </VChip>
    </template>

    <template #item.totalCost="{ item }">
      {{ formatCurrency(item.totalCost) }}
    </template>
  </VDataTable>
</template>
