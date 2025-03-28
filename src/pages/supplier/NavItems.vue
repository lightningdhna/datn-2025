<script lang="ts" setup>
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
import VerticalNavGroup from "@layouts/components/VerticalNavGroup.vue";
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavLink
    :item="{
      title: 'Thông tin chung',
      icon: 'bxs-dashboard',
      to: '/supplier/general',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Danh sách sản phẩm',
      icon: 'bx-category',
      to: '/supplier/product',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Danh sách kho',
      icon: 'bx-home',
      to: '/supplier/warehouse',
    }"
  />
  <VerticalNavGroup
    :item="{
      title: 'Dropshipper',
      icon: 'bx-list-check',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Danh sách dropshipper',
        icon: 'bx-store',
        to: '/supplier/dropshipper-list',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Chờ duyệt',
        icon: 'bx-hourglass',
        to: '/supplier/dropshipper-pending',
      }"
    />
  </VerticalNavGroup>

  <VerticalNavLink
    :item="{
      title: 'Thống kê',
      icon: 'bx-bar-chart-alt',
      to: '/supplier/statistic',
    }"
  />
</template>
