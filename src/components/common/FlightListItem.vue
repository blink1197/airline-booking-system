<script setup>
import AirPlaneTakeLandingIcon from '../icons/AirPlaneTakeLandingIcon.vue';
import AirPlaneTakeOffIcon from '../icons/AirPlaneTakeOffIcon.vue';
defineProps({
  departureTime: String,
  arrivalTime: String,
  departureCode: String,
  arrivalCode: String,
  duration: String,
  flightNumber: String,
  price: [String, Number],
  index: Number,
  isSelected: Boolean
})

</script>


<template>
  <a href="#" class="list-group-item list-group-item-action container list-odd mb-1 border"
    :class="index % 2 === 0 ? 'list-even' : 'list-odd'">
    <div class="row text-primary">
      <!-- Left side (flight info) -->
      <div class="col-8 px-0 d-md-flex flex-row justify-content-around">
        <div class="d-flex gap-2 align-items-center p-2">
          <!-- Departure -->
          <span class="d-flex align-items-start flex-column">
            <p class="m-0 small-text fw-bold">{{ departureTime }}</p>
            <span class="d-flex gap-1 align-items-center">
              <slot name="departure-icon">
                <AirPlaneTakeOffIcon width="18" height="12" />
              </slot>
              <span class="smaller-text">{{ departureCode }}</span>
            </span>
          </span>

          <!-- Arrow -->
          <svg width="26" height="12" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.7435 0.75L24.4919 5.51471M24.4919 5.51471L19.7435 10.2794M24.4919 5.51471H0.75"
              stroke="#092C4C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <!-- Arrival -->
          <span class="d-flex justify-content-between align-items-start flex-column">
            <p class="m-0 small-text fw-bold">{{ arrivalTime }}</p>
            <span class="d-flex gap-1 align-items-center">
              <slot name="arrival-icon">
                <AirPlaneTakeLandingIcon width="18" height="12" />
              </slot>
              <span class="smaller-text">{{ arrivalCode }}</span>
            </span>
          </span>
        </div>

        <!-- Duration + flight number -->
        <div class="d-flex gap-5 align-items-center p-2">
          <span class="smaller-text fw-bold">{{ duration }}</span>
          <span class="smaller-text fw-bold">{{ flightNumber }}</span>
        </div>
      </div>

      <!-- Right side (price) -->
      <div class="col-4 d-flex flex-column align-items-start align-items-md-center justify-content-center gap-1 p-0">
        <p class="small-text m-0">All-in fare</p>
        <p class="fw-bold m-0">&#8369; {{ price }}</p>
      </div>
    </div>
  </a>
</template>



<style scoped>
.list-odd {
  background-color: var(--color-gray-6);
}

.list-even {
  background-color: var(--color-white);
}
</style>
