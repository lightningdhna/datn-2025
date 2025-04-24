<script setup lang="ts">
import { formatDate, formatPrice } from "@/utils/formatters";
import { getDropshipperId } from "@/utils/local-storage";
import { getRegistrationsByCurrentDropshipper } from "@/utils/registration-api";
import { requiredValidator } from "@/utils/validator";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const isLoading = ref(true);
const search = ref("");
const activeTab = ref('all');

// Data
const orders = ref<any[]>([]);
const registeredProducts = ref<any[]>([]);

// Dialogs
const newOrderDialog = ref(false);
const confirmCancelDialog = ref(false);
const selectedOrder = ref<any>(null);

// New order form
const newOrder = ref({
  productId: "",
  quantity: 1,
  locationX: 0,
  locationY: 0,
  note: "",
});

// Fetch orders
const fetchOrders = async () => {
  isLoading.value = true;
  try {
    // Get dropshipper ID
    const dropshipperId = getDropshipperId();
    if (!dropshipperId) {
      toast.error("Không tìm thấy ID dropshipper");
      return;
    }

    // Fetch orders from API
    // For demonstration, I'm simulating API call with a timeout
    // In a real application, replace this with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample data - replace with actual API call
    orders.value = [
      {
        id: "ORD001",
        productId: "PRD001",
        productName: "Apple iPhone 13",
        productPrice: 20000000,
        quantity: 1,
        totalPrice: 20000000,
        status: 0, // 0: pending, 1: processing, 2: shipping, 3: completed
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        locationX: 10.762622,
        locationY: 106.660172,
        note: "Delivery to front door",
      },
      {
        id: "ORD002",
        productId: "PRD002",
        productName: "Samsung Galaxy S22",
        productPrice: 18000000,
        quantity: 2,
        totalPrice: 36000000,
        status: 1, // 0: pending, 1: processing, 2: shipping, 3: completed
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        locationX: 10.780389,
        locationY: 106.701447,
        note: "",
      },
      {
        id: "ORD003",
        productId: "PRD003",
        productName: "MacBook Pro 14-inch",
        productPrice: 45000000,
        quantity: 1,
        totalPrice: 45000000,
        status: 2, // 0: pending, 1: processing, 2: shipping, 3: completed
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
        locationX: 10.803748,
        locationY: 106.633361,
        note: "Call before delivery",
      },
      {
        id: "ORD004",
        productId: "PRD004",
        productName: "iPad Air",
        productPrice: 16000000,
        quantity: 3,
        totalPrice: 48000000,
        status: 3, // 0: pending, 1: processing, 2: shipping, 3: completed
        createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
        locationX: 10.823099,
        locationY: 106.629179,
        note: "",
      },
    ];

    // Fetch registered products for creating new orders
    const registrationsResult = await getRegistrationsByCurrentDropshipper(1); // Only approved registrations
    if (registrationsResult.success && registrationsResult.data) {
      registeredProducts.value = registrationsResult.data.map((reg: any) => ({
        id: reg.productId,
        name: reg.product?.name || "Unknown Product",
        price: reg.product?.price || 0,
        weight: reg.product?.weight || 0,
        volume: reg.product?.volume || 0,
      }));
    } else {
      console.error("Error fetching registered products:", registrationsResult.error || "Unknown error");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Đã xảy ra lỗi khi tải danh sách đơn hàng");
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchOrders();
});

// Table headers
const orderHeaders = [
  { title: "Mã đơn hàng", key: "id" },
  { title: "Sản phẩm", key: "productName" },
  { title: "Số lượng", key: "quantity", align: "end" },
  { title: "Tổng tiền", key: "totalPrice", align: "end" },
  { title: "Ngày tạo", key: "createdDate" },
  { title: "Trạng thái", key: "status", align: "center" },
  { title: "Thao tác", key: "actions", align: "center" },
] as const;

// Filter orders based on active tab
const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return orders.value;
  }
  const statusMap: Record<string, number> = {
    pending: 0,
    processing: 1,
    shipping: 2,
    completed: 3,
  };
  return orders.value.filter(order => order.status === statusMap[activeTab.value]);
});

