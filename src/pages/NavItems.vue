<script lang="ts" setup>
import VerticalNavGroup from "@/@layouts/components/VerticalNavGroup.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
</script>

<template>
  <div style="width: 100%">
    

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
      <VerticalNavLink
        :item="{
          title: 'Khách hàng',
          to: '/customer',
        }"
      />
    </VerticalNavGroup>
  </div>
</template>
