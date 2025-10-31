<template>
  <div class="mb-3">
    <label class="form-label fw-semibold">Passengers & Cabin</label>
    <input type="text" class="form-control" :value="summaryText" readonly @click="openModal" />

    <!-- Modal -->
    <div class="modal fade" id="paxCabinModal" tabindex="-1" aria-labelledby="paxCabinModalLabel" aria-hidden="true"
      ref="modalEl">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paxCabinModalLabel">Select Passengers & Cabin</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label fw-semibold">Passengers</label>

              <div v-for="(count, key) in pax" :key="key"
                class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-capitalize">{{ key }}</span>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" type="button" @click="decrement(key)">-</button>
                  <span class="px-3 pt-1">{{ count }}</span>
                  <button class="btn btn-outline-primary btn-sm" type="button" @click="increment(key)">+</button>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <label class="form-label fw-semibold">Cabin Class</label>
              <select class="form-select cabin-select" v-model="cabin">
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="saveChanges">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Modal } from 'bootstrap'
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const pax = ref({
  adults: 1,
  children: 0,
  infants: 0
})
const cabin = ref('Economy')

const modal = ref(null)
const modalEl = ref(null)

onMounted(() => {
  modal.value = new Modal(modalEl.value)
})

const totalPassengers = computed(() => pax.value.adults + pax.value.children + pax.value.infants)

const summaryText = computed(() => {
  return `${totalPassengers.value} Pax, ${cabin.value}`
})

function openModal() {
  modal.value.show()
}

function increment(key) {
  pax.value[key]++
}

function decrement(key) {
  if (pax.value[key] > 0) pax.value[key]--
}

function saveChanges() {
  modal.value.hide()
  emit('update:modelValue', {
    pax: { ...pax.value },
    cabin: cabin.value
  })
}
</script>

<style scoped>
.btn-group button {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
