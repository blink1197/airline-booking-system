<script setup>
import ProgressBar from '@/components/common/ProgressBar.vue';
import StickyButtonGroup from '@/components/ui/StickyButtonGroup.vue';
import { sampleBooking } from '@/data/booking';
import { formatDateReadable, formatTimeReadable } from '@/utils/date';
import { ref } from 'vue';

// Ingress and Egress Terminals (randdomly set)
const departureTerminal = sampleBooking.departureTerminal
const arrivalTerminal = sampleBooking.arrivalTerminal
const departureGate = sampleBooking.departureGate
const arrivalGate = sampleBooking.arrivalGate

// Flight Details
const origin = sampleBooking.flight.origin
const destination = sampleBooking.flight.destination
const departureTime = sampleBooking.flight.departureTime
const arrivalTime = sampleBooking.flight.arrivalTime
const flightDurationMinutes = sampleBooking.flight.flightDuration
const flightNumber = sampleBooking.flight.flightNumber
const airline = sampleBooking.airline.name

// Passenger Info
const passengerFirstName = sampleBooking.passengers[0].firstName
const passengerLastName = sampleBooking.passengers[0].lastName


// Flight Price
const basePrice = sampleBooking.flightPrice.basePrice
const taxesAndFees = sampleBooking.flightPrice.taxesAndFees
const cabinClass = sampleBooking.flightPrice.cabinClass
const seatNumber = sampleBooking.flightPrice.seatNumber
// "taxesAndFees": {
//       "adminFee": 150,
//       "fuelSurcharge": 400,
//       "adminFeeVAT": 18,
//       "domesticPassengerServiceCharge": 200,
//       "airportDomesticPassengerServiceCharge": 100,
//       "valueAddedTax": 252,
//       "subtotal": 4620
// },
const travelInsuranceFee = sampleBooking.flightPrice.travelInsuranceFee
const totalPrice = sampleBooking.totalAmount


const termsAccepted = ref(false);


</script>

