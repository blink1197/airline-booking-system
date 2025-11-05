<script setup>
import FlightListItem from '@/components/common/FlightListItem.vue';
import FlightSearchModifier from '@/components/common/FlightSearchModifier.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import StickyButtonGroup from '@/components/ui/StickyButtonGroup.vue';
import { useFlightSearchStore } from '@/stores/flightSearch';
import { storeToRefs } from 'pinia';

const flightStore = useFlightSearchStore()
const { flights, isSearching, error } = storeToRefs(flightStore)

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
          <span class="d-flex gap-1 justify-content-between align-items-center">
            <i class="bi bi-funnel"></i>
            Filters
          </span>
          <span>Sort by: Earliest first</span>
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
      v-if="flights.length !== 0" />
  </div>
</template>


<style scoped>
.flights-page {
  max-width: 800px;
}
</style>
