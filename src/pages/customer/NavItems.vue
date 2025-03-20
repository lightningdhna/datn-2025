<script lang="ts" setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->

  <VerticalNavLink
    :item="{
      title: 'Mua sắm',
      icon: 'bx-store-alt',
      to: '/customer/shopping',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Giỏ hàng',
      icon: 'bx-cart',
      to: '/customer/cart',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Trạng thái đơn',
      icon: 'bx-receipt',
      to: '/customer/status',
    }"
  />
</template>
