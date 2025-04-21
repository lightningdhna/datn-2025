<script setup lang="ts">
import { formatDate, formatPrice } from "@/utils/formatters";
import {
  createProduct,
  deleteProduct,
  getAllProductsBySupplier,
  getProductSummary,
  updateProduct,
} from "@/utils/product-api";
import { requiredValidator } from "@/utils/validator";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const router = useRouter();
const toast = useToast();

const isLoading = ref(true);
const productList = ref<any[]>([]); // Khởi tạo productList là một mảng rỗng

const fetchProductList = async () => {
  isLoading.value = true;
  try {
    const result = await getAllProductsBySupplier();
    if (result.success) {
      // First get the basic product information
      const products = result.data;

      // Then enhance each product with summary information
      const productsWithSummary = await Promise.all(
        products.map(async (product) => {
          try {
            const summaryResult = await getProductSummary(product.id);
            if (summaryResult.success) {
              return {
                ...product,
                totalStockQuantity: summaryResult.data.totalStockQuantity || 0,
                dropshipperCount: summaryResult.data.dropshipperCount || 0,
                monthlySoldQuantity:
                  summaryResult.data.monthlySoldQuantity || 0,
                monthlyCompletedOrderCount:
                  summaryResult.data.monthlyCompletedOrderCount || 0,
              };
            }
            return product; // Return original product if summary fetch fails
          } catch (err) {
            console.error(
              `Error fetching summary for product ${product.id}:`,
              err
            );
            return product; // Return original product on error
          }
        })
      );

      productList.value = productsWithSummary;
    } else {
      console.error("Lỗi khi lấy danh sách sản phẩm:", result.error);
      toast.error(`Không thể lấy danh sách sản phẩm: ${result.message}`);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    toast.error("Đã xảy ra lỗi khi tải danh sách sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProductList();
});

// Updated headers to include the new columns
const headers = [
  { title: "", key: "data-table-expand" },
  { title: "Tên sản phẩm", key: "name" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Giá (VNĐ)", key: "price" },
  { title: "Ngày cập nhật", key: "date", sortable: true },
  { title: "Tổng số hàng còn", key: "totalStockQuantity", align: "center" },
  { title: "Số DS đăng ký", key: "dropshipperCount", align: "center" },
  { title: "SL bán trong tháng", key: "monthlySoldQuantity", align: "center" },
  {
    title: "Số đơn hoàn thành",
    key: "monthlyCompletedOrderCount",
    align: "center",
  },
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
    name: "", // Tên sản phẩm
    price: 0, // Giá sản phẩm
    date: new Date(), // Ngày cập nhật
    note: "", // Ghi chú
  };

  newDialog.value = true;
};

const validateProductInfo = (product: any) => {
  return product.name && product.price > 0;
};

const updateList = async (updatedList: any) => {
  // After updating the basic list, we need to fetch summary data again
  isLoading.value = true;
  try {
    // Enhance each product with summary information
    const productsWithSummary = await Promise.all(
      updatedList.map(async (product) => {
        try {
          const summaryResult = await getProductSummary(product.id);
          if (summaryResult.success) {
            return {
              ...product,
              totalStockQuantity: summaryResult.data.totalStockQuantity || 0,
              dropshipperCount: summaryResult.data.dropshipperCount || 0,
              monthlySoldQuantity: summaryResult.data.monthlySoldQuantity || 0,
              monthlyCompletedOrderCount:
                summaryResult.data.monthlyCompletedOrderCount || 0,
            };
          }
          return product;
        } catch (err) {
          console.error(
            `Error fetching summary for product ${product.id}:`,
            err
          );
          return product;
        }
      })
    );

    productList.value = productsWithSummary;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh sách sản phẩm:", error);
    toast.error("Đã xảy ra lỗi khi cập nhật danh sách sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

// Function to refresh a single product's data
const refreshProductData = async (productId) => {
  try {
    const summaryResult = await getProductSummary(productId);
    if (summaryResult.success) {
      // Find and update the product in the list
      const index = productList.value.findIndex((p) => p.id === productId);
      if (index !== -1) {
        productList.value[index] = {
          ...productList.value[index],
          totalStockQuantity: summaryResult.data.totalStockQuantity || 0,
          dropshipperCount: summaryResult.data.dropshipperCount || 0,
          monthlySoldQuantity: summaryResult.data.monthlySoldQuantity || 0,
          monthlyCompletedOrderCount:
            summaryResult.data.monthlyCompletedOrderCount || 0,
        };
      }
    }
  } catch (err) {
    console.error(`Error refreshing product ${productId}:`, err);
  }
};
</script>

<template>
  <ManagementDialog
    :itemList="productList"
    @updateList="updateList"
    :deleteApi="deleteProduct"
    :createApi="createProduct"
    :updateApi="updateProduct"
    v-model:deleteDialog="deleteDialog"
    v-model:newDialog="newDialog"
    v-model:editDialog="editDialog"
    :item="pickedItem"
    :validateInfo="validateProductInfo"
  >
    <template #new-form>
      <VRow>
        <!-- fullName -->
        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItem.name"
            label="Tên"
            :rules="[requiredValidator]"
          />
        </VCol>

        <!-- fullName -->
        <VCol cols="12" sm="6">
          <!-- <VTextField
                v-model="newItem.id"
                label="Mã"
                :rules="[requiredValidator]"
                readonly
              /> -->
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
            v-model.number="pickedItem.price"
            label="Giá"
            :rules="[requiredValidator]"
            suffix=" VNĐ"
          />
        </VCol>
        <VCol cols="12" sm="6">
          <my-date-picker
            v-model="pickedItem.date"
            label="Ngày cập nhật"
            :rules="[requiredValidator]"
            disabled
          />
        </VCol>
        <VCol cols="12" sm="12">
          <VTextarea v-model="pickedItem.note" label="Ghi chú" />
        </VCol>
      </VRow>
    </template>
    <template #edit-form>
      <VRow>
        <!-- fullName -->
        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItem.name"
            label="Tên"
            :rules="[requiredValidator]"
          />
        </VCol>

        <!-- fullName -->
        <VCol cols="12" sm="6">
          <VTextField
            v-model="pickedItem.id"
            label="Mã"
            :rules="[requiredValidator]"
            readonly
          />
        </VCol>
        <VCol cols="12" sm="6">
          <VTextField
            v-model.number="pickedItem.price"
            label="Giá"
            :rules="[requiredValidator]"
            suffix=" VNĐ"
          />
        </VCol>
        <VCol cols="12" sm="6">
          <my-date-picker
            v-model="pickedItem.date"
            label="Ngày cập nhật"
            :rules="[requiredValidator]"
            disabled
          />
        </VCol>
        <VCol cols="12" sm="12">
          <VTextarea v-model="pickedItem.note" label="Ghi chú" />
        </VCol>
      </VRow>
    </template>
  </ManagementDialog>

  <VCard>
    <VCardTitle class="text-primary">
      <VIcon icon="bx-package"></VIcon>
      Danh sách sản phẩm
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
        :items="productList"
        :items-per-page="20"
        :search="search"
        :loading="isLoading"
        :sort-by="[{ key: 'date', order: 'desc' }]"
        expand-on-click
        density="compact"
      >
        <template #expanded-row="slotProps">
          <tr class="v-data-table__tr">
            <td></td>
            <td :colspan="headers.length - 2">
              <div class="px-2 py-3">
                <VRow>
                  <VCol cols="12" md="6">
                    <div class="d-flex align-center mb-2">
                      <strong class="me-2">Ghi chú:</strong>
                      <span style="white-space: pre-wrap;">{{
                        slotProps.item.note || "Không có ghi chú"
                      }}</span>
                    </div>
                  </VCol>
                  <VCol cols="12" md="6">
                    <div class="d-flex align-center mb-2">
                      <VBtn
                        size="small"
                        color="primary"
                        variant="tonal"
                        :loading="isLoading"
                        @click="refreshProductData(slotProps.item.id)"
                      >
                        <VIcon size="small" icon="bx-refresh" class="me-1" />
                        Làm mới dữ liệu
                      </VBtn>
                    </div>
                  </VCol>
                </VRow>
              </div>
            </td>
          </tr>
        </template>

        <template #item.price="{ item }">
          {{ formatPrice(item.price) }}
        </template>
        <template #item.date="{ item }">{{ formatDate(item.date) }}</template>

        <!-- Templates for the new columns -->
        <template #item.totalStockQuantity="{ item }">
          <VChip
            :color="item.totalStockQuantity > 10 ? 'success' : 'warning'"
            size="small"
            class="text-white"
          >
            {{ item.totalStockQuantity }}
          </VChip>
        </template>

        <template #item.dropshipperCount="{ item }">
          <VChip
            :color="item.dropshipperCount > 0 ? 'info' : 'secondary'"
            size="small"
          >
            {{ item.dropshipperCount }}
          </VChip>
        </template>

        <template #item.monthlySoldQuantity="{ item }">
          <VChip
            :color="item.monthlySoldQuantity > 0 ? 'success' : 'secondary'"
            size="small"
          >
            {{ item.monthlySoldQuantity }}
          </VChip>
        </template>

        <template #item.monthlyCompletedOrderCount="{ item }">
          <VChip
            :color="
              item.monthlyCompletedOrderCount > 0 ? 'success' : 'secondary'
            "
            size="small"
          >
            {{ item.monthlyCompletedOrderCount }}
          </VChip>
        </template>

        <template #item.action="{ item }">
          <IconBtn @click="router.push(`/supplier/product-info/${item.id}`)">
            <VTooltip activator="parent" location="top">Chi tiết</VTooltip>
            <VIcon icon="bx-info-circle" />
          </IconBtn>
          <IconBtn @click="openEditDialog(item)">
            <VTooltip activator="parent" location="top">Sửa</VTooltip>
            <VIcon color="success" icon="bx-edit" />
          </IconBtn>
          <IconBtn @click="openDeleteDialog(item)">
            <VTooltip activator="parent" location="top">Xóa</VTooltip>
            <VIcon color="error" icon="bx-trash" />
          </IconBtn>
        </template>

        <template #no-data>
          <div class="text-center pa-3">
            <p>Không có sản phẩm nào</p>
          </div>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>

  <div class="dock-div">
    <VBtn class="dock-button" color="success" disabled>
      <VIcon icon="bx-upload" class="me-2" /> | Upload file csv
    </VBtn>
    <VBtn @click="openNewDialog" class="dock-button ms-2">
      <VIcon icon="bxs-file-plus" class="me-2" /> | Thêm sản phẩm
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
