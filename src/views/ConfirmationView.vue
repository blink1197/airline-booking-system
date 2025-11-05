<script setup>
import ProgressBar from '@/components/common/ProgressBar.vue';
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

      <div class="row confirmation-card mx-0 mb-4">
        <div class="col-1 bg-primary rounded-start">
        </div>
        <div class="col-11 p-2 bg-white container rounded-end p-md-4 ">
          <p class="extra-small-text-regular text-center">Reference Number: <strong>MNLCEBCC01</strong>
          </p>
          <div class="row gy-3">
            <div class="col-12">
              <div class="d-flex align-items-center justify-content-center gap-3 mb-3">
                <span class="text-center">
                  <p class="p-0 m-0 small-text-bold">MNL</p>
                  <p class="p-0 m-0 small-text-regular">Manila</p>
                </span>
                <span>
                  <svg width="33" height="6" viewBox="0 0 33 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M-0.000651121 2.66675C-0.000651121 4.13951 1.19326 5.33341 2.66602 5.33341C4.13877 5.33341 5.33268 4.13951 5.33268 2.66675C5.33268 1.19399 4.13877 8.13007e-05 2.66602 8.13007e-05C1.19326 8.13007e-05 -0.000651121 1.19399 -0.000651121 2.66675ZM2.66602 2.66675V3.16675H32.666V2.66675V2.16675H2.66602V2.66675Z"
                      fill="#092C4C" />
                  </svg>
                </span>
                <span class="d-flex flex-column justify-content-center align-items-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M27.2065 14.0001C27.195 12.6291 25.3315 11.6331 23.093 11.6331H18.3705C17.7145 11.6331 17.468 11.5276 17.0815 11.0821L9.20647 2.49206C8.96047 2.21106 8.65547 2.07056 8.30397 2.07056H6.94447C6.63997 2.07056 6.46447 2.34006 6.61647 2.66806L10.6715 11.6331L4.71797 12.3126L2.59697 8.42206C2.44497 8.12906 2.18697 8.00006 1.79997 8.00006H1.29697C0.991969 8.00006 0.792969 8.19906 0.792969 8.50406V19.4961C0.792969 19.8011 0.991969 19.9886 1.29697 19.9886H1.80097C2.18747 19.9886 2.44547 19.8596 2.59747 19.5786L4.71847 15.6876L10.672 16.3676L6.61697 25.3326C6.46497 25.6486 6.64047 25.9296 6.94497 25.9296H8.30497C8.65597 25.9296 8.96097 25.7776 9.20697 25.5081L17.082 16.9066C17.4685 16.4726 17.715 16.3671 18.371 16.3671H23.0935C25.332 16.3671 27.195 15.3596 27.2065 14.0001Z"
                      fill="#092C4C" />
                  </svg>
                  <p class="p-0 m-0 extra-small-text-regular">1h 35m</p>
                </span>
                <span>
                  <svg width="33" height="6" viewBox="0 0 33 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M27.3333 2.66675C27.3333 4.13951 28.5272 5.33341 30 5.33341C31.4728 5.33341 32.6667 4.13951 32.6667 2.66675C32.6667 1.19399 31.4728 8.13007e-05 30 8.13007e-05C28.5272 8.13007e-05 27.3333 1.19399 27.3333 2.66675ZM0 2.66675V3.16675H30V2.66675V2.16675H0V2.66675Z"
                      fill="#092C4C" />
                  </svg>

                </span>
                <span class="text-center">
                  <p class="p-0 m-0 small-text-bold">CEB</p>
                  <p class="p-0 m-0 small-text-regular">Cebu</p>
                </span>
              </div>
              <div class="d-flex align-items-center justify-content-center gap-3">
                <span class="text-center">
                  <p class="p-0 m-0 small-text-bold">Terminal</p>
                  <p class="p-0 m-0 small-text-regular">A</p>
                </span>
                <span class="text-center">
                  <p class="p-0 m-0 small-text-bold">Gate</p>
                  <p class="p-0 m-0 small-text-regular">2</p>
                </span>
                <span class="text-center">
                  <p class="p-0 m-0 small-text-bold">Class</p>
                  <p class="p-0 m-0 small-text-regular">Economy</p>
                </span>
                <span class="text-center">
                  <p class="p-0 m-0 small-text-bold">Seat</p>
                  <p class="p-0 m-0 small-text-regular">17A</p>
                </span>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary w-100">Download Boarding Pass</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row confirmation-card mx-0  mb-4">
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
      </div>

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
