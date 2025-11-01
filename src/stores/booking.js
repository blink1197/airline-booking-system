import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useContactStore } from './contact'
import { usePassengersStore } from './passengers'

export const useBookingStore = defineStore('booking', () => {
  const passengersStore = usePassengersStore()
  const contactStore = useContactStore()

  // Combine all data
  const bookingData = computed(() => ({
    passengers: passengersStore.passengers,
    contact: contactStore.contact
  }))

  // Reset both
  function resetBooking() {
    passengersStore.resetPassengers()
    contactStore.resetContact()
  }

  return {
    bookingData,
    resetBooking
  }
})
