<script setup lang="ts">
import { getSupplierId } from "@/utils/local-storage";
import { getAllProductsBySupplier } from "@/utils/product-api"; // Import the product API function
import { requiredValidator } from "@/utils/validator";
import {
  getWarehouseById,
  getWarehouseSummary,
  updateProductQuantity,
} from "@/utils/warehouse-api";
import { computed, onMounted, ref, watch } from "vue";
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

// State management
const isLoading = ref(true);
const error = ref<string | null>(null);
const warehouse = ref<any>(null);
const warehouseSummary = ref<any>(null);
const productList = ref<any[]>([]);
const search = ref("");

const warehouseName = ref("");
const warehouseCapacity = ref(0);
const warehouseTimeToLoad = ref(0);
const warehouseLocation = ref({ x: 0, y: 0 });

// Fetch warehouse data and summary
const fetchWarehouseData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // Get basic warehouse info
    const warehouseResult = await getWarehouseById(props.id);
    if (!warehouseResult.success) {
      error.value =
        warehouseResult.message || "Không thể tải thông tin kho hàng";
      toast.error(error.value);
      isLoading.value = false;
      return;
    }

    warehouse.value = warehouseResult.data;
    warehouseName.value = warehouse.value.name;
    warehouseCapacity.value = warehouse.value.capacity;
    warehouseTimeToLoad.value = warehouse.value.timeToLoad;
    warehouseLocation.value = {
      x: warehouse.value.locationX,
      y: warehouse.value.locationY,
    };

    // Get warehouse summary with product details
    const summaryResult = await getWarehouseSummary(props.id);
    if (!summaryResult.success) {
      error.value =
        summaryResult.message || "Không thể tải thông tin tổng hợp kho hàng";
      toast.error(error.value);
      isLoading.value = false;
      return;
    }

    warehouseSummary.value = summaryResult.data;
    productList.value = summaryResult.data.products.map((product: any) => ({
      id: product.productId,
      name: product.productName,
      quantity: product.quantity,
    }));
  } catch (err: any) {
    console.error("Error fetching warehouse data:", err);
    error.value = "Đã xảy ra lỗi khi tải dữ liệu kho hàng.";
    toast.error(error.value);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchWarehouseData();
});

// Table headers
const headers = [
  { title: "Tên mặt hàng", key: "name" },
  { title: "Mã sản phẩm", key: "id" },
  { title: "Số lượng còn", key: "quantity", align: "end" },
  { title: "Thao tác", key: "action", sortable: false, align: "center" },
];

// Edit product dialog
const editDialog = ref(false);
// Fix: Initialize editedItem with default values to avoid optional chaining issues
const editedItem = ref<any>({ id: "", name: "", quantity: 0 });

const openEditDialog = (item: any) => {
  editedItem.value = { ...item };
  editDialog.value = true;
};

const closeEdit = () => {
  editDialog.value = false;
};

const saveEdit = async () => {
  if (!editedItem.value) return;

  try {
    isLoading.value = true;

    const result = await updateProductQuantity(props.id, editedItem.value.id, {
      quantity: editedItem.value.quantity,
    });

    if (result.success) {
      // Update local state
      const index = productList.value.findIndex(
        (product) => product.id === editedItem.value.id
      );
      if (index !== -1) {
        productList.value[index] = { ...editedItem.value };
      }
      toast.success("Cập nhật số lượng sản phẩm thành công!");
    } else {
      toast.error(`Lỗi khi cập nhật: ${result.message}`);
    }
  } catch (err) {
    console.error("Error updating product quantity:", err);
    toast.error("Đã xảy ra lỗi khi cập nhật số lượng sản phẩm");
  } finally {
    isLoading.value = false;
    editDialog.value = false;
  }
};

// Delete product dialog
const deleteDialog = ref(false);
const deleteId = ref("");
const deleteProductName = ref("");

const openDeleteDialog = (id: string, name: string) => {
  deleteId.value = id;
  deleteProductName.value = name;
  deleteDialog.value = true;
};

