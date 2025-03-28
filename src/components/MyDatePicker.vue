<script setup>
import { defineProps, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const { label, color, customClass, rules, variant, density, disabled } =
  defineProps([
    "label",
    "color",
    "customClass",
    "rules",
    "variant",
    "density",
    "disabled", // Thêm thuộc tính disabled
  ]);

const clearDate = () => {
  formattedDate.value = null;
  model.value = null;
  menu.value = false; // Đóng menu nếu đang mở
};

const model = defineModel();
const { width, height, xs } = useDisplay();

const menu = ref(false);
const formattedDate = ref(formatDate(model.value));

const handleDateChange = (newDate) => {
  model.value = newDate;
};

watch(
  () => model.value,
  (newVal) => {
    formattedDate.value = formatDate(newVal);
    menu.value = false;
  }
);
onMounted(() => {
  model.value = model.value ? new Date(model.value) : null;
});

function formatDate(inputDate) {
  if (!inputDate) return "";
  const parsedDate = new Date(inputDate);
  if (!parsedDate.getTime()) return "";

  const day = `0${parsedDate.getDate()}`.slice(-2);
  const month = `0${parsedDate.getMonth() + 1}`.slice(-2);
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}
</script>

<template v-if="formattedDate">
  <VMenu v-model="menu" :close-on-content-click="false" location="center">
    <template #activator="{ props }">
      <VTextField
        v-model="formattedDate"
        clearable
        :class="customClass"
        :density="density"
        :label="label"
        :rules="rules"
        :variant="variant"
        hide-details="auto"
        prepend-inner-icon="bx-calendar"
        readonly
        v-bind="props"
        clear-icon="bx-x"
        @click:clear="clearDate"
      />
    </template>
    <div class="position-relative">
      <VDatePicker
        v-model="model"
        disabled
        :color="color"
        :width="xs ? width - 30 : 'auto'"
        height="auto"
        show-adjacent-months
        title=""
        @update:model-value="handleDateChange"
      />
      <VBtn
        class="position-absolute top-0 right-0"
        color="white"
        icon="mdi-close"
        size="small"
        variant="text"
        @click="menu = false"
      />
    </div>
  </VMenu>
</template>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-inline-size: auto !important;
}

.v-picker-title {
  padding: 0 !important;
}

@media only screen and (max-width: 600px) {
  .v-overlay__content:has(> .v-date-picker) {
    inset-inline-start: 0 !important;
  }
}
</style>
