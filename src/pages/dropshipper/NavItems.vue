<script lang="ts" setup>
import VerticalNavGroup from "@layouts/components/VerticalNavGroup.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
</script>

<template>
  <div>
    <!-- 👉 Dashboards -->
    <VerticalNavLink
      :item="{
        title: 'Tổng quan',
        icon: 'bxs-dashboard',
        to: '/dropshipper/general',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Nhà cung cấp',
        icon: 'bx-package',
        to: '/dropshipper/supplier',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Mặt hàng',
        icon: 'bx-package',
        to: '/dropshipper/product',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Kho hàng',
        icon: 'bx-buildings',
        to: '/dropshipper/warehouse',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Đăng ký',
        icon: 'bx-registered',
        to: '/dropshipper/registration',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Đơn hàng',
        icon: 'bx-receipt',
        to: '/dropshipper/order',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Thống kê',
        icon: 'bx-bar-chart-alt',
        to: '/dropshipper/statistic',
      }"
    />

    <VerticalNavGroup
      :item="{
        title: 'Chuyển trang giữa Role',
        icon: 'bx-bar-chart-alt',
      }"
    >
      <VerticalNavLink
        :item="{
          title: 'Nhà cung cấp',
          to: '/supplier',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Bên vận chuyển',
          to: '/carrier',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Cửa hàng',
          to: '/dropshipper',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Quản trị viên',
          to: '/admin',
        }"
      />
    </VerticalNavGroup>
  </div>
</template>
