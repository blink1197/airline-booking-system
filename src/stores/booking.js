import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore(
  'booking', () => {
    // Passenger list (array of objects)
    const passengers = ref([])

    // Contact info (single object)
    const contact = ref({
      title: '',
      firstName: '',
      lastName: '',
      countryCode: '',
      mobileNumber: '',
      email: '',
      confirmEmail: '',
    })

    // Actions
    function setPassengers(data) {
      passengers.value = data
    }

    function setContact(data) {
      contact.value = data
    }

    function resetBooking() {
      passengers.value = []
      contact.value = {
        title: '',
        firstName: '',
        lastName: '',
        countryCode: '',
        mobileNumber: '',
        email: '',
        confirmEmail: '',
        useFirstGuestDetails: false
      }
    }

    return {
      passengers,
      contact,
      setPassengers,
      setContact,
      resetBooking,
    }
  },
  {
    persist: true, // Persist state in localStorage
  }
)
