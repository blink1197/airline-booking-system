<template>
  <main class="container my-5 flex-grow-1 mx-auto px-2">
    <div class="profile-header mb-5">
      <h1 class="fw-bold">Hello, {{ user.firstName }}!</h1>
      <p class="text-muted">
        Manage your flights, view status, and review past bookings.
      </p>
    </div>

    <!-- Booking tabs -->
    <ul class="nav nav-tabs profile-tabs mb-4" id="profileTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="current-tab"
          data-bs-toggle="tab"
          data-bs-target="#current-status"
          type="button"
          role="tab"
          aria-controls="current-status"
          aria-selected="true"
        >
          Booking Status
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="history-tab"
          data-bs-toggle="tab"
          data-bs-target="#booking-history"
          type="button"
          role="tab"
          aria-controls="booking-history"
          aria-selected="false"
        >
          Booking History
        </button>
      </li>
    </ul>

    <div class="tab-content" id="profileTabContent">
      <!-- Current booking tab -->
      <div
        class="tab-pane fade show active"
        id="current-status"
        role="tabpanel"
        aria-labelledby="current-tab"
      >
        <div v-if="currentBooking" class="alert alert-info" role="alert">
          <h4 class="alert-heading">
            Upcoming Flight: {{ currentBooking.flight.fromLocation }} to
            {{ currentBooking.flight.toLocation }}
          </h4>
          <p>
            Flight {{ currentBooking.flight.flightId }}. Departure:
            {{ formatDate(currentBooking.flight.departureDate) }} at
            {{ formatTime(currentBooking.flight.departureDate) }}. Status:
            <strong>{{ currentBooking.status }}</strong>.
          </p>
          <hr>
          <p class="mb-0">
            Your E-Ticket and check-in details are available below.
          </p>
        </div>
        <div v-else>
          <p class="text-muted">You have no upcoming flights.</p>
        </div>
      </div>

      <!-- Booking history tab -->
      <div
        class="tab-pane fade"
        id="booking-history"
        role="tabpanel"
        aria-labelledby="history-tab"
      >
        <div
          v-for="booking in bookingHistory"
          :key="booking.bookingId"
          class="card shadow-sm mb-3"
        >
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-1 fw-bold">
                Departure: {{ booking.flight.fromLocation }} to
                {{ booking.flight.toLocation }}
              </h5>
              <span
                class="badge"
                :class="{
                  'bg-success': booking.status === 'Completed',
                  'bg-warning text-dark': booking.status === 'Cancelled',
                  'bg-info text-dark': booking.status === 'Confirmed'
                }"
              >
                {{ booking.status }}
              </span>
            </div>
            <p class="mb-1 text-muted">
              Flight {{ booking.flight.flightId }} •
              {{ formatDate(booking.flight.departureDate) }}
            </p>
            <small>Total paid: {{ booking.totalAmount }} PHP</small>
          </div>
        </div>

        <div v-if="bookingHistory.length === 0" class="text-center p-5 border rounded bg-light mt-5">
          <p class="fw-bold mb-1">No booking history found.</p>
          <p class="text-muted">Start booking your flights today!</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api.js'

const user = ref({
  firstName: 'User',
  lastName: '',
  email: ''
})

const currentBooking = ref(null)
const bookingHistory = ref([])

// Format datetime nicely
const formatDate = (datetime) => new Date(datetime).toLocaleDateString()
const formatTime = (datetime) => new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

// Fetch user info
const fetchUserProfile = async () => {
  try {
    const res = await api.get('/users/details')
    user.value = res.data
  } catch (err) {
    console.error(err)
  }
}

// Fetch current booking
const fetchCurrentBooking = async () => {
  try {
    const res = await api.get('/bookings/current')
    currentBooking.value = res.data
  } catch (err) {
    console.error(err)
  }
}

// Fetch booking history
const fetchBookingHistory = async () => {
  try {
    const res = await api.get('/bookings/history')
    bookingHistory.value = res.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchUserProfile()
  fetchCurrentBooking()
  fetchBookingHistory()
})
</script>

<style scoped>
/* You can keep your existing profile styles here */
</style>