// Get status text and color
const getStatusInfo = (status: number) => {
  switch (status) {
    case 0:
      return { text: "Chờ xử lý", color: "warning" };
    case 1:
      return { text: "Đang xử lý", color: "info" };
    case 2:
      return { text: "Đang vận chuyển", color: "primary" };
    case 3:
      return { text: "Hoàn thành", color: "success" };
    default:
      return { text: "Không xác định", color: "error" };
  }
};

// Navigation functions
const viewOrderDetails = (orderId: string) => {
  router.push(`/dropshipper/order-info/${orderId}`);
};

const viewProductDetails = (productId: string) => {
  router.push(`/dropshipper/product-info/${productId}`);
};

// Open cancel order dialog
const openCancelDialog = (order: any) => {
  selectedOrder.value = order;
  confirmCancelDialog.value = true;
};

// Create new order
const createOrder = () => {
  // Validate form
  if (!newOrder.value.productId || newOrder.value.quantity < 1) {
    toast.error("Vui lòng điền đầy đủ thông tin đơn hàng");
    return;
  }

  // In a real app, this would call the API to create the order
  const selectedProduct = registeredProducts.value.find(
    p => p.id === newOrder.value.productId
  );

  if (!selectedProduct) {
    toast.error("Sản phẩm không hợp lệ");
    return;
  }

  const newOrderData = {
    id: `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    productId: newOrder.value.productId,
    productName: selectedProduct.name,
    productPrice: selectedProduct.price,
    quantity: newOrder.value.quantity,
    totalPrice: selectedProduct.price * newOrder.value.quantity,
    status: 0, // pending
    createdDate: new Date(),
    locationX: newOrder.value.locationX,
    locationY: newOrder.value.locationY,
    note: newOrder.value.note,
  };

  // Add to orders list
  orders.value.unshift(newOrderData);
  toast.success("Đã tạo đơn hàng mới thành công");
  newOrderDialog.value = false;

  // Reset form
  newOrder.value = {
    productId: "",
    quantity: 1,
    locationX: 0,
    locationY: 0,
    note: "",
  };
};

// Cancel order
const cancelOrder = () => {
  if (!selectedOrder.value) return;

  // In a real app, this would call the API to cancel the order
  const index = orders.value.findIndex(o => o.id === selectedOrder.value.id);
  if (index !== -1) {
    orders.value.splice(index, 1);
    toast.success("Đã hủy đơn hàng thành công");
  }
  confirmCancelDialog.value = false;
  selectedOrder.value = null;
};

// Refresh data
const refreshData = async () => {
  await fetchOrders();
  toast.success("Đã làm mới danh sách đơn hàng");
};

// Selected product details for new order
const selectedProductDetails = computed(() => {
  if (!newOrder.value.productId) return null;
  return registeredProducts.value.find(p => p.id === newOrder.value.productId);
});

// Computed total price for new order
const computedTotalPrice = computed(() => {
  if (!selectedProductDetails.value) return 0;
  return selectedProductDetails.value.price * newOrder.value.quantity;
});
</script>

<template>
  <section>
    <VCard>
      <!-- HEADER -->
      <VCardItem>
        <VCardTitle class="text-h5 d-flex align-center">
          <VIcon icon="bx-receipt" class="me-2" />
          Quản lý đơn hàng
          <VSpacer />
          <VBtn
            icon
            size="small"
            variant="text"
            color="default"
            @click="refreshData"
          >
            <VIcon icon="bx-refresh" />
          </VBtn>
        </VCardTitle>
      </VCardItem>

      <VDivider />

      <VCardText>
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="search"
              density="compact"
              label="Tìm kiếm đơn hàng"
              prepend-inner-icon="bx-search"
              clearable
              single-line
              hide-details
            />
          </VCol>
          <VCol cols="12" md="6" class="d-flex justify-end">
            <VBtn
              color="primary"
              prepend-icon="bx-plus"
              @click="newOrderDialog = true"
              :disabled="registeredProducts.length === 0"
            >
              Tạo đơn hàng mới
            </VBtn>
          </VCol>
        </VRow>

        <!-- Tabs -->
        <VTabs v-model="activeTab" class="mt-4">
          <VTab value="all" class="text-capitalize">
            Tất cả
          </VTab>
          <VTab value="pending" class="text-capitalize">
            Chờ xử lý
          </VTab>
          <VTab value="processing" class="text-capitalize">
            Đang xử lý
          </VTab>
          <VTab value="shipping" class="text-capitalize">
            Đang vận chuyển
          </VTab>
          <VTab value="completed" class="text-capitalize">
            Hoàn thành
          </VTab>
        </VTabs>

        <!-- Orders Table -->
        <VDataTable
          :headers="orderHeaders"
          :items="filteredOrders"
          :search="search"
          :loading="isLoading"
          class="mt-5"
          hover
          item-value="id"
        >
          <template #item.totalPrice="{ item }">
            {{ formatPrice(item.totalPrice) }}
          </template>

          <template #item.createdDate="{ item }">
            {{ formatDate(item.createdDate) }}
          </template>

          <template #item.status="{ item }">
            <VChip
              :color="getStatusInfo(item.status).color"
              size="small"
            >
              {{ getStatusInfo(item.status).text }}
            </VChip>
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex gap-1 justify-center">
              <VBtn
                icon
                size="small"
                color="primary"
                variant="text"
                @click="viewOrderDetails(item.id)"
              >
                <VIcon icon="bx-info-circle" />
                <VTooltip activator="parent" location="top">
                  Xem chi tiết đơn hàng
                </VTooltip>
              </VBtn>

              <VBtn
                icon
                size="small"
                color="secondary"
                variant="text"
                @click="viewProductDetails(item.productId)"
              >
                <VIcon icon="bx-package" />
                <VTooltip activator="parent" location="top">
                  Xem thông tin sản phẩm
                </VTooltip>
              </VBtn>

              <VBtn
                v-if="item.status === 0" 
                icon
                size="small"
                color="error"
                variant="text"
                @click="openCancelDialog(item)"
              >
                <VIcon icon="bx-x-circle" />
                <VTooltip activator="parent" location="top">
                  Hủy đơn hàng
                </VTooltip>
              </VBtn>
            </div>
          </template>

          <template #no-data>
            <div class="text-center pa-4">
              <p>Không có đơn hàng nào</p>
            </div>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>

    <!-- New Order Dialog -->
    <VDialog
      v-model="newOrderDialog"
      max-width="600px"
      persistent
    >
      <VCard>
        <VCardTitle class="text-h5">
          Tạo đơn hàng mới
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VSelect
                v-model="newOrder.productId"
                :items="registeredProducts"
                item-title="name"
                item-value="id"
                label="Sản phẩm"
                return-object
                single-line
                :rules="[requiredValidator]"
              >
                <template #item="{ props, item }">
                  <VListItem v-bind="props">
                    <VListItemTitle>
                      {{ item.raw.name }}
                    </VListItemTitle>
                    <VListItemSubtitle>
                      Giá: {{ formatPrice(item.raw.price) }}
                    </VListItemSubtitle>
                  </VListItem>
                </template>
                <template #selection="{ item }">
                  {{ item.name }}
                </template>
              </VSelect>
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="newOrder.quantity"
                type="number"
                label="Số lượng"
                min="1"
                :rules="[requiredValidator]"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                :model-value="formatPrice(computedTotalPrice)"
                label="Tổng tiền"
                readonly
                disabled
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="newOrder.locationX"
                type="number"
                label="Vị trí X"
                :rules="[requiredValidator]"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="newOrder.locationY"
                type="number"
                label="Vị trí Y"
                :rules="[requiredValidator]"
              />
            </VCol>

            <VCol cols="12">
              <VTextarea
                v-model="newOrder.note"
                label="Ghi chú"
                rows="3"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
            color="error"
            variant="text"
            @click="newOrderDialog = false"
          >
            Hủy
          </VBtn>
          <VBtn
            color="primary"
            @click="createOrder"
            :loading="isLoading"
          >
            Tạo đơn hàng
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Confirm Cancel Dialog -->
    <VDialog
      v-model="confirmCancelDialog"
      max-width="500px"
    >
      <VCard v-if="selectedOrder">
        <VCardTitle class="text-h5">
          Xác nhận hủy đơn hàng
        </VCardTitle>
        <VCardText>
          Bạn có chắc chắn muốn hủy đơn hàng {{ selectedOrder.id }} không?
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn
            color="primary"
            variant="text"
            @click="confirmCancelDialog = false"
          >
            Không
          </VBtn>
          <VBtn
            color="error"
            @click="cancelOrder"
            :loading="isLoading"
          >
            Có, hủy đơn hàng
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </section>
</template>
