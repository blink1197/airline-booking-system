<script setup>
import FlightListItem from '@/components/common/FlightListItem.vue';
import FlightSearchModifier from '@/components/common/FlightSearchModifier.vue';
import { flights } from '@/data/flights';
</script>

<template>
  <div class="container-fluid d-flex flex-column p-0">
    <main class="container-fluid px-2 pt-1 pb-2 ">
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
          <FlightListItem v-for="(flight, index) in flights" :key="flight.flightNumber" v-bind="flight"
            :index="index" />
        </div>
      </div>
    </main>

    <!-- Sticky Button -->
    <div class="py-4 px-4 sticky-bottom-btn border-0 d-flex justify-content-center">
      <a class="btn btn-primary w-100 p-3 sticky-btn" href="./booking.html">Continue</a>
    </div>
  </div>
</template>
