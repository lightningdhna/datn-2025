<script lang="ts" setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavLink
    :item="{
      title: 'Danh sách kho',
      icon: 'bx-home',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Danh sách sản phẩm',
      icon: 'bx-category',
      target: '_blank',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Thống kê',
      icon: 'bx-bar-chart-alt',
      target: '_blank',
    }"
  />
</template>
