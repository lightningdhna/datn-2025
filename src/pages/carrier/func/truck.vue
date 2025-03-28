<script setup lang="ts">
import MyDatePicker from "@/components/MyDatePicker.vue";
import type { CustomerOrder } from "@/models/order";
import { wrap } from "module";
import { text } from "stream/consumers";

const search = ref("");
const deleteDialog = ref(false);
const editDialog = ref(false);
const newDialog = ref(false);

const editedItem = ref<
  | {
      truckName: string;
      id: string;
      truckType: string;
      addedDate: Date;
      volume: number;
      weight: number;
      averageSpeed: number;
      status: string;
    }
  | undefined
>();

const editedIndex = ref(-1);

const newItem = ref<
  | {
      truckName: string;
      id: string;
      truckType: string;
      addedDate: Date;
      volume: number;
      weight: number;
      averageSpeed: number;
      status: string;
    }
  | undefined
>();

// const firstDate = ref<Date | null>(null);
// const lastDate = ref<Date | null>(null);

const truckList = ref([
  {
    truckName: "Xe tải A",
    id: "TRK001", // Thay truckCode thành id
    truckType: "Xe tải nhẹ",
    addedDate: new Date("2025-03-01"),
    volume: 15, // Thể tích (m3)
    weight: 3000, // Khối lượng (kg)
    averageSpeed: 60, // Vận tốc trung bình (km/h)
    status: "active", // Trạng thái hoạt động
  },
  {
    truckName: "Xe tải B",
    id: "TRK002", // Thay truckCode thành id
    truckType: "Xe tải trung",
    addedDate: new Date("2025-03-05"),
    volume: 25,
    weight: 5000,
    averageSpeed: 55,
    status: "inactive",
  },
  {
    truckName: "Xe tải C",
    id: "TRK003", // Thay truckCode thành id
    truckType: "Xe tải nặng",
    addedDate: new Date("2025-03-10"),
    volume: 40,
    weight: 8000,
    averageSpeed: 50,
    status: "active",
  },
  {
    truckName: "Xe tải D",
    id: "TRK004", // Thay truckCode thành id
    truckType: "Xe container",
    addedDate: new Date("2025-03-15"),
    volume: 60,
    weight: 12000,
    averageSpeed: 45,
    status: "inactive",
  },
  {
    truckName: "Xe tải E",
    id: "TRK005", // Thay truckCode thành id
    truckType: "Xe tải nhẹ",
    addedDate: new Date("2025-03-20"),
    volume: 10,
    weight: 2000,
    averageSpeed: 65,
    status: "active",
  },
  {
    truckName: "Xe tải F",
    id: "TRK006", // Thay truckCode thành id
    truckType: "Xe tải trung",
    addedDate: new Date("2025-03-25"),
    volume: 30,
    weight: 6000,
    averageSpeed: 55,
    status: "inactive",
  },
  {
    truckName: "Xe tải G",
    id: "TRK007", // Thay truckCode thành id
    truckType: "Xe tải nặng",
    addedDate: new Date("2025-03-30"),
    volume: 50,
    weight: 10000,
    averageSpeed: 50,
    status: "active",
  },
  {
    truckName: "Xe tải H",
    id: "TRK008", // Thay truckCode thành id
    truckType: "Xe container",
    addedDate: new Date("2025-04-01"),
    volume: 70,
    weight: 15000,
    averageSpeed: 40,
    status: "inactive",
  },
  {
    truckName: "Xe tải I",
    id: "TRK009", // Thay truckCode thành id
    truckType: "Xe tải nhẹ",
    addedDate: new Date("2025-04-05"),
    volume: 12,
    weight: 2500,
    averageSpeed: 60,
    status: "active",
  },
  {
    truckName: "Xe tải J",
    id: "TRK010", // Thay truckCode thành id
    truckType: "Xe tải trung",
    addedDate: new Date("2025-04-10"),
    volume: 28,
    weight: 5500,
    averageSpeed: 55,
    status: "inactive",
  },
  {
    truckName: "Xe tải K",
    id: "TRK011", // Thay truckCode thành id
    truckType: "Xe tải nặng",
    addedDate: new Date("2025-04-15"),
    volume: 45,
    weight: 9000,
    averageSpeed: 50,
    status: "active",
  },
  {
    truckName: "Xe tải L",
    id: "TRK012", // Thay truckCode thành id
    truckType: "Xe container",
    addedDate: new Date("2025-04-20"),
    volume: 80,
    weight: 16000,
    averageSpeed: 40,
    status: "inactive",
  },
  {
    truckName: "Xe tải M",
    id: "TRK013", // Thay truckCode thành id
    truckType: "Xe tải nhẹ",
    addedDate: new Date("2025-04-25"),
    volume: 14,
    weight: 2800,
    averageSpeed: 65,
    status: "active",
  },
  {
    truckName: "Xe tải N",
    id: "TRK014", // Thay truckCode thành id
    truckType: "Xe tải trung",
    addedDate: new Date("2025-04-30"),
    volume: 32,
    weight: 6400,
    averageSpeed: 55,
    status: "inactive",
  },
  {
    truckName: "Xe tải O",
    id: "TRK015", // Thay truckCode thành id
    truckType: "Xe tải nặng",
    addedDate: new Date("2025-05-05"),
    volume: 55,
    weight: 11000,
    averageSpeed: 50,
    status: "active",
  },
  {
    truckName: "Xe tải P",
    id: "TRK016", // Thay truckCode thành id
    truckType: "Xe container",
    addedDate: new Date("2025-05-10"),
    volume: 90,
    weight: 18000,
    averageSpeed: 40,
    status: "inactive",
  },
  {
    truckName: "Xe tải Q",
    id: "TRK017", // Thay truckCode thành id
    truckType: "Xe tải nhẹ",
    addedDate: new Date("2025-05-15"),
    volume: 18,
    weight: 3600,
    averageSpeed: 60,
    status: "active",
  },
  {
    truckName: "Xe tải R",
    id: "TRK018", // Thay truckCode thành id
    truckType: "Xe tải trung",
    addedDate: new Date("2025-05-20"),
    volume: 35,
    weight: 7000,
    averageSpeed: 55,
    status: "inactive",
  },
  {
    truckName: "Xe tải S",
    id: "TRK019", // Thay truckCode thành id
    truckType: "Xe tải nặng",
    addedDate: new Date("2025-05-25"),
    volume: 60,
    weight: 12000,
    averageSpeed: 50,
    status: "active",
  },
  {
    truckName: "Xe tải T",
    id: "TRK020", // Thay truckCode thành id
    truckType: "Xe container",
    addedDate: new Date("2025-05-30"),
    volume: 100,
    weight: 20000,
    averageSpeed: 40,
    status: "inactive",
  },
]);

