<script setup>
import BaseModal from '@/components/common/BaseModal.vue';
import FlightListItem from '@/components/common/FlightListItem.vue';
import FlightSearchModifier from '@/components/common/FlightSearchModifier.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import AirPlaneLandingIcon from '@/components/icons/AirPlaneLandingIcon.vue';
import AirPlaneTakeOffIcon from '@/components/icons/AirPlaneTakeOffIcon.vue';
import StickyButtonGroup from '@/components/ui/StickyButtonGroup.vue';
import { useFlightSearchStore } from '@/stores/flightSearch';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const flightStore = useFlightSearchStore()
const { flights, isSearching, error, selectedFlight } = storeToRefs(flightStore)

const filterAndSortModal = ref(null);

function showFilterAndSortModal() {
  filterAndSortModal.value.open()
}

const showFilter = ref(true)
const showSort = ref(true)
const minPrice = ref(0);
const maxPrice = ref(200000);

watch(minPrice, (val) => {
  if (val > maxPrice.value - 1000) {
    minPrice.value = maxPrice.value - 1000;
  }
});

watch(maxPrice, (val) => {
  if (val < minPrice.value + 1000) {
    maxPrice.value = minPrice.value + 1000;
  }
});

function toggleFilter() {
  showFilter.value = !showFilter.value
}

function toggleSort() {
  showSort.value = !showSort.value
}

</script>

<template>
  <div class="container-fluid d-flex flex-column p-0 flight flights-page">
    <div class="container-fluid px-2 pt-1 pb-2">
      <!-- Progress -->
      <ProgressBar title="Flights" :steps="5" :currentStep="1" />

      <div class="container flights-results-container">
        <!-- Modify search -->
        <FlightSearchModifier />

        <!-- Filters header -->
        <div class="mx-1 mt-1 mb-3 py-2 d-flex justify-content-between align-items-center smaller-text"
          v-if="flights.length !== 0">
          <span class="d-flex gap-1 justify-content-between align-items-center cursor-pointer"
            @click="showFilterAndSortModal">
            <i class="bi bi-funnel"></i>
            Filters
          </span>
          <span class="cursor-pointer" @click="showFilterAndSortModal">Sort by: Earliest first</span>
        </div>

        <!-- Results -->
        <div class="list-group">
          <div v-if="isSearching" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 small">Searching flights...</p>
          </div>

          <div v-else-if="error" class="alert alert-danger text-center mt-2">
            {{ error }}. Please try again.
          </div>

          <div v-else-if="flights.length === 0" class="text-center py-5">
            <p class="text-muted">No flights found.</p>
          </div>

          <FlightListItem v-else v-for="(flight, index) in flights" :key="flight.flightNumber" :flightData="flight"
            :index="index" />
        </div>
      </div>
    </div>

    <!-- Sticky Button -->
    <StickyButtonGroup primaryText="Continue" primaryLink="/guests" secondaryText="Back" :showSecondary="false"
      v-if="flights.length !== 0" :isPrimaryDisabled="!selectedFlight" />
  </div>

  <BaseModal ref="filterAndSortModal" title="Filter and Sort">
    <template #body>
      <!-- Filter by -->
      <div class=" py-2">
        <div class="d-flex justify-content-between align-items-center cursor-pointer" @click="toggleFilter">
          <h6 class="mb-0 fw-bold fs-5">Filter by</h6>
          <i class="bi" :class="showFilter ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
        </div>

        <transition name="collapse">
          <div v-if="showFilter" class="mt-2">
            <!-- Time of flight -->
            <div class="mt-4">
              <p class="m-0 mb-2">Time of flight</p>
            </div>

            <div class="btn-group w-100 mb-2" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
              <label class="btn btn-outline-primary w-50 d-flex align-items-center justify-content-center gap-1"
                for="btnradio1">
                <AirPlaneTakeOffIcon width="18" height="12" />
                Departure
              </label>

              <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
              <label class="btn btn-outline-primary w-50 d-flex align-items-center justify-content-center gap-1"
                for="btnradio2">
                <AirPlaneLandingIcon width="18" height="12" />
                Arrival
              </label>
            </div>

            <!-- Time options -->
            <div class="form-check">
              <input class="form-check-input" type="radio" id="12to6AM" name="timeOfFlight" />
              <label class="form-check-label" for="12to6AM">12:00 AM - 06:00 AM</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="6to12PM" name="timeOfFlight" />
              <label class="form-check-label" for="6to12PM">06:01 AM - 12:00 PM</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="12to6PM" name="timeOfFlight" />
              <label class="form-check-label" for="12to6PM">12:01 PM - 06:00 PM</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="6to12AM" name="timeOfFlight" />
              <label class="form-check-label" for="6to12AM">06:01 PM - 11:59 PM</label>
            </div>

            <!-- Price range -->
            <div class="mt-4 mb-4">
              <h6 class="mb-3">Price range</h6>

              <div class="position-relative" style="height: 20px;">
                <!-- Min slider -->
                <input type="range" class="form-range slider-min position-absolute top-0 start-0 w-100" min="0"
                  max="200000" step="1000" v-model.number="minPrice" :max="maxPrice - 1000" />

                <!-- Max slider -->
                <input type="range" class="form-range slider-max position-absolute top-0 start-0 w-100" min="0"
                  max="200000" step="1000" v-model.number="maxPrice" :min="minPrice + 1000"
                  style="background: transparent;" />
              </div>

              <div class="d-flex justify-content-between">
                <span>₱{{ minPrice.toLocaleString() }}</span>
                <span>₱{{ maxPrice.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Sort by -->
      <div class="py-2 mt-4">
        <div class="d-flex justify-content-between align-items-center cursor-pointer" @click="toggleSort">
          <h6 class="mb-0 fw-bold fs-5">Sort by</h6>
          <i class="bi" :class="showSort ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
        </div>

        <transition name="collapse">
          <div v-if="showSort" class="mt-2">
            <!-- Your sort controls go here -->
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sortOptions" id="departureEarliest" checked />
              <label class="form-check-label" for="departureEarliest">
                Departure: Earliest first
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sortOptions" id="arrivalEarliest" />
              <label class="form-check-label" for="arrivalEarliest">
                Arrival: Earliest first
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sortOptions" id="durationShortest" />
              <label class="form-check-label" for="durationShortest">
                Flight duration: Shortest first
              </label>
            </div>

            <div class="form-check">
              <input class="form-check-input" type="radio" name="sortOptions" id="priceCheapest" />
              <label class="form-check-label" for="priceCheapest">
                Price: Lowest first
              </label>
            </div>
          </div>
        </transition>
      </div>
    </template>
  </BaseModal>
</template>


<style scoped>
.flights-page {
  max-width: 800px;
}

.cursor-pointer {
  cursor: pointer;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
}

.slider-min,
.slider-max {
  pointer-events: none;
  appearance: none;
  height: 8px;
  border-radius: 5px;
}

.slider-min::-webkit-slider-thumb,
.slider-max::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
}

.slider-min::-webkit-slider-thumb {
  background: #dee2e6;
  z-index: 3;
  position: relative;
}

.slider-max::-webkit-slider-thumb {
  background: var(--color-primary);
}

.slider-min {
  z-index: 2;
}

.slider-max {
  z-index: 3;
}

.slider-min,
.slider-max {
  background: #dee2e6;
}

.slider-min::before,
.slider-max::before {
  content: "";
  position: absolute;
  height: 8px;
  border-radius: 5px;
  background: #0d6efd;
  z-index: 1;
}
</style>
