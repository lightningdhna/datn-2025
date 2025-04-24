<script setup lang="ts">
import { formatDate, formatPrice } from "@/utils/formatters";
import { getDropshipperId } from "@/utils/local-storage";
import { getProductById } from "@/utils/product-api";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const toast = useToast();
const isLoading = ref(true);
const order = ref<any>(null);
const confirmCancelDialog = ref(false);

// Order ID from route
const orderId = computed(() => route.params.id as string);

// Fetch order details
const fetchOrderDetails = async () => {
  isLoading.value = true;
  try {
    // Get dropshipper ID
    const dropshipperId = getDropshipperId();
    if (!dropshipperId) {
      toast.error("Không tìm thấy ID dropshipper");
      router.push('/dropshipper/order');
      return;
    }

    // TODO: Replace this with actual API call when available
    // For example: const result = await getOrderById(orderId.value);
    // if (result.success && result.data) { order.value = result.data; }
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample data
    order.value = {
      id: orderId.value,
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
      estimatedDeliveryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
      trackingInfo: [
        {
          status: "Order Created",
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          description: "Your order has been created and is pending processing",
        },
      ],
    };

    if (!order.value) {
      toast.error("Không tìm thấy thông tin đơn hàng");
      router.push('/dropshipper/order');
      return;
    }

    // Fetch product details if needed
    if (order.value.productId) {
      try {
        const productResult = await getProductById(order.value.productId);
        if (productResult.success && 'data' in productResult) {
          // Update product info with actual data
          order.value.productName = productResult.data.name || order.value.productName;
          order.value.productPrice = productResult.data.price || order.value.productPrice;
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
    toast.error("Đã xảy ra lỗi khi tải thông tin đơn hàng");
    router.push('/dropshipper/order');
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchOrderDetails();
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

// Cancel order function
const cancelOrder = async () => {
  try {
    // TODO: Replace with actual API call to cancel order
    // Example: const result = await cancelOrderById(orderId.value);
    // if (result.success) { toast.success(...); router.push(...); }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Đã hủy đơn hàng thành công");
    router.push('/dropshipper/order');
  } catch (error) {
    console.error("Error canceling order:", error);
    toast.error("Đã xảy ra lỗi khi hủy đơn hàng");
  } finally {
    confirmCancelDialog.value = false;
  }
};

// Open cancel dialog
const openCancelDialog = () => {
  if (order.value && order.value.status === 0) {
    confirmCancelDialog.value = true;
  } else {
    toast.warning("Chỉ có thể hủy đơn hàng ở trạng thái chờ xử lý");
  }
};

// View product details
const viewProductDetails = () => {
  if (order.value && order.value.productId) {
    router.push(`/dropshipper/product-info/${order.value.productId}`);
  }
};

// Format tracking date
const formatTrackingDate = (date: Date) => {
  return formatDate(date);
};
</script>

<template>
  <section>
    <VBackBtn class="mb-4" />

    <VCard v-if="isLoading">
      <VCardText>
        <div class="d-flex justify-center align-center pa-4">
          <VProgressCircular indeterminate color="primary" />
        </div>
      </VCardText>
    </VCard>

    <div v-else-if="order">
      <VRow>
        <!-- Order Details Card -->
        <VCol cols="12" md="8">
          <VCard>
            <VCardItem>
              <VCardTitle class="text-h5 d-flex align-center">
                <VIcon icon="bx-receipt" class="me-2" />
                Chi tiết đơn hàng #{{ order.id }}
                <VSpacer />
                <VChip
                  :color="getStatusInfo(order.status).color"
                  class="ms-2"
                >
                  {{ getStatusInfo(order.status).text }}
                </VChip>
              </VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <VRow>
                <VCol cols="12" md="6">
                  <h3 class="text-h6 mb-2">Thông tin đơn hàng</h3>
                  <VList density="compact">
                    <VListItem>
                      <VListItemTitle>Ngày tạo đơn</VListItemTitle>
                      <VListItemSubtitle>
                        {{ formatDate(order.createdDate) }}
                      </VListItemSubtitle>
                    </VListItem>
                    
                    <VListItem>
                      <VListItemTitle>Dự kiến giao hàng</VListItemTitle>
                      <VListItemSubtitle>
                        {{ formatDate(order.estimatedDeliveryDate) }}
                      </VListItemSubtitle>
                    </VListItem>
                    
                    <VListItem>
                      <VListItemTitle>Vị trí giao hàng</VListItemTitle>
                      <VListItemSubtitle>
                        X: {{ order.locationX }}, Y: {{ order.locationY }}
                      </VListItemSubtitle>
                    </VListItem>
                    
                    <VListItem v-if="order.note">
                      <VListItemTitle>Ghi chú</VListItemTitle>
                      <VListItemSubtitle>
                        {{ order.note }}
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCol>
                
                <VCol cols="12" md="6">
                  <h3 class="text-h6 mb-2">Thông tin sản phẩm</h3>
                  <VList density="compact">
                    <VListItem>
                      <template #prepend>
                        <VAvatar size="40" rounded="0" class="me-3">
                          <VImg
                            src="https://via.placeholder.com/150"
                            alt="Product"
                          />
                        </VAvatar>
                      </template>
                      <VListItemTitle>
                        <span class="text-primary cursor-pointer" @click="viewProductDetails">
                          {{ order.productName }}
                        </span>
                      </VListItemTitle>
                    </VListItem>
                    
                    <VListItem>
                      <VListItemTitle>Đơn giá</VListItemTitle>
                      <VListItemSubtitle>
                        {{ formatPrice(order.productPrice) }}
                      </VListItemSubtitle>
                    </VListItem>
                    
                    <VListItem>
                      <VListItemTitle>Số lượng</VListItemTitle>
                      <VListItemSubtitle>
                        {{ order.quantity }}
                      </VListItemSubtitle>
                    </VListItem>
                    
                    <VListItem>
                      <VListItemTitle>Tổng tiền</VListItemTitle>
                      <VListItemSubtitle class="text-primary font-weight-bold">
                        {{ formatPrice(order.totalPrice) }}
                      </VListItemSubtitle>
                    </VListItem>
                  </VList>
                </VCol>
              </VRow>

              <VRow v-if="order.status === 0">
                <VCol cols="12" class="d-flex justify-end">
                  <VBtn
                    color="error"
                    variant="outlined"
                    @click="openCancelDialog"
                  >
                    <VIcon icon="bx-x-circle" class="me-2" />
                    Hủy đơn hàng
                  </VBtn>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCol>

        <!-- Tracking Card -->
        <VCol cols="12" md="4">
          <VCard>
            <VCardItem>
              <VCardTitle class="text-h5">
                <VIcon icon="bx-map" class="me-2" />
                Theo dõi đơn hàng
              </VCardTitle>
            </VCardItem>

            <VDivider />

            <VCardText>
              <VTimeline density="compact" align="start">
                <VTimelineItem
                  v-for="(item, index) in order.trackingInfo"
                  :key="index"
                  :dot-color="index === 0 ? 'primary' : ''"
                  :icon="index === 0 ? 'bx-check-circle' : undefined"
                >
                  <template #opposite>
                    <span class="text-caption">
                      {{ formatTrackingDate(item.date) }}
                    </span>
                  </template>
                  <VCard density="compact" variant="flat">
                    <VCardTitle class="text-subtitle-1 pt-1 pb-1">
                      {{ item.status }}
                    </VCardTitle>
                    <VCardText class="text-caption">
                      {{ item.description }}
                    </VCardText>
                  </VCard>
                </VTimelineItem>
              </VTimeline>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>

    <VCard v-else>
      <VCardText>
        <div class="text-center pa-4">
          <p>Không tìm thấy thông tin đơn hàng</p>
          <VBtn class="mt-2" to="/dropshipper/order">
            Quay lại danh sách đơn hàng
          </VBtn>
        </div>
      </VCardText>
    </VCard>

    <!-- Confirm Cancel Dialog -->
    <VDialog
      v-model="confirmCancelDialog"
      max-width="500px"
    >
      <VCard>
        <VCardTitle class="text-h5">
          Xác nhận hủy đơn hàng
        </VCardTitle>
        <VCardText>
          Bạn có chắc chắn muốn hủy đơn hàng #{{ order?.id }} không?
          <p class="text-caption mt-2">
            Lưu ý: Hành động này không thể hoàn tác sau khi xác nhận.
          </p>
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

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