// headers
const headers = [
  { title: "Tên xe", key: "truckName" },
  { title: "Biển số xe", key: "id" },
  { title: "Loại xe", key: "truckType" },
  { title: "Ngày thêm", key: "addedDate" },
  { title: "Thể tích (m³)", key: "volume" },
  { title: "Khối lượng (kg)", key: "weight" },
  {
    title: "Vận tốc trung bình (km/h)",
    key: "averageSpeed",
    maxWidth: "150px",
  },
  { title: "Trạng thái", key: "status" },

  { title: "", key: "actions", sortable: false },
];

const selectedItem = ref<string>("");

// 👉 methods
const clickDelete = async (itemId: string) => {
  selectedItem.value = itemId.toString();
  deleteDialog.value = true;
};

const deleteItem = async () => {
  if (!truckList.value) return;

  const index = truckList.value.findIndex(
    (item: any) => item.id === selectedItem.value
  );

  console.log(selectedItem.value);
  await truckList.value.splice(index, 1);
  deleteDialog.value = false;
};

const resolveStatusColor = (status: string) => {
  if (status === "active") return "success";
  if (status === "inactive") return "warning";
};

const resolveStatusText = (status: string) => {
  if (status === "active") return "Đang hoạt động";
  if (status === "inactive") return "Bảo dưỡng";
};

