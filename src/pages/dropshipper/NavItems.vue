<script lang="ts" setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavLink
    :item="{
      title: 'Nhà cung cấp',
      icon: 'bx-package',
      to: 'supplier',
    }"
  />  <VerticalNavLink
    :item="{
      title: 'Mặt hàng',
      icon: 'bx-category',
      to: 'product',

    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Đăng ký',
      icon: 'bx-registered',
      to: 'register',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Thống kê',
      icon: 'bx-bar-chart-alt',
      to: 'statistic',
    }"
  />
</template>
