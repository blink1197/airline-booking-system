<script setup>
import getawayImage1 from '@/assets/images/getaway1.jpg';
import getawayImage2 from '@/assets/images/getaway2.jpg';
import getawayImage3 from '@/assets/images/getaway3.jpg';
import CardComponent from '@/components/common/CardComponent.vue';
import FlightSearchForm from '@/components/common/FlightSearchForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function handleSearch(formData) {
  console.log('Search emitted from form:', formData);
  router.push({ name: 'flights' });
}
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

        <!-- Flight Search Form -->
        <div class="container px-0 mb-md-5 pb-md-5">
          <FlightSearchForm @search="handleSearch" />
        </div>
      </section>

      <!-- Getaways Section -->
      <section class="getaways">
        <div class="container py-5">
          <h2 class="section-title mb-1">Discover the world's favorite getaways!</h2>
          <p class="mb-5"> From beaches to cities — your dream destination awaits.</p>
          <div class="row g-4">
            <div class="col-md-4">
              <CardComponent :image="getawayImage1" title="Iloilo"
                description="This is a wider card with supporting text below." primaryText="Book a flight"
                secondaryText="PHP 1,299" />
            </div>
            <div class="col-md-4">
              <CardComponent :image="getawayImage2" title="Macau"
                description="This is a wider card with supporting text below." primaryText="Book a flight"
                secondaryText="PHP 1,299" />
            </div>
            <div class="col-md-4">
              <CardComponent :image="getawayImage3" title="Laoag"
                description="This is a wider card with supporting text below." primaryText="Book a flight"
                secondaryText="PHP 1,299" />
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