const formatDate = (date: Date | null) => {
  if (!date) return "Không có dữ liệu";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Ngày không hợp lệ"; // Xử lý khi giá trị không phải là ngày hợp lệ
  }

  const month = parsedDate.toLocaleString("vi-VN", { month: "long" });
  const year = parsedDate.getFullYear();

  return ` ${month}/${year}`;
};

const editItem = (item: any) => {
  editedIndex.value = truckList.value.indexOf(item);
  editedItem.value = { ...item };
  editDialog.value = true;
};

const close = () => {
  editDialog.value = false;
  editedIndex.value = -1;
  // editedItem.value = null;
};

const save = () => {
  if (!editedItem.value) return close(); // Nếu không có dữ liệu, chỉ đóng dialog

  if (editedIndex.value > -1) {
    // Nếu đang chỉnh sửa, cập nhật mục trong danh sách
    Object.assign(truckList.value[editedIndex.value], editedItem.value);
  }

  close(); // Đóng dialog
};

const addNewTruck = () => {
  newItem.value = {
    truckName: "",
    id: "",
    truckType: "",
    addedDate: new Date(),
    volume: 0,
    weight: 0,
    averageSpeed: 0,
    status: "active",
  };
  newDialog.value = true;
};

const saveNewTruck = () => {
  if (!newItem.value) return close(); // Nếu không có dữ liệu, chỉ đóng dialog

  truckList.value.unshift(newItem.value);
  newDialog.value = false;
};

const closeNewTruck = () => {
  newDialog.value = false;
};

const requiredValidator = (value: string | null | undefined) => {
  return !!value || "Trường này là bắt buộc";
};
</script>

