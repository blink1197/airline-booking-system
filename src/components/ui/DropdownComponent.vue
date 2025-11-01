<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Dropdown' },
  items: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'select'])

const isOpen = ref(false)

// Make internal reactive selected value mirror parent
const selected = ref(props.modelValue)
watch(() => props.modelValue, val => {
  selected.value = val
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => (isOpen.value = false)

const onSelect = (item) => {
  selected.value = item
  emit('update:modelValue', item) // for v-model
  emit('select', item) // optional event
  close()
}
</script>

<template>
  <div class="dropdown-wrapper" v-click-outside="close">
    <label v-if="label" class="form-label fw-bold">{{ label }}</label>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" @click="toggle">
        {{ selected || label }}
      </button>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li v-for="(item, index) in items" :key="index">
          <a class="dropdown-item" href="#" @click.prevent="onSelect(item)">
            {{ item }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
