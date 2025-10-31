import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlightSearchStore = defineStore('flightSearch', () => {
  // --- State ---
  const tripType = ref('oneWayTrip')
  const from = ref(null)
  const to = ref(null)
  const departureDate = ref('')
  const returnDate = ref('')
  const pax = ref({ adults: 1, children: 0, infants: 0 });
  const cabin = ref('Economy');

  // --- Actions ---
  function setFlightSearchData(data) {
    tripType.value = data.tripType || tripType.value
    from.value = data.from || from.value
    to.value = data.to || to.value
    departureDate.value = data.departureDate || departureDate.value
    returnDate.value = data.returnDate || returnDate.value
    pax.value = data.pax || pax.value
    cabin.value = data.cabin || cabin.value
  }

  function resetFlightSearch() {
    tripType.value = 'oneWayTrip'
    from.value = ''
    to.value = ''
    departureDate.value = ''
    returnDate.value = ''
    pax.value = ''
    cabin.value = ''
  }

  return {
    tripType,
    from,
    to,
    departureDate,
    returnDate,
    pax,
    cabin,
    setFlightSearchData,
    resetFlightSearch,
  },
  {
    persist: true, // Enable localStorage persistence
  }
})
