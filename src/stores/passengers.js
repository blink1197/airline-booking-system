import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePassengersStore = defineStore('passengers', () => {
  const passengers = ref([])

  function setPassengers(data) {
    passengers.value = data
  }

  function resetPassengers() {
    passengers.value = []
  }

  return {
    passengers,
    setPassengers,
    resetPassengers
  }
}, {
  persist: false
})
