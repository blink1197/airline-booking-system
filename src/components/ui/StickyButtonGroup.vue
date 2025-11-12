<template>
  <div class="py-3 px-3 d-flex gap-2 sticky-bottom-btn flex-md-row justify-content-md-end">
    <!-- Primary Button -->
    <component :is="primaryFunction ? 'button' : 'router-link'" :to="!primaryFunction ? primaryLink : undefined"
      class="btn btn-primary w-100 p-2 order-md-2 order-2 d-flex align-items-center justify-content-center"
      :disabled="isPrimaryDisabled || isLoading" @click="handlePrimaryClick">
      <!-- Spinner and text -->
      <template v-if="isLoading">
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ primaryLoadingText }}
      </template>
      <template v-else>
        {{ primaryText }}
      </template>
    </component>

    <!-- Secondary Button -->
    <router-link v-if="showSecondary" :to="secondaryLink" class="btn btn-secondary w-100 p-2"
      :class="{ disabled: isSecondaryDisabled }">
      {{ secondaryText }}
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  primaryText: {
    type: String,
    default: 'Continue',
  },
  primaryLink: {
    type: [String, Object],
    default: null,
  },
  primaryFunction: {
    type: Function,
    default: null,
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
    default: false,
  },
  isSecondaryDisabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  primaryLoadingText: {
    type: String,
    default: 'Loading...',
  },
})

function handlePrimaryClick(e) {
  if (props.isPrimaryDisabled || props.isLoading) {
    e.preventDefault()
    return
  }

  if (props.primaryFunction) {
    e.preventDefault()
    props.primaryFunction()
  }
}
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

button:disabled,
.router-link.disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>
