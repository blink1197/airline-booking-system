<template>
  <div class="py-3 px-3 d-flex gap-2 sticky-bottom-btn flex-md-row justify-content-md-end">
    <!-- Primary Button -->
    <router-link :to="primaryLink" class="btn btn-primary w-100 p-2 order-md-2 order-2"
      :class="{ 'disabled': isPrimaryDisabled }">
      {{ primaryText }}
    </router-link>

    <!-- Secondary Button (conditionally rendered) -->
    <router-link v-if="showSecondary" :to="secondaryLink" class="btn btn-secondary w-100 p-2 ">
      {{ secondaryText }}
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  primaryText: {
    type: String,
    default: 'Continue',
  },
  primaryLink: {
    type: [String, Object],
    required: true,
  },
  secondaryText: {
    type: String,
    default: 'Back',
  },
  secondaryLink: {
    type: [String, Object],
    default: null,
  },
  showSecondary: {
    type: Boolean,
    default: true,
  },
  isPrimaryDisabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.sticky-bottom-btn {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 1rem;
  z-index: 100;
}

@media (min-width: 992px) {
  .btn {
    max-width: 25%;
  }
}

.router-link.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
