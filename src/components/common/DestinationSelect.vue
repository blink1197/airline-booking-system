<template>
  <div class="position-relative">
    <label :for="id" class="form-label fw-semibold">{{ label }}</label>

    <!-- Input Field -->
    <input type="text" class="form-control" :id="id" v-model="searchTerm" :placeholder="placeholder"
      @focus="isOpen = true" @blur="closeDropdown" @input="filterOptions" />

    <!-- Dropdown List -->
    <ul v-if="isOpen && filteredOptions.length > 0" class="list-group position-absolute w-100 mt-1 z-3"
      style="max-height: 220px; overflow-y: auto;">
      <li v-for="option in filteredOptions" :key="option.airportId" class="list-group-item list-group-item-action"
        :class="{ active: option.airportId === selectedValue?.airportId }" @mousedown.prevent="selectOption(option)">
        <div class="fw-semibold">
          {{ option.city }} - {{ option.airportId }}
        </div>
        <div class="small fw-light">
          {{ option.name }}, {{ option.country }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: () => `combo-${Math.random().toString(36).slice(2, 8)}`
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Object,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Type or select destination'
  }
})

const emit = defineEmits(['update:modelValue'])

const searchTerm = ref('')
const isOpen = ref(false)
const filteredOptions = ref([...props.options])
const selectedValue = ref(props.modelValue)

// --- Watch for external v-model changes ---
watch(
  () => props.modelValue,
  (val) => {
    selectedValue.value = val
    if (val) {
      searchTerm.value = `${val.city} — ${val.airportId}`
    } else {
      searchTerm.value = ''
    }
  },
  { immediate: true }
)

function filterOptions() {
  const term = searchTerm.value.toLowerCase()
  filteredOptions.value = props.options.filter(opt =>
    `${opt.city} ${opt.country} ${opt.name} ${opt.airportId}`
      .toLowerCase()
      .includes(term)
  )
}

function selectOption(option) {
  searchTerm.value = `${option.city} — ${option.airportId}`
  selectedValue.value = option
  emit('update:modelValue', option)
  isOpen.value = false
}

function closeDropdown() {
  setTimeout(() => (isOpen.value = false), 150)
}
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}

.list-group-item.active {
  background-color: var(--bs-primary);
  color: white;
}

.list-group-item .small {
  font-size: 0.85rem;
}
</style>