<template>
  <VCardItem class="pb-3">
    <VCardTitle class="text-primary">
      <VIcon icon="bxs-truck"></VIcon>
      Danh sách xe tải
    </VCardTitle>
  </VCardItem>
  <div>
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
      :items="truckList"
      :search="search"
      :items-per-page="10"
    >
      <!-- Tùy chỉnh tiêu đề cho cột averageSpeed -->
      <template #header.averageSpeed="{ column }">
        <div class="text-wrap">Vận tốc trung bình (km/h)</div>
      </template>
      <template #item.addedDate="{ item }">
        <p class="mi-1">
          {{ formatDate(item.addedDate) }}
        </p>
      </template>
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
      <!-- Delete -->
      <template #item.actions="{ item }">
        <IconBtn @click="editItem(item)">
          <VIcon icon="bx-edit" />
        </IconBtn>
        <IconBtn @click="clickDelete(item.id)">
          <VIcon icon="bx-trash" />
        </IconBtn>
      </template>
    </VDataTable>
  </div>

  <!-- 👉 Edit Dialog  -->
  <VDialog v-model="editDialog" max-width="600px">
    <VCard title="Edit Item">
      <VCardText>
        <div class="text-body-1 mb-6">
          Biển số xe: <span class="text-h6">{{ editedItem?.id }}</span>
        </div>
        <VFrom @submit.prevent>
          <VRow>
            <!-- fullName -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="editedItem!.truckName"
                label="Tên xe"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="editedItem!.truckType"
                label="Loại xe"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <MyDatePicker
                v-model="editedItem!.addedDate"
                label="Ngày thêm"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="editedItem!.weight"
                label="Khối lượng chở tối đa"
                :rules="[requiredValidator]"
                suffix="Kg"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="editedItem!.volume"
                label="Thể tích "
                :rules="[requiredValidator]"
                suffix="m³"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="editedItem!.averageSpeed"
                label="Vận tốc trung bình "
                :rules="[requiredValidator]"
                suffix="km/h"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VAutocomplete
                v-model="editedItem!.status"
                label="Trạng thái "
                :rules="[requiredValidator]"
                :items="[
                  { value: 'active', text: 'đang hoạt động' },
                  { value: 'inactive', text: 'bảo dưỡng' },
                ]"
                item-value="value"
                item-title="text"
              />
            </VCol>
          </VRow>
        </VFrom>
      </VCardText>

      <VCardText>
        <div class="self-align-end d-flex gap-4 justify-end">
          <VBtn color="error" variant="outlined" @click="close"> Cancel </VBtn>
          <VBtn color="success" variant="elevated" @click="save"> Save </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="deleteDialog" max-width="500px">
    <VCard title="Bạn có muốn xóa thông tin xe này không?">
      <VCardText>
        <div class="d-flex justify-center gap-4">
          <VBtn
            variant="outlined"
            color="secondary"
            @click="() => (deleteDialog = false)"
          >
            Bỏ qua
          </VBtn>
          <VBtn color="error" variant="outlined" @click="deleteItem">
            Xác nhận xóa
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>

  <div class="dock-button">
    <VBtn @click="addNewTruck()">
      <VIcon icon="bx-plus" class="ms-0 me-1" />
      Thêm mới
    </VBtn>
  </div>

  <!-- 👉 new Dialog  -->
  <VDialog v-model="newDialog" max-width="600px">
    <VCard title="Edit Item">
      <VCardText>
        <div class="text-body-1 mb-6">
          <!-- Biển số xe: <span class="text-h6">{{ editedItem?.id }}</span> -->
        </div>
        <VFrom @submit.prevent>
          <VRow>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="newItem!.id"
                label="Biển số xe"
                :rules="[requiredValidator]"
              />
            </VCol>
            <!-- fullName -->
            <VCol cols="12" sm="6">
              <VTextField
                v-model="newItem!.truckName"
                label="Tên xe"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="newItem!.truckType"
                label="Loại xe"
                :rules="[requiredValidator]"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <MyDatePicker
                v-model="newItem!.addedDate"
                label="Ngày thêm"
                :rules="[requiredValidator]"
                :disabled="true"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="newItem!.weight"
                label="Khối lượng chở tối đa"
                :rules="[requiredValidator]"
                suffix="Kg"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="newItem!.volume"
                label="Thể tích "
                :rules="[requiredValidator]"
                suffix="m³"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VTextField
                v-model="newItem!.averageSpeed"
                label="Vận tốc trung bình "
                :rules="[requiredValidator]"
                suffix="km/h"
              />
            </VCol>
            <VCol cols="12" sm="6">
              <VAutocomplete
                v-model="newItem!.status"
                label="Trạng thái "
                :rules="[requiredValidator]"
                :items="[
                  { value: 'active', text: 'đang hoạt động' },
                  { value: 'inactive', text: 'bảo dưỡng' },
                ]"
                item-value="value"
                item-title="text"
              />
            </VCol>
          </VRow>
        </VFrom>
      </VCardText>

      <VCardText>
        <div class="self-align-end d-flex gap-4 justify-end">
          <VBtn color="error" variant="outlined" @click="closeNewTruck">
            Cancel
          </VBtn>
          <VBtn
            color="success"
            type="submit"
            variant="elevated"
            @click="saveNewTruck"
          >
            Save
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.dock-button {
  position: fixed; /* Cố định vị trí */
  top: 100px; /* Cách phía trên 20px */
  right: 50px; /* Cách phía phải 20px */
  z-index: 1000; /* Đảm bảo nút nằm trên các thành phần khác */
  transition: all 0.3s ease; /* Hiệu ứng chuyển động mềm */
}

.dock-button:hover {
  transform: scale(1.1); /* Phóng to nhẹ khi hover */
}
</style>