const deleteItem = async () => {
  try {
    isLoading.value = true;

    const result = await updateProductQuantity(
      props.id,
      deleteId.value,
      { quantity: 0 } // Setting quantity to 0 effectively removes it
    );

    if (result.success) {
      // Update local state
      const index = productList.value.findIndex(
        (product) => product.id === deleteId.value
      );
      if (index !== -1) {
        productList.value.splice(index, 1);
      }
      toast.success(`Đã xóa ${deleteProductName.value} khỏi kho!`);
    } else {
      toast.error(`Lỗi khi xóa sản phẩm: ${result.message}`);
    }
  } catch (err) {
    console.error("Error deleting product from warehouse:", err);
    toast.error("Đã xảy ra lỗi khi xóa sản phẩm khỏi kho");
  } finally {
    isLoading.value = false;
    deleteDialog.value = false;
    deleteId.value = "";
    deleteProductName.value = "";
  }
};

// Update product dialog
const updateDialog = ref(false);
const allProducts = ref<any[]>([]);
const supplierId = getSupplierId();

const fetchAllProducts = async () => {
  try {
    isLoading.value = true;

    const result = await getAllProductsBySupplier();

    if (result.success) {
      // Map product data to the format needed for the autocomplete
      allProducts.value = result.data.map((product: any) => ({
        id: product.id,
        name: product.name,
      }));
    } else {
      toast.error(`Không thể tải danh sách sản phẩm: ${result.message}`);
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    toast.error("Không thể tải danh sách sản phẩm");
  } finally {
    isLoading.value = false;
  }
};

// New item for update dialog
const updateItem = ref<any>({
  id: "",
  name: "",
  quantity: 0,
});

// Product name options for autocomplete
const productNames = computed(() => {
  return allProducts.value.map((product) => product.name);
});

// Product ID options for autocomplete
const productIds = computed(() => {
  return allProducts.value.map((product) => product.id);
});

// Watch for changes in product name and update product ID accordingly
watch(
  () => updateItem.value.name,
  (newName) => {
    if (newName) {
      const product = allProducts.value.find((p) => p.name === newName);
      if (product) {
        updateItem.value.id = product.id;
      }
    }
  }
);

// Watch for changes in product ID and update product name accordingly
watch(
  () => updateItem.value.id,
  (newId) => {
    if (newId) {
      const product = allProducts.value.find((p) => p.id === newId);
      if (product) {
        updateItem.value.name = product.name;
      }
    }
  }
);

const openUpdateDialog = () => {
  fetchAllProducts();
  updateItem.value = {
    id: "",
    name: "",
    quantity: 0,
  };
  updateDialog.value = true;
};

const saveUpdate = async () => {
  if (!updateItem.value.id || !updateItem.value.name) {
    toast.error("Vui lòng chọn sản phẩm");
    return;
  }

  if (updateItem.value.quantity <= 0) {
    toast.error("Số lượng phải lớn hơn 0");
    return;
  }

  try {
    isLoading.value = true;

    const result = await updateProductQuantity(props.id, updateItem.value.id, {
      quantity: updateItem.value.quantity,
    });

    if (result.success) {
      // Check if product already exists in the list
      const existingIndex = productList.value.findIndex(
        (product) => product.id === updateItem.value.id
      );

      if (existingIndex !== -1) {
        // Update existing product
        productList.value[existingIndex].quantity = updateItem.value.quantity;
        toast.success(`Đã cập nhật số lượng sản phẩm ${updateItem.value.name}`);
      } else {
        // Add new product
        productList.value.push({
          id: updateItem.value.id,
          name: updateItem.value.name,
          quantity: updateItem.value.quantity,
        });
        toast.success(`Đã thêm sản phẩm ${updateItem.value.name} vào kho`);
      }

      // Refresh data to ensure everything is up to date
      await fetchWarehouseData();
    } else {
      toast.error(`Lỗi khi cập nhật kho: ${result.message}`);
    }
  } catch (err) {
    console.error("Error updating warehouse product:", err);
    toast.error("Đã xảy ra lỗi khi cập nhật kho");
  } finally {
    isLoading.value = false;
    updateDialog.value = false;
  }
};
</script>

<template>
  <div>
    <VCard>
      <VCardTitle class="d-flex align-center">
        <VIcon icon="bx-building-house" size="2rem" class="me-2" />
        <span>Thông tin kho hàng</span>
      </VCardTitle>

      <VCardText v-if="isLoading" class="text-center">
        <VProgressCircular indeterminate color="primary" />
        <p>Đang tải dữ liệu kho hàng...</p>
      </VCardText>

      <VCardText v-else-if="error" class="text-center">
        <VAlert type="error" prominent>
          {{ error }}
        </VAlert>
      </VCardText>

      <VCardText v-else class="mt-6">
        <!-- Thông tin cơ bản -->
        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Tên kho hàng:</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ warehouseName }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Mã kho hàng:</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ props.id }}</div>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Tọa độ:</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">
              X: {{ warehouseLocation.x.toFixed(4) }}, Y:
              {{ warehouseLocation.y.toFixed(4) }}
            </div>
          </VCol>
        </VRow>

        <!-- <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Sức chứa kho:</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ warehouseCapacity }}</div>
          </VCol>
        </VRow> -->

        <VRow>
          <VCol cols="12" sm="3">
            <div class="text-button">Thời gian xử lý:</div>
          </VCol>
          <VCol cols="12" sm="4">
            <div class="text-button">{{ warehouseTimeToLoad }} phút</div>
          </VCol>
        </VRow>

        <!-- Thông tin tổng hợp -->
        <VRow v-if="warehouseSummary" class="mt-4">
          <VCol cols="12" sm="6" md="4">
            <VCard variant="outlined">
              <VCardText>
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="text-overline mb-1">Loại sản phẩm</div>
                    <div class="text-h4">
                      {{ warehouseSummary.productTypeCount }}
                    </div>
                  </div>
                  <VAvatar color="primary" variant="tonal" size="48">
                    <VIcon icon="bx-package" size="24" />
                  </VAvatar>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" sm="6" md="4">
            <VCard variant="outlined">
              <VCardText>
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="text-overline mb-1">Tổng số lượng</div>
                    <div class="text-h4">
                      {{ warehouseSummary.totalProductQuantity }}
                    </div>
                  </div>
                  <VAvatar color="success" variant="tonal" size="48">
                    <VIcon icon="bx-box" size="24" />
                  </VAvatar>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <!-- <VCol cols="12" sm="6" md="4">
            <VCard variant="outlined">
              <VCardText>
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <div class="text-overline mb-1">Tỷ lệ sử dụng</div>
                    <div class="text-h4">
                      {{
                        warehouseCapacity > 0
                          ? Math.round(
                              (warehouseSummary.totalProductQuantity /
                                warehouseCapacity) *
                                100
                            )
                          : 0
                      }}%
                    </div>
                  </div>
                  <VAvatar color="info" variant="tonal" size="48">
                    <VIcon icon="bx-pie-chart" size="24" />
                  </VAvatar>
                </div>
              </VCardText>
            </VCard>
          </VCol> -->
        </VRow>

        <!-- Danh sách sản phẩm -->
        <VCard class="mt-6">
          <VCardTitle
            class="text-h6 font-weight-medium d-flex align-center gap-2"
          >
            <VIcon icon="bx-package"></VIcon>
            Danh sách hàng trong kho

            <!-- Search field -->
            <VSpacer />
            <VTextField
              v-model="search"
              density="compact"
              placeholder="Tìm kiếm sản phẩm..."
              append-inner-icon="bx-search"
              hide-details
              variant="outlined"
              style="max-inline-size: 300px;"
            />
          </VCardTitle>

          <VCardText class="mt-3">
            <VDataTable
              :headers="headers"
              :items="productList"
              :items-per-page="10"
              :search="search"
            >
              <template #item.quantity="{ item }">
                <span
                  :class="item.quantity < 10 ? 'text-error' : 'text-success'"
                >
                  {{ item.quantity }}
                </span>
              </template>

              <template #item.action="{ item }">
                <IconBtn @click="router.push(`../product-info/${item.id}`)">
                  <VTooltip activator="parent" location="top"
                    >Xem chi tiết</VTooltip
                  >
                  <VIcon icon="bx-info-circle" />
                </IconBtn>

                <IconBtn @click="openEditDialog(item)">
                  <VTooltip activator="parent" location="top"
                    >Sửa số lượng</VTooltip
                  >
                  <VIcon icon="bx-edit" color="success" />
                </IconBtn>

                <IconBtn @click="openDeleteDialog(item.id, item.name)">
                  <VTooltip activator="parent" location="top"
                    >Xóa khỏi kho</VTooltip
                  >
                  <VIcon color="error" icon="bx-trash" />
                </IconBtn>
              </template>

              <template #no-data>
                <p class="text-center py-3">Không có sản phẩm nào trong kho</p>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCardText>
    </VCard>

    <!-- Edit Product Dialog -->
    <VDialog v-model="editDialog" max-width="600px">
      <VCard title="Cập nhật số lượng sản phẩm">
        <VCardText>
          <VForm @submit.prevent="saveEdit">
            <VRow>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.name"
                  label="Tên sản phẩm"
                  readonly
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VTextField
                  v-model="editedItem.id"
                  label="Mã sản phẩm"
                  readonly
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model.number="editedItem.quantity"
                  label="Số lượng"
                  type="number"
                  :rules="[requiredValidator]"
                  min="0"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn color="gray" variant="outlined" @click="closeEdit">
            <VIcon icon="bx-x" class="me-1"></VIcon>
            Hủy bỏ
          </VBtn>
          <VBtn color="success" variant="elevated" @click="saveEdit">
            <VIcon icon="bx-save" class="me-1"></VIcon>
            Lưu lại
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Delete Product Dialog -->
    <VDialog v-model="deleteDialog" max-width="500px">
      <VCard title="Xóa sản phẩm khỏi kho">
        <VCardText>
          <p>
            Bạn có chắc chắn muốn xóa sản phẩm
            <strong>{{ deleteProductName }}</strong> khỏi kho không?
          </p>
          <p class="text-caption text-error">
            Lưu ý: Thao tác này sẽ đặt số lượng sản phẩm về 0 và xóa khỏi danh
            sách kho.
          </p>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            variant="outlined"
            color="secondary"
            @click="deleteDialog = false"
          >
            Bỏ qua
          </VBtn>
          <VBtn color="error" variant="outlined" @click="deleteItem">
            Xác nhận xóa
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Update Product Dialog -->
    <VDialog v-model="updateDialog" max-width="600px">
      <VCard title="Cập nhật sản phẩm trong kho">
        <VCardText>
          <VForm @submit.prevent="saveUpdate">
            <VRow>
              <VCol cols="12" sm="6">
                <VAutocomplete
                  v-model="updateItem.name"
                  label="Tên sản phẩm"
                  :items="productNames"
                  :rules="[requiredValidator]"
                  clearable
                  autocomplete="off"
                  @update:model-value="
                    (val) => {
                      if (!val) {
                        updateItem.id = '';
                      }
                    }
                  "
                />
              </VCol>

              <VCol cols="12" sm="6">
                <VAutocomplete
                  v-model="updateItem.id"
                  label="Mã sản phẩm"
                  :items="productIds"
                  :rules="[requiredValidator]"
                  clearable
                  autocomplete="off"
                  @update:model-value="
                    (val) => {
                      if (!val) {
                        updateItem.name = '';
                      }
                    }
                  "
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model.number="updateItem.quantity"
                  label="Số lượng"
                  type="number"
                  :rules="[requiredValidator]"
                  min="1"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn color="gray" variant="outlined" @click="updateDialog = false">
            <VIcon icon="bx-x" class="me-1"></VIcon>
            Hủy bỏ
          </VBtn>
          <VBtn color="success" variant="elevated" @click="saveUpdate">
            <VIcon icon="bx-save" class="me-1"></VIcon>
            Cập nhật
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Floating Action Button -->
    <div class="dock-div">
      <VBtn class="dock-button me-2" disabled color="success">
        <VIcon icon="bx-upload" class="me-2" />
        Upload csv
      </VBtn>
      <VBtn @click="openUpdateDialog" class="dock-button" color="primary">
        <VIcon icon="bx-refresh" class="me-2" />
        Cập nhật sản phẩm
      </VBtn>
    </div>
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
