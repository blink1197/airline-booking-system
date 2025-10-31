<script setup>
import { RouterView } from 'vue-router';
import FooterComponent from './components/layout/FooterComponent.vue';
import NavbarComponent from './components/layout/NavbarComponent.vue';
</script>

<template>
  <header>
    <NavbarComponent />
  </header>

  <RouterView />

  <FooterComponent />
</template>

<style scoped></style>
