<script setup lang="ts">
import MyDatePicker from '@/components/MyDatePicker.vue'
import type { CustomerOrder } from '@/models/order'

const search = ref('')
const deleteDialog = ref(false)

const firstDate = ref<Date | null>(null)
const lastDate = ref<Date | null>(null)

const orderList = ref<CustomerOrder[]>([
  {
    id: '1',
    name: 'Product A',
    quantity: 2,
    status: 'confirmed',
    price: '100.00',
    createdDate: new Date('2025-03-20T14:30:00'),
  },
  {
    id: '2',
    name: 'Product B',
    quantity: 1,
    status: 'pending',
    price: '50.00',
    createdDate: new Date('2025-03-21T09:15:00'),
  },
  {
    id: '6',
    name: 'Product B',
    quantity: 1,
    status: 'pending',
    price: '70.00',
    createdDate: new Date('2025-02-21T09:15:00'),
  },
  {
    id: '3',
    name: 'Product C',
    quantity: 5,
    status: 'completed',
    price: '250.00',
    createdDate: new Date('2025-03-22T16:45:00'),
  },

  {
    id: '4',
    name: 'Product D',
    quantity: 3,
    status: 'declined',
    price: '75.00',
    createdDate: new Date('2025-03-23T11:00:00'),
  },
  {
    id: '5',
    name: 'Product A',
    quantity: 2,
    status: 'confirmed',
    price: '100.00',
    createdDate: new Date('2025-03-20T14:30:00'),
  },
])

// Danh sách đã lọc dựa trên khoảng thời gian
const filteredOrderList = computed(() => {
  // Nếu cả firstDate và lastDate đều không có giá trị, trả về toàn bộ danh sách
  if (!firstDate.value && !lastDate.value)
    return orderList.value

  return orderList.value.filter((order: CustomerOrder) => {
    const createdDate = new Date(order.createdDate).getTime()

    // Nếu không có firstDate hoặc lastDate, bỏ qua so sánh tương ứng
    const startDate = firstDate.value ? new Date(firstDate.value).getTime() : Number.NEGATIVE_INFINITY
    const endDate = lastDate.value ? new Date(lastDate.value).getTime() : Number.POSITIVE_INFINITY

    return createdDate >= startDate && createdDate <= endDate
  })
})

// headers
const headers = [
  { title: 'Sản phẩm', key: 'name' },
  { title: 'Số lượng', key: 'quantity' },
  { title: 'Ngày đặt', key: 'createdDate' },
  { title: 'Giá', key: 'price' },
  {
    title: 'Trạng thái',
    key: 'status',
  },
  { title: 'Hủy', key: 'delete', sortable: false },
]

const statusMap = new Map<string, string>([
  ['pending', 'Đang chờ xử lý'],
  ['confirmed', 'Đã xác nhận'],
  ['completed', 'Hoàn thành'],
  ['declined', 'Bị từ chối'],
])

const selectedItem = ref<string>('')

// 👉 methods
const clickDelete = async (itemId: string) => {
  selectedItem.value = itemId.toString()
  deleteDialog.value = true
}

const deleteItem = async () => {
  if (!orderList.value)
    return

  const index = orderList.value.findIndex((item: CustomerOrder) => item.id === selectedItem.value)

  console.log(selectedItem.value)
  await orderList.value.splice(index, 1)
  deleteDialog.value = false
}

const resolveStatusColor = (status: string) => {
  if (status === 'confirmed')
    return 'primary'
  if (status === 'completed')
    return 'success'
  if (status === 'declined')
    return 'error'
  if (status === 'pending')
    return 'warning'
}

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Hiển thị a.m./p.m.
    day: '2-digit',
    month: '2-digit',
    year: '2-digit', // Hiển thị 2 chữ số cuối của năm
  }

  return new Date(date).toLocaleString('en-US', options)
}
</script>

<template>
  <VCardItem class="pb-3">
    <VCardTitle class="text-primary">
      Danh sách đơn hàng
    </VCardTitle>
  </VCardItem>
  <div>
    <VCardText class="pt-0">
      <VRow style="direction: ltr;">
        <VCol
          cols="12"
          offset-md="0"
          md="4"
        >
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
        <VCol
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
        </vcol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable
      :headers="headers"
      :items="filteredOrderList || []"
      :search="search"
      :items-per-page="5"
      class="text-no-wrap"
    >
      <template #item.createdDate="{ item }">
        <p class="mi-1">
          {{ formatDate(item.createdDate) }}
        </p>
      </template>
      <!-- Status -->
      <template #item.status="{ item }">
        <VChip
          :color="resolveStatusColor(item.status)"
          size="small"
          class="font-weight-medium"
        >
          {{ statusMap.get(item.status) }}
        </VChip>
      </template>
      <!-- Delete -->
      <template #item.delete="{ item }">
        <IconBtn
          v-if="item.status === 'pending'"
          @click="clickDelete(item.id)"
        >
          <VIcon icon="bx-trash" />
        </IconBtn>
      </template>
    </VDataTable>
  </div>
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
  >
    <VCard title="Bạn có muốn hủy đơn hàng này không?">
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
            Xác nhận hủy
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>
