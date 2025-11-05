<script setup>
import FlightListItem from '@/components/common/FlightListItem.vue';
import FlightSearchModifier from '@/components/common/FlightSearchModifier.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import StickyButtonGroup from '@/components/ui/StickyButtonGroup.vue';
// import { flights } from '@/data/flights';
import { useFlightSearchStore } from '@/stores/flightSearch';

const { flights } = useFlightSearchStore()

</script>

<template>
  <div class="container-fluid d-flex flex-column p-0 flight flights-page">
    <main class="container-fluid px-2 pt-1 pb-2">

      <!-- Custom Progress Bar -->
      <ProgressBar title="Flights" :steps="5" :currentStep="1" />
      <div class="container flights-results-container">

        <!-- Flight Search Modifier -->
        <FlightSearchModifier />

        <!-- Flight Results -->
        <div class="mx-1 mt-1 mb-3 py-2 d-flex justify-content-between align-items-center smaller-text">
          <span class="d-flex gap-1 justify-content-between align-items-center">
            <i class="bi bi-funnel"></i>
            Filters
          </span>
          <span>
            Sort by: Earliest first
          </span>
        </div>
        <div class="list-group">
          <FlightListItem v-for="(flight, index) in flights" :key="flight.flightNumber" :flightData="flight"
            :index="index" />
        </div>
      </div>
    </main>

    <!-- Sticky Button -->
    <StickyButtonGroup primaryText="Continue" primaryLink="/guests" secondaryText="Back" :showSecondary="false" />
  </div>
</template>

<style scoped>
.flights-page {
  max-width: 800px;
}
</style>
