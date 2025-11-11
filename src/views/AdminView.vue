<template>
  <main class="container mt-5 mx-auto">
    <div class="d-flex justify-content-center flex-wrap gap-2 mb-4">
      <button class="btn btn-primary" @click="section = 'users'">User Management</button>
      <button class="btn btn-primary" @click="section = 'flights'">Flights Management</button>
      <button class="btn btn-primary" @click="section = 'bookings'">Bookings Management</button>
      <button class="btn btn-primary" @click="section = 'airlines'">Airlines Management</button>
      <button class="btn btn-primary" @click="section = 'airports'">Airports Management</button>
      <button class="btn btn-primary" @click="section = 'passengers'">Passengers Management</button>
      <button class="btn btn-primary" @click="section = 'payments'">Payments Management</button>
    </div>

    <UserManagement v-if="section === 'users'" />
    <!-- Other management components will be added here using v-if -->
  </main>
</template>

<script setup>
import { ref } from "vue";
import UserManagement from "@/components/adminDashboard/UserManagement.vue";
// Other management components will be added later
// import FlightManagement from "@/components/adminDashboard/FlightManagement.vue";

const section = ref("users"); // default section
</script>
