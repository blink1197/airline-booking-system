<script setup>
import BoardingPass from '@/components/common/BoardingPass.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import { useBookingStore } from '@/stores/booking';

const bookingStore = useBookingStore();
const { paidFlightDetails } = bookingStore;

const passengers = paidFlightDetails.bookingId.passengers;
</script>

<template>
  <div class="container-fluid d-flex flex-column p-0 flight confirmation-page">
    <div class="container-fluid px-2 pt-1 pb-2">
      <!-- Progress Bar -->
      <ProgressBar title="Confirmation" :steps="5" :currentStep="6" />

      <!-- Contact Information -->
      <div class="px-2">
        <div class="d-flex align-items-center mb-2">
          <div class="bg-success rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0">
            <i class="bi bi-check text-white fs-6"></i>
          </div>
          <span class="normal-text-bold">Your flight is confirmed!</span>
        </div>
        <p class="extra-small-text-regular mx-0 mb-4">
          Your booking is complete. Check your flight details below
          and get ready for your trip.
        </p>
      </div>

      <div class="px-2 mb-4">
        <h6 class="normal-text-bold">Boarding Pass</h6>
        <p class="extra-small-text-regular mt-0 mb-3">
          Present this boarding pass at the gate and keep it until baggage claim.
        </p>

      </div>


      <BoardingPass v-for="(passenger, index) in passengers" :bookingDetails="paidFlightDetails.bookingId"
        :passengerDetails="passenger" :index="index" />

      <!-- <div class="row confirmation-card mx-0  mb-4">
        <div class="col-1 bg-primary rounded-start">
        </div>
        <div class="col-11 p-2 bg-white container rounded-end p-md-4 ">
          <p class="extra-small-text-regular text-center">Receipt Number: <strong>MNLCERT0001</strong>
          </p>
          <div class="mb-3">
            <div class="d-flex">
              <p class="p-0 m-0 extra-small-text-bold">Name:</p>
              <p class="ms-auto p-0 m-0 extra-small-text-regular">FirstName LastName</p>
            </div>
            <div class="d-flex">
              <p class="p-0 m-0 extra-small-text-bold">Card Number:</p>
              <p class="ms-auto p-0 m-0 extra-small-text-regular">VISA xxxx xxxx xxxx 5465</p>
            </div>
            <div class="d-flex">
              <p class="p-0 m-0 extra-small-text-bold">Basic Economy:</p>
              <p class="ms-auto p-0 m-0 extra-small-text-regular">₱ 6,752.72</p>
            </div>
            <div class="d-flex">
              <p class="p-0 m-0 extra-small-text-bold">Travel Insurance:</p>
              <p class="ms-auto p-0 m-0 extra-small-text-regular">₱ 584.00</p>
            </div>
            <div class="d-flex">
              <p class="p-0 m-0 extra-small-text-bold">Taxes and Fees:</p>
              <p class="ms-auto p-0 m-0 extra-small-text-regular">₱ 0.00</p>
            </div>
            <div class="d-flex">
              <p class="p-0 m-0 extra-small-text-bold">Total:</p>
              <p class="ms-auto p-0 m-0 extra-small-text-bold">₱ 7,336.72</p>
            </div>
          </div>
          <div class="">
            <button class="btn btn-primary w-100">Download Receipt</button>
          </div>
        </div>
      </div> -->

    </div>
  </div>
</template>

<style scoped>
.confirmation-page {
  max-width: 600px;
}

.rounded-circle {
  width: 22px;
  height: 22px;
  margin-bottom: 1px;
}

.confirmation-card {
  box-shadow: var(--shadow-card) !important;
}
</style>
