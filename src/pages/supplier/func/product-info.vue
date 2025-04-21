<script setup lang="ts">
import { formatDate, formatDateTime, formatPrice } from "@/utils/formatters";
import {
  deleteProduct,
  getProductById,
  getProductSummary,
  updateProduct,
} from "@/utils/product-api";
import {
  getRegistrationsByCurrentSupplier,
  rejectRegistrationForCurrentSupplier,
} from "@/utils/registration-api";
import { requiredValidator } from "@/utils/validator";
import { getWarehousesByProduct } from "@/utils/warehouse-api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const toast = useToast();
const isLoading = ref(true);

const product = ref({
  name: "",
  price: 0,
  supplierId: "",
  date: null,
  note: "",
  weight: 0,
  volume: 0,
});

// Product summary data
const productSummary = ref<any>(null);
const totalQuantity = ref(0);

// Lists for tables
const warehouseList = ref<any[]>([]);
const dropshipperList = ref<any[]>([]);

// Fetch product information and related data
const fetchProductInfo = async (id: string) => {
  isLoading.value = true;
  try {
    // Get basic product info
    const productResult = await getProductById(id);
    if (!productResult.success) {
      toast.error(`Không thể tải thông tin sản phẩm: ${productResult.message}`);
      router.push("/supplier/product");
      return;
    }
    product.value = { ...productResult.data };

    // Get product summary
    const summaryResult = await getProductSummary(id);
    if (summaryResult.success) {
      productSummary.value = summaryResult.data;
      totalQuantity.value = productSummary.value.totalStockQuantity || 0;
    } else {
      toast.warning("Không thể tải thông tin tổng hợp sản phẩm");
    }

    // Get warehouses with stock
    const warehouseResult = await getWarehousesByProduct(id);
    if (warehouseResult.success) {
      warehouseList.value = warehouseResult.data.map((warehouse: any) => {
        // Find quantity from warehouse products
        const warehouseProduct = warehouse.warehouseProducts?.find(
          (wp: any) => wp.productId === id
        );
        return {
          id: warehouse.id,
          name: warehouse.name,
          location: `X:${warehouse.locationX.toFixed(
            2
          )}, Y:${warehouse.locationY.toFixed(2)}`,
          quantity: warehouseProduct?.quantity || 0,
        };
      });
    } else {
      toast.warning("Không thể tải danh sách kho hàng");
    }

    // Get dropshippers selling this product
    const registrationsResult = await getRegistrationsByCurrentSupplier(1); // Status 1 = approved
    if (registrationsResult.success) {
      // Filter registrations for this product
      const productRegistrations = registrationsResult.data.filter(
        (reg: any) => reg.productId === id
      );

      dropshipperList.value = productRegistrations.map((reg: any) => ({
        dropshipperId: reg.dropshipperId,
        dropshipperName:
          reg.dropshipper?.name ||
          `Dropshipper #${reg.dropshipperId.substr(0, 8)}`,
        id: reg.dropshipperId,
        commissionFee: `${reg.commissionFee.toFixed(2)}%`,
        registrationDate: new Date(reg.createdDate),
        completedOrders: 0, // Will be enhanced later if needed
        pendingOrders: 0, // Will be enhanced later if needed
        quantitySold: 0, // Will be enhanced later if needed
      }));
    } else {
      toast.warning("Không thể tải danh sách dropshipper");
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    toast.error("Đã xảy ra lỗi khi tải dữ liệu sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

// Initialize component
onMounted(() => {
  if (props.id) {
    fetchProductInfo(props.id);
  }
});

// Table headers
const headers = [
  { title: "Tên kho", key: "name" },
  { title: "Vị trí", key: "location" },
  { title: "Số lượng còn", key: "quantity", align: "end" },
  { title: "Chi tiết", key: "action", align: "center" },
];

const headers2 = [
  { title: "Cửa hàng", key: "dropshipperName" },
  { title: "Phí hoa hồng", key: "commissionFee", align: "end" },
  { title: "Ngày đăng ký", key: "registrationDate" },
  { title: "Thao tác", key: "action", align: "center" },
];

// Tab management
const activeTab = ref("one");
const search = ref("");

// Delete dropshipper registration
const deleteDialog = ref(false);
const deleteId = ref("");
const deleteDropshipperName = ref("");

const openDeleteDialog = (id: string, name: string) => {
  deleteId.value = id;
  deleteDropshipperName.value = name;
  deleteDialog.value = true;
};

const deleteItem = async () => {
  try {
    isLoading.value = true;
    const result = await rejectRegistrationForCurrentSupplier(
      props.id,
      deleteId.value
    );

    if (result.success) {
      // Remove from local list
      const index = dropshipperList.value.findIndex(
        (dropshipper) => dropshipper.id === deleteId.value
      );
      if (index !== -1) {
        dropshipperList.value.splice(index, 1);
      }
      toast.success(`Đã hủy đăng ký cho ${deleteDropshipperName.value}`);
    } else {
      toast.error(`Lỗi khi hủy đăng ký: ${result.message}`);
    }
  } catch (error) {
    console.error("Error removing registration:", error);
    toast.error("Đã xảy ra lỗi khi hủy đăng ký");
  } finally {
    isLoading.value = false;
    deleteDialog.value = false;
    deleteId.value = "";
    deleteDropshipperName.value = "";
  }
};

// Edit/Delete product
const editDialogMain = ref(false);
const deleteDialogMain = ref(false);
const pickedItemMain = ref<any | undefined>();

const openEditDialogMain = () => {
  pickedItemMain.value = { ...product.value };
  editDialogMain.value = true;
};

const openDeleteDialogMain = () => {
  pickedItemMain.value = { ...product.value };
  deleteDialogMain.value = true;
};

const validateProductInfo = (product: any) => {
  return product.name && product.price > 0;
};

// Product refresh
const refreshProductData = async () => {
  if (props.id) {
    await fetchProductInfo(props.id);
    toast.success("Đã làm mới dữ liệu sản phẩm");
  }
};
</script>

<template>
  <ItemManagementDialog
    :deleteApi="deleteProduct"
    :updateApi="updateProduct"
    v-model:deleteDialog="deleteDialogMain"
    v-model:editDialog="editDialogMain"
    :item="pickedItemMain"
    :validateInfo="validateProductInfo"
    v-model:current-item="product"
    @item-updated="refreshProductData"
  >
    <template #edit-form>
      <VRow>
        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItemMain.name"
            label="Tên"
            :rules="[requiredValidator]"
          />
        </VCol>

        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItemMain.id"
            label="Mã"
            :rules="[requiredValidator]"
            readonly
          />
        </VCol>

        <VCol cols="12" sm="6">
          <VTextField
            v-model.number="pickedItemMain.price"
            label="Giá"
            :rules="[requiredValidator]"
            suffix=" VNĐ"
          />
        </VCol>

        <VCol cols="12" sm="6">
          <my-date-picker
            v-model="pickedItemMain.date"
            label="Ngày cập nhật"
            :rules="[requiredValidator]"
            disabled
          />
        </VCol>

        <VCol cols="12" sm="6">
          <VTextField
            v-model.number="pickedItemMain.weight"
            label="Trọng lượng"
            suffix=" kg"
            min="0"
          />
        </VCol>

        <VCol cols="12" sm="6">
          <VTextField
            v-model.number="pickedItemMain.volume"
            label="Thể tích"
            suffix=" m³"
            min="0"
          />
        </VCol>

        <VCol cols="12" sm="12">
          <VTextarea v-model="pickedItemMain.note" label="Ghi chú" />
        </VCol>
      </VRow>
    </template>
  </ItemManagementDialog>

  <div>
    <VCard :loading="isLoading">
      <VCardTitle class="d-flex align-center">
        <VIcon icon="bx-package" size="2rem" class="me-2" />
        <span>Thông tin mặt hàng</span>
        <VSpacer />
        <VBtn
          v-if="!isLoading"
          color="primary"
          variant="text"
          @click="refreshProductData"
          class="ms-2"
        >
          <VIcon icon="bx-refresh" class="me-2" /> Làm mới
        </VBtn>
      </VCardTitle>

      <VCardText class="mt-6">
        <!-- Basic product info -->
        <VRow>
          <VCol cols="12" md="8">
            <!-- Left column: Basic product info -->
            <VRow align="center">
              <VCol cols="12" sm="3">
                <div class="text-button">Tên sản phẩm:</div>
              </VCol>
              <VCol cols="12" sm="9">
                <MyCopyLabel :loading="isLoading" :value="product.name" />
              </VCol>
            </VRow>

            <VRow align="center">
              <VCol cols="12" sm="3">
                <div class="text-button">Mã sản phẩm:</div>
              </VCol>
              <VCol cols="12" sm="9">
                <MyCopyLabel :loading="isLoading" :value="props.id" />
              </VCol>
            </VRow>

            <VRow align="center">
              <VCol cols="12" sm="3">
                <div class="text-button">Giá:</div>
              </VCol>
              <VCol cols="12" sm="9">
                <MyCopyLabel
                  :loading="isLoading"
                  :value="`${formatPrice(product.price)} VNĐ`"
                />
              </VCol>
            </VRow>

            <VRow align="center">
              <VCol cols="12" sm="3">
                <div class="text-button">Ngày cập nhật:</div>
              </VCol>
              <VCol cols="12" sm="9">
                <MyCopyLabel
                  :loading="isLoading"
                  :value="formatDateTime(product.date)"
                />
              </VCol>
            </VRow>

            <VRow
              align="center"
              v-if="product.weight > 0 || product.volume > 0"
            >
              <VCol cols="12" sm="3">
                <div class="text-button">Kích thước:</div>
              </VCol>
              <VCol cols="12" sm="9">
                <MyCopyLabel
                  :loading="isLoading"
                  :value="`${product.weight} kg, ${product.volume} m³`"
                />
              </VCol>
            </VRow>

            <VRow align="center" v-if="product.note">
              <VCol cols="12" sm="3">
                <div class="text-button">Ghi chú:</div>
              </VCol>
              <VCol cols="12" sm="9">
                <MyCopyLabel
                  class="font-italic"
                  :loading="isLoading"
                  :value="product.note"
                />
              </VCol>
            </VRow>
          </VCol>

          <!-- Right column: Summary stats -->
          <VCol
            cols="12"
            md="4"
            v-if="productSummary"
            class="d-flex flex-column"
          >
            <!-- Summary Stats Cards -->
            <VCard variant="outlined" class="mb-3">
              <VCardText>
                <div class="d-flex align-center justify-space-between mb-1">
                  <div class="text-overline">Tổng số hàng còn</div>
                  <VChip
                    :color="totalQuantity > 10 ? 'success' : 'warning'"
                    size="small"
                    class="text-white"
                  >
                    {{ totalQuantity }}
                  </VChip>
                </div>
                <div class="d-flex align-center justify-space-between mb-1">
                  <div class="text-overline">Số kho còn hàng</div>
                  <VChip color="info" size="small">
                    {{ productSummary.warehouseCount }}
                  </VChip>
                </div>
                <div class="d-flex align-center justify-space-between mb-1">
                  <div class="text-overline">Dropshipper đăng ký</div>
                  <VChip
                    :color="
                      productSummary.dropshipperCount > 0
                        ? 'primary'
                        : 'secondary'
                    "
                    size="small"
                  >
                    {{ productSummary.dropshipperCount }}
                  </VChip>
                </div>
              </VCardText>
            </VCard>

            <VCard variant="outlined">
              <VCardText>
                <div class="d-flex align-center justify-space-between mb-1">
                  <div class="text-overline">Bán trong tháng</div>
                  <VChip
                    :color="
                      productSummary.monthlySoldQuantity > 0
                        ? 'success'
                        : 'secondary'
                    "
                    size="small"
                  >
                    {{ productSummary.monthlySoldQuantity }}
                  </VChip>
                </div>
                <div class="d-flex align-center justify-space-between mb-1">
                  <div class="text-overline">Đơn tháng này</div>
                  <VChip
                    :color="
                      productSummary.monthlyCompletedOrderCount > 0
                        ? 'success'
                        : 'secondary'
                    "
                    size="small"
                  >
                    {{ productSummary.monthlyCompletedOrderCount }}
                  </VChip>
                </div>
                <div class="d-flex align-center justify-space-between mb-1">
                  <div class="text-overline">Tổng đã bán</div>
                  <VChip color="success" size="small">
                    {{ productSummary.totalSoldQuantity }}
                  </VChip>
                </div>
                <div class="d-flex align-center justify-space-between">
                  <div class="text-overline">Tổng đơn đã xong</div>
                  <VChip color="success" size="small">
                    {{ productSummary.completedOrderCount }}
                  </VChip>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

        <!-- Tabs for warehouses and dropshippers -->
        <VCard class="mt-6">
          <VCardTitle class="text-h6 font-weight-medium">
            <VRow class="mt-6 mb-5">
              <VCol cols="12" offset-md="0" md="4">
                <VTextField
                  v-model="search"
                  placeholder="Tìm kiếm..."
                  append-inner-icon="bx-search"
                  single-line
                  hide-details
                  dense
                  outlined
                />
              </VCol>
            </VRow>
            <VTabs v-model="activeTab">
              <VTab value="one">
                <div class="d-flex align-center">
                  <VIcon icon="bx-building-house" size="1.8rem" class="me-2" />
                  <span
                    >Danh sách kho còn hàng ({{ warehouseList.length }})</span
                  >
                </div>
              </VTab>
              <VTab value="two">
                <div class="d-flex align-center">
                  <VIcon icon="bx-store" size="1.8rem" class="me-2" />
                  <span
                    >Danh sách dropshipper bán ({{
                      dropshipperList.length
                    }})</span
                  >
                </div>
              </VTab>
            </VTabs>
          </VCardTitle>
          <VCardText class="mt-3">
            <VTabsWindow v-model="activeTab">
              <VTabsWindowItem value="one">
                <VCard>
                  <VCardText>
                    <VDataTable
                      :headers="headers"
                      :items="warehouseList"
                      :items-per-page="20"
                      :search="search"
                      no-data-text="Không có kho nào còn hàng cho sản phẩm này"
                    >
                      <template #item.quantity="{ item }">
                        <span
                          :class="
                            item.quantity < 10 ? 'text-error' : 'text-success'
                          "
                        >
                          {{ item.quantity }}
                        </span>
                      </template>

                      <template #item.action="{ item }">
                        <IconBtn
                          @click="router.push(`../warehouse-info/${item.id}`)"
                        >
                          <VTooltip activator="parent" location="top"
                            >Xem kho</VTooltip
                          >
                          <VIcon icon="bx-info-circle" />
                        </IconBtn>
                      </template>

                      <template #no-data>
                        <div class="text-center pa-4 text-medium-emphasis">
                          <VIcon icon="bx-package" size="32" class="mb-2" />
                          <p>Không có kho nào còn hàng cho sản phẩm này</p>
                        </div>
                      </template>
                    </VDataTable>
                  </VCardText>
                </VCard>
              </VTabsWindowItem>

              <VTabsWindowItem value="two">
                <VCard>
                  <VCardText>
                    <VDataTable
                      :items="dropshipperList"
                      :headers="headers2"
                      :items-per-page="20"
                      :search="search"
                      no-data-text="Không có dropshipper nào đăng ký bán sản phẩm này"
                    >
                      <template #item.dropshipperName="{ item }">
                        <RouterLink
                          :to="`/supplier/dropshipper-info/${item.id}`"
                        >
                          {{ item.dropshipperName }}
                        </RouterLink>
                      </template>

                      <template #item.registrationDate="{ item }">
                        {{ formatDate(item.registrationDate) }}
                      </template>

                      <template #item.action="{ item }">
                        <IconBtn
                          @click="
                            openDeleteDialog(item.id, item.dropshipperName)
                          "
                        >
                          <VTooltip activator="parent" location="top"
                            >Hủy đăng ký</VTooltip
                          >
                          <VIcon icon="bx-trash" color="error" />
                        </IconBtn>
                      </template>

                      <template #no-data>
                        <div class="text-center pa-4 text-medium-emphasis">
                          <VIcon icon="bx-store" size="32" class="mb-2" />
                          <p>
                            Không có dropshipper nào đăng ký bán sản phẩm này
                          </p>
                        </div>
                      </template>
                    </VDataTable>
                  </VCardText>
                </VCard>
              </VTabsWindowItem>
            </VTabsWindow>
          </VCardText>
        </VCard>
      </VCardText>
    </VCard>

    <!-- Delete dropshipper registration dialog -->
    <VDialog v-model="deleteDialog" max-width="500px">
      <VCard title="Bạn có muốn hủy đăng kí của cửa hàng này không?">
        <VCardText>
          <p>
            Xác nhận hủy đăng ký bán sản phẩm
            <strong>{{ product.name }}</strong> của cửa hàng
            <strong>{{ deleteDropshipperName }}</strong
            >?
          </p>
          <p class="text-caption text-error">
            Lưu ý: Thao tác này sẽ hủy đăng ký và dropshipper không thể tiếp tục
            bán sản phẩm của bạn.
          </p>
        </VCardText>
        <VCardActions>
          <div class="d-flex justify-center gap-4 w-100">
            <VBtn
              variant="outlined"
              color="secondary"
              @click="() => (deleteDialog = false)"
            >
              Bỏ qua
            </VBtn>
            <VBtn color="error" variant="outlined" @click="deleteItem">
              Xác nhận hủy
            </VBtn>
          </div>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>

  <!-- Floating action buttons -->
  <div class="dock-div">
    <VBtn @click="openEditDialogMain" class="dock-button" color="success">
      <VIcon icon="bx-edit" class="me-2" /> | Chỉnh sửa
    </VBtn>
    <VBtn @click="openDeleteDialogMain" class="dock-button ms-2" color="error">
      <VIcon icon="bx-trash" class="me-2" /> | Xóa
    </VBtn>
  </div>
</template>

<style scoped>
.dock-div {
  position: fixed;
  z-index: 1000;
  inset-block-start: 100px;
  inset-inline-end: 50px;
}

.dock-button {
  transition: all 0.3s ease;
}

.dock-button:hover {
  transform: scale(1.1);
}

.text-button {
  font-weight: 500;
  min-block-size: 24px;
}
</style>
