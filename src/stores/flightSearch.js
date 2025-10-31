import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'

export const useFlightSearchStore = defineStore('flightSearch', () => {
  // --- State ---
  const tripType = ref('oneWayTrip')
  const from = ref('')
  const to = ref('')
  const departureDate = ref('')
  const returnDate = ref('')
  const isReturnDateDisabled = ref(true)

  const paxCabin = reactive({
    pax: { adults: 1, children: 0, infants: 0 },
    cabin: 'Economy'
  })

  // --- Watchers ---
  watch(tripType, (value) => {
    isReturnDateDisabled.value = value === 'oneWayTrip'
    if (isReturnDateDisabled.value) returnDate.value = ''
  })

  // --- Actions ---
  function setFlightSearchData(data) {
    tripType.value = data.tripType || tripType.value
    from.value = data.from || from.value
    to.value = data.to || to.value
    departureDate.value = data.departureDate || departureDate.value
    returnDate.value = data.returnDate || returnDate.value
    paxCabin.pax = data.paxCabin?.pax || paxCabin.pax
    paxCabin.cabin = data.paxCabin?.cabin || paxCabin.cabin
  }

  function resetFlightSearch() {
    tripType.value = 'oneWayTrip'
    from.value = ''
    to.value = ''
    departureDate.value = ''
    returnDate.value = ''
    paxCabin.pax = { adults: 1, children: 0, infants: 0 }
    paxCabin.cabin = 'Economy'
  }

  return {
    tripType,
    from,
    to,
    departureDate,
    returnDate,
    isReturnDateDisabled,
    paxCabin,
    setFlightSearchData,
    resetFlightSearch,
  }
})
