<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  value: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  copyable: {
    type: Boolean,
    default: true,
  },
});

const isCopied = ref(false);

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.value ?? "").then(() => {
    isCopied.value = true;
    setTimeout(() => (isCopied.value = false), 2000); // Reset trạng thái "Đã copy" sau 2 giây
  });
};
</script>

<template>
  <VTextField
    :append-inner-icon="isCopied ? 'bx-check' : 'bx-copy'"
    @click:append-inner="copyToClipboard"
    readonly
    variant="underlined"
    :loading="props.loading"
    class="wrap-text"
  >
    <div class="text-button wrap-text" style="color: black; opacity: 1;">
      {{ props.value }}
    </div>
  </VTextField>
</template>

<style scoped>
.wrap-text {
  overflow-wrap: break-word; /* Hỗ trợ ngắt dòng cho các trình duyệt hiện đại */
  white-space: normal; /* Cho phép ngắt dòng */
  white-space: pre-wrap;
  word-wrap: break-word; /* Ngắt dòng khi từ quá dài */
}
</style>
