<script setup>
import getawayImage1 from '@/assets/images/getaway1.jpg';
import getawayImage2 from '@/assets/images/getaway2.jpg';
import getawayImage3 from '@/assets/images/getaway3.jpg';
import CardComponent from '@/components/common/CardComponent.vue';
import DatePicker from '@/components/common/DatePicker.vue';
import DestinationSelect from '@/components/common/DestinationSelect.vue';
import PaxCabinPicker from '@/components/common/PaxCabinPicker.vue';
import { destinations } from '@/data/destinations';
import { ref, watch } from 'vue';


const tripType = ref('oneWayTrip');
const from = ref('');
const to = ref('');
const departureDate = ref('');
const returnDate = ref('');
const isReturnDateDisabled = ref(true);

const paxCabin = ref({
  pax: { adults: 1, children: 0, infants: 0 },
  cabin: 'Economy'
})

watch(tripType, (value) => {
  isReturnDateDisabled.value = value === 'oneWayTrip'
})
</script>

<template>
  <div class="container-fluid d-flex flex-column min-vh-100 p-0">
    <main class="container-fluid">
      <section class="hero container py-5">
        <h1
          class="hero-title d-flex flex-column justify-content-center align-items-center gap-2 fw-bold fs-1 mb-5 mt-5 pt-md-5">
          <span>Smarter Flights</span>
          <span>Seamless Booking</span>
        </h1>
        <div class="container px-0 mb-md-5 pb-md-5">
          <form class="hero-form bg-white p-3 p-lg-5 mx-auto">
            <div class="row g-3">
              <div class="col-12 d-flex gap-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" id="oneWayTrip" name="tripType" value="oneWayTrip"
                    v-model="tripType" />
                  <label class="form-check-label" for="oneWayTrip">
                    One Way
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="radio" id="roundTrip" name="tripType" value="roundTrip"
                    v-model="tripType" />
                  <label class="form-check-label" for="roundTrip">
                    Round Trip
                  </label>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <DestinationSelect label="Departure" v-model="from" :options="destinations" placeholder="From" />
              </div>
              <div class="col-12 col-md-6">
                <DestinationSelect label="Destination" v-model="to" :options="destinations" placeholder="To" />
              </div>
              <div class="col-12 col-md-6">
                <DatePicker label="Departure Date" v-model="departureDate" />
              </div>
              <div class="col-12 col-md-6">
                <DatePicker label="Return Date" v-model="returnDate" :is-disabled="isReturnDateDisabled" />
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <PaxCabinPicker v-model="paxCabin" />
              </div>
              <div class="col-12 col-md-6 col-lg-4 ms-md-auto">
                <router-link
                  class="btn btn-primary py-3 py-md-2 w-100 fw-bold d-flex justify-content-center gap-2 align-items-center"
                  :to="{ name: 'flights' }">
                  <i class="bi bi-search"></i>
                  <span>Search Flight</span>
                </router-link>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section class="getaways">
        <div class="container py-5">
          <h2 class="section-title mb-1">Discover the world's favorite getaways!</h2>
          <p class="mb-5"> From beaches to cities — your dream destination awaits.</p>
          <div class="row g-4">
            <div class="col-md-4">
              <CardComponent :image="getawayImage1" title="Iloilo"
                description="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
                :link="{ name: 'flights' }" primaryText="Book a flight" secondaryText="PHP 1,299" />
            </div>
            <div class="col-md-4">
              <CardComponent :image="getawayImage2" title="Macau"
                description="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
                :link="{ name: 'flights' }" primaryText="Book a flight" secondaryText="PHP 1,299" />
            </div>
            <div class="col-md-4">
              <CardComponent :image="getawayImage3" title="Laoag"
                description="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
                :link="{ name: 'flights' }" primaryText="Book a flight" secondaryText="PHP 1,299" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.hero {
  background:
    linear-gradient(rgba(var(--color-primary-rgb), 0.7), rgba(var(--color-primary-rgb), 0.7)),
    url('../assets/images/hero_bg.jpg') no-repeat center center;
  background-size: cover;
  max-width: 100% !important;
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  text-align: center;
  line-height: 1.1;
  color: var(--color-white)
}

.hero-form {
  color: var(--color-primary) !important;
  box-shadow: var(--shadow-card);
  border-radius: 15px;
  max-width: 1000px;
}

.hero-form .form-label {
  color: var(--color-primary) !important;
}

.hero-form .form-control {
  border: 0;
  background-color: var(--color-gray-6);
  text-align: center;
}

.getaway-card {
  border-radius: 10px;
  box-shadow: var(--shadow-card);
}

.getaway-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
</style>
