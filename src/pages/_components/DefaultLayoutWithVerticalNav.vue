<script lang="ts" setup>
import UserProfile from "./UserProfile.vue";
import Footer from "./Footer.vue";
import NavbarThemeSwitcher from "./NavbarThemeSwitcher.vue";

import logo from "@images/logo.svg?raw";
import VerticalNavLayout from "@layouts/components/VerticalNavLayout.vue";

// Components
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Search -->

        <div
          class="d-flex align-center cursor-pointer ms-lg-n3"
          style="user-select: none"
        >
          <!-- 👉 Search Trigger button -->
          <IconBtn>
            <VIcon icon="bx-search" />
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled ms-2">
            <span class="me-2">Search</span>
            <span class="meta-key">&#8984;K</span>
          </span>
        </div>

        <VSpacer />

        <IconBtn>
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-1" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <div class="mb-12 d-flex align-center justify-end">
        <RouterLink class="app-logo app-title-wrapper" to="/">
          <!-- eslint-disable vue/no-v-html -->
          <div class="d-flex" v-html="logo" />
          <!-- eslint-enable -->

          <h1 class="app-logo-title">Ugh..</h1>
        </RouterLink>

        <IconBtn
          class="d-block d-lg-none"
          @click="toggleIsOverlayNavActive(false)"
        >
          <!-- <VIcon icon="bx-x" /> -->
        </IconBtn>
      </div>
    </template>

    <template #vertical-nav-content>
      <slot name="nav" />
    </template>

    <!-- 👉 Pages -->
    <slot name="main" />

    <!-- 👉 Footer -->
    <template #footer>
      <!-- <Footer /> -->
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>
