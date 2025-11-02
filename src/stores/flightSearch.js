import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlightSearchStore = defineStore(
  'flightSearch',
  () => {

    const tripType = ref('oneWayTrip')
    const from = ref(null)
    const to = ref(null)
    const departureDate = ref('')
    const returnDate = ref('')
    const pax = ref({ adults: 1, children: 0, infants: 0 })
    const cabin = ref('Economy')


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
      from.value = null
      to.value = null
      departureDate.value = ''
      returnDate.value = ''
      pax.value = { adults: 1, children: 0, infants: 0 }
      cabin.value = 'Economy'
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
    }
  },
  {
    persist: true,
  }
)