<template>
  <div class="container-fluid d-flex flex-column p-0 flight payment-page">
    <div class="container-fluid px-2 pt-1 pb-2">
      <!-- Progress Bar -->
      <ProgressBar title="Payment" :steps="5" :currentStep="4" />

      <div class="px-2">
        <h6 class="normal-text-bold m-0">Booking Summary</h6>
        <p class="extra-small-text-regular m-0">Review your booking before proceeding to payment</p>
      </div>

      <!-- Booking Summary -->
      <div class="px-2 mt-4">
        <div class="row payment-card mx-0 mb-4">
          <div class="col-1 bg-primary rounded-start">
          </div>
          <div class="col-11 p-2 px-0 pt-0 bg-white container rounded-end p-md-4 pt-md-2">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button class="accordion-button collapsed px-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flushs-collapseOne">
                    <div class="text-primary d-flex align-items-center flex-grow-1">
                      <span>
                        <p class="m-0 small-text-bold">{{ `${origin._id} - ${destination._id}` }}</p>
                        <p class="m-0 extra-small-text-regular">{{ formatDateReadable(departureTime) }}</p>
                        <p class="m-0 extra-small-text-regular">
                          {{ `${formatTimeReadable(departureTime)}` }} - {{ `${formatTimeReadable(arrivalTime)}` }}
                        </p>
                      </span>
                      <span class="extra-small-text-regular ms-auto">
                        <p class="my-0 me-1">Show details</p>
                      </span>
                    </div>
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse show" aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body px-2 pt-1 pb-2 container">
                    <p class="m-0 small-text-bold mb-1">Flight No. {{ flightNumber }}</p>
                    <div class="row px-3">
                      <p class="m-0 p-0 extra-small-text-bold">Departure</p>
                      <div class="col-4 px-0">
                        <p class="extra-small-text-regular m-0">{{ formatDateReadable(departureTime) }}</p>
                        <p class="extra-small-text-regular m-0">{{ `${formatTimeReadable(departureTime)}` }}</p>
                      </div>
                      <div class="col-8">
                        <p class="extra-small-text-bold m-0">
                          {{ origin.city }} ({{ origin._id }})
                        </p>
                        <p class="extra-small-text-regular m-0">{{ origin.name }}</p>
                        <p class="extra-small-text-regular m-0">{{ departureTerminal }}</p>
                      </div>
                    </div>

                    <div class="row px-3">
                      <p class="m-0 p-0 extra-small-text-bold">Arrival</p>
                      <div class="col-4 px-0">
                        <p class="extra-small-text-regular m-0">{{ formatDateReadable(arrivalTime) }}</p>
                        <p class="extra-small-text-regular m-0">{{ `${formatTimeReadable(arrivalTime)}` }}</p>
                      </div>
                      <div class="col-8">
                        <p class="extra-small-text-bold m-0">
                          {{ destination.city }} ({{ destination._id }})
                        </p>
                        <p class="extra-small-text-regular m-0">{{ destination.name }}</p>
                        <p class="extra-small-text-regular m-0">{{ arrivalTerminal }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                  <button class="accordion-button collapsed px-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    <div class="text-primary d-flex align-items-center flex-grow-1">
                      <span>
                        <p class="m-0 small-text-bold">{{ passengerFirstName }} {{ passengerLastName }}</p>
                      </span>
                      <span class="small-text-bold ms-auto">
                        <p class="my-0 me-1">&#8369; {{ basePrice }}</p>
                      </span>
                    </div>
                  </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body px-2 pb-2 container d-flex flex-column gap-1">
                    <div class="d-flex align-items-center">
                      <p class="m-0 small-text-regular mb-1">Flight No. {{ flightNumber }}</p>
                      <p class="m-0 small-text-regular mb-1 ms-auto">&#8369; {{ basePrice }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <div>
                        <div>
                          <i class="bi bi-person-fill"></i>
                          <span class="m-0 small-text-regular mb-1">Seat: {{ seatNumber }} {{ cabinClass }}</span>
                        </div>
                      </div>
                      <p class="m-0 small-text-regular mb-1 ms-auto">&#8369; 0.00</p>
                    </div>
                    <!-- <div class="d-flex align-items-center">
                      <p class="m-0 extra-small-text-regular mb-1">Taxes and Fees</p>
                      <p class="m-0 small-text-regular mb-1 ms-auto">&#8369; 0.00</p>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                  <button class="accordion-button collapsed px-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    <div class="text-primary d-flex align-items-center flex-grow-1">
                      <span>
                        <p class="m-0 small-text-bold">Travel Insurance</p>
                      </span>
                      <span class="small-text-bold ms-auto">
                        <p class="my-0 me-1">&#8369; {{ travelInsuranceFee }}</p>
                      </span>
                    </div>
                  </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body px-2 pb-2 container d-flex flex-column gap-1">
                    <div class="d-flex align-items-center">
                      <p class="m-0 small-text-regular mb-1">Flyx Travel Insurance</p>
                      <p class="m-0 small-text-regular mb-1 ms-auto"> {{ travelInsuranceFee }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFour show">
                  <button class="accordion-button collapsed px-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                    <div class="text-primary d-flex align-items-center flex-grow-1">
                      <span>
                        <p class="m-0 small-text-bold">Taxes and Fees</p>
                      </span>
                      <span class="extra-small-text-regular ms-auto">
                        <p class="my-0 me-1">Show details</p>
                      </span>
                    </div>
                  </button>
                </h2>
                <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body px-2 pb-2 container d-flex flex-column gap-1">
                    <div class="d-flex align-items-center">
                      <p class="m-0 extra-small-text-regular mb-1">Administrative Fee</p>
                      <p class="m-0 extra-small-text-regular mb-1 ms-auto"> {{ taxesAndFees.adminFee }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <p class="m-0 extra-small-text-regular mb-1">Fuel Surcharge</p>
                      <p class="m-0 extra-small-text-regular mb-1 ms-auto"> {{ taxesAndFees.fuelSurcharge }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <p class="m-0 extra-small-text-regular mb-1">VAT for Admin Fees</p>
                      <p class="m-0 extra-small-text-regular mb-1 ms-auto"> {{ taxesAndFees.adminFeeVAT }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <p class="m-0 extra-small-text-regular mb-1">Domestic Passenger Service
                        Charge</p>
                      <p class="m-0 extra-small-text-regular mb-1 ms-auto"> {{
                        taxesAndFees.domesticPassengerServiceCharge }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <p class="m-0 extra-small-text-regular mb-1">MNL Domestic Passenger Service
                        Charge
                      </p>
                      <p class="m-0 extra-small-text-regular mb-1 ms-auto"> {{
                        taxesAndFees.airportDomesticPassengerServiceCharge }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <p class="m-0 extra-small-text-regular mb-1">Value Added Tax</p>
                      <p class="m-0 extra-small-text-regular mb-1 ms-auto"> {{
                        taxesAndFees.valueAddedTax }}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <p class="m-0 small-text-bold mb-1">Subtotal</p>
                      <p class="m-0 small-text-bold mb-1 ms-auto">&#8369; {{
                        taxesAndFees.subtotal }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center px-2 py-3">
                <span class="normal-text-bold">
                  Total
                </span>
                <span class="ms-auto normal-text-bold">
                  &#8369; {{ totalPrice }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="payment-card mx-2 small-text-regular p-3 mb-4 bg-white rounded">
        <div class="form-check d-flex align-items-start">
          <input class="form-check-input mt-1 me-2" type="checkbox" value="" id="flexCheckDefault"
            v-model="termsAccepted" />
          <label class="form-check-label" for="flexCheckDefault">
            <span>
              By clicking <strong>'Continue'</strong>, I confirm that I have read, understood, and accept the
              <strong class="text-primary cursor-pointer">Conditions of Carriage</strong>.
            </span>
          </label>
        </div>
      </div>
      <!-- Sticky Button -->
      <StickyButtonGroup primaryText="Continue" primaryLink="/payment-method" secondaryText="Back"
        secondaryLink="/add-ons" :showSecondary="true" />
    </div>
  </div>
</template>

<style scoped>
.payment-page {
  max-width: 800px;
  margin: 0 auto;
}

.payment-card {
  box-shadow: var(--shadow-card);
  border-radius: 10px;
  overflow: hidden;
}

.payment-disclaimer {
  background-color: var(--color-gray-5) !important;
}
</style>
