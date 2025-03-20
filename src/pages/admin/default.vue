<script lang="ts" setup>
import DefaultLayoutWithVerticalNav from '../_components/DefaultLayoutWithVerticalNav.vue'
import NavItems from './NavItems.vue'
</script>

<template>
  <DefaultLayoutWithVerticalNav>
    <template #nav>
      <NavItems />
    </template>
    <template #main>
      <RouterView />
    </template>
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
