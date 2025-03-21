<script lang="ts" setup>
import VerticalNavGroup from "@/@layouts/components/VerticalNavGroup.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
</script>

<template>
  <div style="width: 100%">
    <VerticalNavLink
        :item="{
          title: 'Nhà cung cấp',
          icon: 'bx-package',
          to: '/carrier/supplier-list',
        }"
      />
    <!-- <VerticalNavGroup
      :item="{
        title: 'Nhà cung cấp',
        icon: 'bx-package',
      }"
    >


      <VerticalNavLink
        :item="{
          title: 'Chờ duyệt',
          icon: 'bx-hourglass',
          to: '/carrier/supplier-pending-list',
        }"
      />
    </VerticalNavGroup> -->

    <VerticalNavLink
      :item="{
        title: 'Kho hàng',
        icon: 'bx-home',
        to: '/carrier/warehouse',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Đội xe',
        icon: 'bxs-truck',
        to: '/carrier/truck',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Đơn vận chuyển',
        icon: 'bx-receipt',
        to: '/carrier/order',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Kế hoạch vận chuyển',
        icon: 'bx-task',
        to: '/carrier/plan',
      }"
    />

    <VerticalNavGroup
      :item="{
        title: 'Thống kê',
        icon: 'bx-bar-chart-alt',
      }"
    >
      <VerticalNavLink
        :item="{
          title: 'Đơn hàng hoàn thành',
          to: '/carrier/statistic-order',
          icon: 'bx-check-circle',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Thống kê vận chuyển',
          to: '/carrier/statistic-truck',
          icon: 'bxs-truck',
        }"
      ></VerticalNavLink>
    </VerticalNavGroup>
  </div>
</template>
