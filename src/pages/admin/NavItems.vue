<script lang="ts" setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <VerticalNavLink
    :item="{
      title: 'Thuật toán',
      icon: 'bx-code-alt',
      to: '/admin/algorithm',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Thống kê',
      icon: 'bx-bar-chart-alt',
      to: '/admin/statistic',
    }"
  />
</template>
