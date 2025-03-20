<script lang="ts" setup>
import VerticalNavGroup from '@/@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <VerticalNavGroup
    :item="{
      title: 'Nhà cung cấp',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Danh sách',
        icon: 'bx-package',
        to: '/carrier/supplier',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Chờ duyệt',
        icon: 'bx-package',
        to: '/carrier/supplier',
      }"
    />
  </VerticalNavGroup>

  <VerticalNavLink
    :item="{
      title: 'Kho hàng',
      icon: 'bx-home',
      to: '/carrier/supplier',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Đội xe',
      icon: 'bx-bus',
      to: '/carrier/truck',
    }"
  />

  <VerticalNavGroup
    :item="{
      title: 'Đơn vận chuyển',
      icon: 'bx-receipt',

    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Danh sách',
        icon: 'bx-package',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Chờ duyệt',
        icon: 'bx-package',
      }"
    />
  </VerticalNavGroup>

  <VerticalNavLink
    :item="{
      title: 'Kế hoạch vận chuyển',
      icon: 'bx-receipt',
      to: '/carrier/plan',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Thống kê',
      icon: 'bx-bar-chart-alt',
      to: '/carrier/statistic',
    }"
  />
</template>
