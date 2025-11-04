import api from '@/api/api'
import { getTotalPassengers } from '@/utils/flightSearch'
import { buildUrl } from '@/utils/urlBuilder'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlightSearchStore = defineStore(
  'flightSearch',
  () => {
    // Search Form Data
    const tripType = ref('oneWayTrip')
    const from = ref(null)
    const to = ref(null)
    const departureDate = ref('')
    const returnDate = ref('')
    const pax = ref({ adults: 1, children: 0, infants: 0 })
    const cabin = ref('Economy')

    // Search Results
    const flights = ref([]);
    const isSearching = ref(false);
    const error = ref(null);

    async function searchFlights() {
      const url = buildUrl("/flights/search", {
        origin: from.value.airportId,
        destination: to.value.airportId,
        departureDate: departureDate.value,
        returnDate: returnDate.value,
        passengers: getTotalPassengers(pax.value),
        cabin: cabin.value,
        tripType: tripType.value,
      });

      try {
        isSearching.value = true;
        error.value = null;
        const res = await api.get(url);
        console.log(res);
      } catch (err) {
        console.error("Error fetching flights:", err);
        error.value = err.response?.data?.message || "Failed to fetch flights";
      } finally {
        isSearching.value = false;
      }
    }


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
      tripType, from, to, departureDate, returnDate, pax, cabin,
      flights, isSearching, error,
      setFlightSearchData, resetFlightSearch, searchFlights
    }
  },
  {
    persist: true,
  }
)
