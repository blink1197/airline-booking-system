<template>
  <nav class="container px-0">
    <div class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img class="img-fluid" src="../../assets/images/logo_dark.png" alt="Flyx Logo" height="44">
        </router-link>

        <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarNavAltMarkup"
          :aria-expanded="visible.toString()" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Smooth height transition -->
        <div ref="menu" class="navbar-collapse" :class="{ show: visible }" :style="{ height: menuHeight }"
          id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto gap-3">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/about">About</router-link>
            <router-link class="nav-link" to="/contact">Contact</router-link>
            <router-link class="nav-link" to="/login">Sign In</router-link>
            <router-link class="btn btn-primary" to="/register" role="button">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const visible = ref(false)
const menu = ref(null)
const menuHeight = ref('0px')

function toggleNavbar() {
  visible.value = !visible.value
  nextTick(() => {
    if (visible.value) {
      menuHeight.value = menu.value.scrollHeight + 'px' // expand smoothly
    } else {
      menuHeight.value = '0px' // collapse smoothly
    }
  })
}
</script>

<style scoped>
nav .nav-link {
  color: var(--color-gray-3) !important;
  transition: color 0.3s ease;
}

nav .nav-link:hover {
  color: var(--color-primary) !important;
}

/* Smooth height animation */
.navbar-collapse {
  overflow: hidden;
  transition: height 0.3s ease;
}
</style>
