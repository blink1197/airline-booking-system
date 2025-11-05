<script setup>
import { cabinTypes } from '@/data/flights'
import { useAirportsStore } from '@/stores/airports'
import { useFlightSearchStore } from '@/stores/flightSearch'
import { formatDateReadable } from '@/utils/date'
import { Modal } from 'bootstrap'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import DropdownComponent from '../ui/DropdownComponent.vue'
import DatePicker from './DatePicker.vue'
import DestinationSelect from './DestinationSelect.vue'

const router = useRouter()
const { airports } = useAirportsStore();
const flightStore = useFlightSearchStore()
const { tripType, from, to, departureDate, returnDate, pax, cabin } = storeToRefs(flightStore)
const totalPassengers = computed(() => pax.value.adults + pax.value.children + pax.value.infants)

// Modal reference
let modalInstance = null
const modalEl = ref(null)

// Form state
const form = reactive({
  tripType: flightStore.tripType,
  from: flightStore.from,
  to: flightStore.to,
  departureDate: flightStore.departureDate,
  returnDate: flightStore.returnDate,
  pax: flightStore.pax,
  cabin: flightStore.cabin,
});

const isReturnDateDisabled = ref(flightStore.tripType === 'oneWayTrip');

watch(
  () => form.tripType,
  (val) => {
    isReturnDateDisabled.value = val === 'oneWayTrip';
    if (val === 'oneWayTrip') {
      form.returnDate = '';
    }
  }
);

onMounted(() => {
  if (modalEl.value) {
    modalInstance = new Modal(modalEl.value)
  }
})

function openModal() {
  modalInstance?.show()
}

function increment(key) {
  form.pax[key]++
}

function decrement(key) {
  if (form.pax[key] > 0) form.pax[key]--
}


async function handleSubmit() {
  // Update store
  flightStore.setFlightSearchData({
    ...form,
    flightType: form.to.country === form.from.country ? 'domestic' : 'international'
  });

  //Search for flights
  const success = await flightStore.searchFlights();

  if (success) {
    modalInstance?.hide();
  }
}
</script>

<template>
  <div class="py-3 row mx-0 text-white bg-primary rounded-3">
    <div class="col-8">
      <div class="d-flex gap-3 align-items-center flex-wrap">
        <!-- From airport -->
        <div class="text-center text-md-start">
          <p class="m-0 normal-text-bold">{{ from?.airportId }}</p>
          <p class="m-0 extra-small-text-regular text-break d-none d-md-block">{{ from?.name }}</p>
        </div>

        <!-- Arrow icon -->
        <i class="bi bi-airplane fs-4 rotate-90"></i>

        <!-- To airport -->
        <div class="text-center text-md-start">
          <p class="m-0 normal-text-bold">{{ to?.airportId }}</p>
          <p class="m-0 extra-small-text-regular text-break d-none d-md-block">{{ to?.name }}</p>
        </div>
      </div>
      <span>
        <p class="m-0 fw-light small-text">
          {{ formatDateReadable(departureDate) }}
          {{ returnDate ? ` - ${formatDateReadable(returnDate)}` : '' }}
        </p>
      </span>
      <span class="d-flex gap-3 fw-light align-items-center small-text">
        <p class="m-0">{{ tripType === 'oneWayTrip' ? 'One way' : 'Round trip' }}</p>
        <p class="m-0">{{ cabin }}</p>
        <p class="m-0">{{ totalPassengers }} Pax</p>
      </span>
    </div>

    <div class="col-4 d-flex justify-content-end align-items-center">
      <button class="btn btn-secondary float-end" @click="openModal">
        Modify
      </button>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modifyModal" tabindex="-1" aria-labelledby="modifyModalLabel" aria-hidden="true"
    ref="modalEl">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary medium-text-bold" id="modifyModalLabel">Modify Search</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <!-- Trip Type -->
            <div class="col-12 d-flex gap-4">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="oneWayTrip" value="oneWayTrip"
                  v-model="form.tripType" />
                <label class="form-check-label" for="oneWayTrip">One Way</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="roundTrip" value="roundTrip" v-model="form.tripType" />
                <label class="form-check-label" for="roundTrip">Round Trip</label>
              </div>
            </div>

            <!-- Departure -->
            <div class="col-12 col-md-6 mt-2">
              <DestinationSelect label="Departure" v-model="form.from" :options="airports" placeholder="From" />
            </div>

            <!-- Destination -->
            <div class="col-12 col-md-6 mt-2">
              <DestinationSelect label="Destination" v-model="form.to" :options="airports" placeholder="To" />
            </div>

            <!-- Departure Date -->
            <div class="col-12 col-md-6 mt-2">
              <DatePicker label="Departure Date" v-model="form.departureDate" />
            </div>

            <!-- Return Date -->
            <div class="col-12 col-md-6 mt-2">
              <DatePicker label="Return Date" v-model="form.returnDate" :is-disabled="isReturnDateDisabled" />
            </div>

            <!-- Passengers -->
            <div class="col-6 col-md-6 mt-2">
              <label class="form-label fw-semibold">Passengers</label>
              <div v-for="(count, key) in form.pax" :key="key"
                class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-capitalize">{{ key }}</span>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" type="button" @click="decrement(key)">-</button>
                  <span class="px-3 pt-1">{{ count }}</span>
                  <button class="btn btn-outline-primary btn-sm" type="button" @click="increment(key)">+</button>
                </div>
              </div>
            </div>
            <!-- Cabin -->
            <div class="col-4 col-md-3 mt-2">
              <DropdownComponent label="Cabin Class" v-model="form.cabin" :items="cabinTypes" />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="flightStore.isSearching">
            <span v-if="flightStore.isSearching">Updating...</span>
            <span v-else>Apply</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.rotate-90 {
  transform: rotate(90deg);
  display: inline-block;
}
</style>
