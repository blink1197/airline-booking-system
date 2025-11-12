<script setup>
import { ref, onMounted } from "vue";
import api from "../../api/api.js";
import dayjs from "dayjs";

// State
const flights = ref([]);
const loading = ref(true);
const error = ref("");

// Modal state
const showCreateModal = ref(false);
const showEditModal = ref(false);
const selectedFlight = ref(null);

// Form state
const flightForm = ref({
  airline: "",
  flightNumber: "",
  origin: "",
  destination: "",
  departureTime: "",
  arrivalTime: "",
  flightType: "domestic",
  status: "scheduled",
  basePrice: 0,
});

// Options for selects
const airlines = ref([]);
const airports = ref([]);

// Fetch flights
const fetchFlights = async () => {
  loading.value = true;
  try {
    const res = await api.get("/flights");
    flights.value = res.data;
  } catch (err) {
    error.value = "Failed to load flights";
  } finally {
    loading.value = false;
  }
};

// Fetch airlines and airports
const fetchOptions = async () => {
  try {
    const [airlineRes, airportRes] = await Promise.all([
      api.get("/airlines"),
      api.get("/airports"),
    ]);
    airlines.value = airlineRes.data;
    airports.value = airportRes.data;
  } catch (err) {
    console.error("Failed to load options", err);
  }
};

// Open edit modal
const openEdit = (flight) => {
  selectedFlight.value = flight;
  flightForm.value = {
    airline: flight.airline._id,
    flightNumber: flight.flightNumber,
    origin: flight.origin._id,
    destination: flight.destination._id,
    departureTime: dayjs(flight.departureTime).format("YYYY-MM-DDTHH:mm"),
    arrivalTime: dayjs(flight.arrivalTime).format("YYYY-MM-DDTHH:mm"),
    flightType: flight.flightType,
    status: flight.status,
    basePrice: flight.basePrice,
  };
  showEditModal.value = true;
};

// Reset form
const resetForm = () => {
  flightForm.value = {
    airline: "",
    flightNumber: "",
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    flightType: "domestic",
    status: "scheduled",
    basePrice: 0,
  };
  selectedFlight.value = null;
};

// Create flight
const createFlight = async () => {
  try {
    await api.post("/flights", flightForm.value);
    showCreateModal.value = false;
    resetForm();
    fetchFlights();
  } catch (err) {
    alert("Failed to create flight");
  }
};

// Update flight
const updateFlight = async () => {
  try {
    await api.patch(`/flights/${selectedFlight.value._id}`, flightForm.value);
    showEditModal.value = false;
    resetForm();
    fetchFlights();
  } catch (err) {
    alert("Failed to update flight");
  }
};

// Delete flight
const deleteFlight = async (id) => {
  if (!confirm("Are you sure you want to delete this flight?")) return;
  try {
    await api.delete(`/flights/${id}`);
    fetchFlights();
  } catch (err) {
    alert("Failed to delete flight");
  }
};

onMounted(() => {
  fetchFlights();
  fetchOptions();
});
</script>

<template>
  <div class="text-center">
    <h2 class="text-primary mb-4">Flight Management</h2>

    <button class="btn btn-success mb-3" @click="showCreateModal = true">
      Add New Flight
    </button>

    <div v-if="loading" class="text-muted">Loading flights...</div>
    <div v-if="error" class="text-danger">{{ error }}</div>

    <table v-if="!loading && flights.length" class="table table-striped table-bordered align-middle">
      <thead class="table-primary">
        <tr>
          <th>Flight ID</th>
          <th>Airline</th>
          <th>Flight Number</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Type</th>
          <th>Status</th>
          <th>Base Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flight in flights" :key="flight._id">
          <td>{{ flight.flightId }}</td>
          <td>{{ flight.airline.name }} ({{ flight.airline.iataCode }})</td>
          <td>{{ flight.flightNumber }}</td>
          <td>{{ flight.origin.city }}</td>
          <td>{{ flight.destination.city }}</td>
          <td>{{ dayjs(flight.departureTime).format("YYYY-MM-DD HH:mm") }}</td>
          <td>{{ dayjs(flight.arrivalTime).format("YYYY-MM-DD HH:mm") }}</td>
          <td>{{ flight.flightType }}</td>
          <td>{{ flight.status }}</td>
          <td>{{ flight.basePrice.toFixed(2) }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-1" @click="openEdit(flight)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteFlight(flight._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <template v-if="showCreateModal">
      <div class="modal-backdrop">
        <div class="modal">
          <h4>Add Flight</h4>
          <form @submit.prevent="createFlight">
            <div class="mb-2">
              <label>Airline</label>
              <select v-model="flightForm.airline" class="form-select" required>
                <option v-for="a in airlines" :key="a._id" :value="a._id">{{ a.name }}</option>
              </select>
            </div>
            <div class="mb-2">
              <label>Flight Number</label>
              <input v-model="flightForm.flightNumber" class="form-control" required/>
            </div>
            <div class="mb-2">
              <label>Origin</label>
              <select v-model="flightForm.origin" class="form-select" required>
                <option v-for="a in airports" :key="a._id" :value="a._id">{{ a.city }} ({{ a.airportId }})</option>
              </select>
            </div>
            <div class="mb-2">
              <label>Destination</label>
              <select v-model="flightForm.destination" class="form-select" required>
                <option v-for="a in airports" :key="a._id" :value="a._id">{{ a.city }} ({{ a.airportId }})</option>
              </select>
            </div>
            <div class="mb-2">
              <label>Departure Time</label>
              <input v-model="flightForm.departureTime" type="datetime-local" class="form-control" required/>
            </div>
            <div class="mb-2">
              <label>Arrival Time</label>
              <input v-model="flightForm.arrivalTime" type="datetime-local" class="form-control" required/>
            </div>
            <div class="mb-2">
              <label>Flight Type</label>
              <select v-model="flightForm.flightType" class="form-select">
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>
            <div class="mb-2">
              <label>Status</label>
              <select v-model="flightForm.status" class="form-select">
                <option value="scheduled">Scheduled</option>
                <option value="boarding">Boarding</option>
                <option value="departed">Departed</option>
                <option value="arrived">Arrived</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="mb-2">
              <label>Base Price</label>
              <input v-model.number="flightForm.basePrice" type="number" class="form-control" required/>
            </div>

            <div class="d-flex justify-content-end mt-3">
              <button type="submit" class="btn btn-success me-2">Create</button>
              <button type="button" class="btn btn-secondary" @click="showCreateModal=false; resetForm()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </template>

    <!-- Edit Modal -->
    <template v-if="showEditModal">
      <div class="modal-backdrop">
        <div class="modal">
          <h4>Edit Flight</h4>
          <form @submit.prevent="updateFlight">
            <!-- same fields as create modal -->
            <!-- ... -->
            <div class="d-flex justify-content-end mt-3">
              <button type="submit" class="btn btn-primary me-2">Update</button>
              <button type="button" class="btn btn-secondary" @click="showEditModal=false; resetForm()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.table {
  margin: auto;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 95%;
  z-index: 1060;
}
</style>
