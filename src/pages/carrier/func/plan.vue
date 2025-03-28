<script lang="ts" setup>
import { VForm } from "vuetify/components/VForm";

const today = new Date();
const day = `0${today.getDate()}`.slice(-2); // Lấy ngày (2 chữ số)
const month = `0${today.getMonth() + 1}`.slice(-2); // Lấy tháng (0-based nên cần +1)
const year = today.getFullYear(); // Lấy năm

const formattedToday = `${day}/${month}/${year}`;

const formatTime = (hours: number, minutes: number) => {
  const date = new Date(today);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const route = ref([
  {
    truckName: "Xe tải A",
    truckId: "TRK001",
    destinations: [
      {
        locationName: "Kho 1 - Ncc 1",
        address: "Hà Nội",
        estimatedTime: formatTime(8, 0), // 08:00 hôm nay
        orderId: "ORD001",
        status: "complete",
      },
      {
        locationName: "Dropshipper 1",
        address: "Hải Phòng",
        estimatedTime: formatTime(10, 0), // 10:00 hôm nay
        orderId: "ORD002",
        status: "complete",
      },
      {
        locationName: "Kho 2 - Ncc 2",
        address: "Đà Nẵng",
        estimatedTime: formatTime(14, 0), // 14:00 hôm nay
        orderId: "ORD003",
        status: "ongoing",
      },
      {
        locationName: "Dropshipper 2",
        address: "Hồ Chí Minh",
        estimatedTime: formatTime(16, 0), // 16:00 hôm nay
        orderId: "ORD004",
        status: "ongoing",
      },
      {
        locationName: "Dropshipper 2",
        address: "Hồ Chí Minh",
        estimatedTime: formatTime(20, 0), // 16:00 hôm nay
        orderId: "ORD004",
        status: "ongoing",
      },
      {
        locationName: "Dropshipper 2",
        address: "Hồ Chí Minh",
        estimatedTime: formatTime(22, 0), // 16:00 hôm nay
        orderId: "ORD004",
        status: "ongoing",
      },
      {
        locationName: "Dropshipper 2",
        address: "Hồ Chí Minh",
        estimatedTime: formatTime(24, 0), // 16:00 hôm nay
        orderId: "ORD004",
        status: "ongoing",
      },
    ],
  },
  {
    truckName: "Xe tải B",
    truckId: "TRK002",
    destinations: [
      {
        locationName: "Kho 3 - Ncc 3",
        address: "Cần Thơ",
        estimatedTime: formatTime(7, 0), // 07:00 hôm nay
        orderId: "ORD005",
        status: "complete",
      },
      {
        locationName: "Dropshipper 3",
        address: "Bình Dương",
        estimatedTime: formatTime(9, 30), // 09:30 hôm nay
        orderId: "ORD006",
        status: "complete",
      },
      {
        locationName: "Kho 4 - Ncc 4",
        address: "Nghệ An",
        estimatedTime: formatTime(13, 0), // 13:00 hôm nay
        orderId: "ORD007",
        status: "ongoing",
      },
      {
        locationName: "Dropshipper 4",
        address: "Quảng Ninh",
        estimatedTime: formatTime(20, 30), // 15:30 hôm nay
        orderId: "ORD008",
        status: "ongoing",
      },
    ],
  },
  {
    truckName: "Xe tải C",
    truckId: "TRK003",
    destinations: [
      {
        locationName: "Kho 5 - Ncc 5",
        address: "Hà Nội",
        estimatedTime: formatTime(6, 30), // 06:30 hôm nay
        orderId: "ORD009",
        status: "complete",
      },
      {
        locationName: "Dropshipper 5",
        address: "Hải Dương",
        estimatedTime: formatTime(7, 45), // 08:45 hôm nay
        orderId: "ORD010",
        status: "complete",
      },
      {
        locationName: "Kho 6 - Ncc 6",
        address: "Thanh Hóa",
        estimatedTime: formatTime(17, 0), // 12:00 hôm nay
        orderId: "ORD011",
        status: "ongoing",
      },
      {
        locationName: "Dropshipper 6",
        address: "Huế",
        estimatedTime: formatTime(23, 0), // 17:00 hôm nay
        orderId: "ORD012",
        status: "ongoing",
      },
    ],
  },
]);

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const hours = parsedDate.getHours(); // Lấy giờ
  const minutes = `0${parsedDate.getMinutes()}`.slice(-2); // Lấy phút, thêm số 0 nếu cần
  const day = parsedDate.getDate(); // Lấy ngày
  const month = parsedDate.getMonth() + 1; // Lấy tháng (0-based nên cần +1)
  const year = parsedDate.getFullYear(); // Lấy năm

  return `${hours}h${minutes}`;
};
</script>

<template>
  <VCardItem class="pb-3">
    <VCardTitle class="text-primary">
      <VIcon icon="bxs-truck"></VIcon>
      Lịch trình cho các xe : Ngày {{ formattedToday }}
    </VCardTitle>
  </VCardItem>

  <VCard v-for="(truck, index) in route" :key="truck.truckId" class="mt-3">
    <VCardTitle class="mt-1 ms-1">
      <div>Lịch trình cho : {{ truck.truckName }}</div>

      <VCardText >
        <VContainer>
          <VRow>
            <VCol>
              <VRow>
                <VCol
                  v-for="(destination, index) in truck.destinations"
                  :key="index"
                  sm="2.5"
                  md="3"
                >
                  <div class="d-flex align-center">
                    <VIcon
                      :class="[
                        destination.estimatedTime < new Date()
                          ? 'bg-success'
                          : '',
                      ]"
                      v-if="destination.estimatedTime >= new Date()"
                      icon="bx-chevrons-right"
                    >
                    </VIcon>
                    <div
                      class="ma-4 elevation-10 text-wrap"
                      style="
                        width: auto;
                        height: auto;
                        border-radius: 8px 8px 8px 8px;
                      "
                    >
                      <RouterLink
                        :to="`/carrier/order-info/${destination.orderId}`"
                        :class="[
                          'text-button pa-4 d-flex justify-center align-center',
                          destination.estimatedTime < new Date()
                            ? 'bg-success'
                            : 'bg-warning',
                        ]"
                        style="border-radius: 8px 8px 0px 0px"
                      >
                        Đơn : {{ destination.orderId }}
                      </RouterLink>
                      <div class="pa-2 ma-2 ms-4">
                        <div>Đến : {{ destination.locationName }}</div>
                        <div>Địa chỉ : {{ destination.address }}</div>
                        <div>
                          Ước lượng :
                          {{ formatDate(destination.estimatedTime) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
    </VCardTitle>
  </VCard>
</template>
