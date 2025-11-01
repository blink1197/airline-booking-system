<script setup>
import ProgressBar from '@/components/common/ProgressBar.vue'
import ContactInfoForm from '@/components/forms/ContactInfoForm.vue'
import PassengerForm from '@/components/forms/PassengerForm.vue'
import StickyButtonGroup from '@/components/ui/StickyButtonGroup.vue'
import VerticalTabs from '@/components/ui/VerticalTabs.vue'
import { useBookingStore } from '@/stores/booking'
import { useFlightSearchStore } from '@/stores/flightSearch'
import { computed, ref, watch } from 'vue'

const flightStore = useFlightSearchStore()
const bookingStore = useBookingStore();
const { pax, to, from, cabin } = flightStore

const activeTabIndex = ref(0)

// Generate tab items dynamically based on pax values
const tabItems = computed(() => {
  const items = []
  let id = 1

  for (let i = 0; i < pax.adults; i++) {
    items.push({
      id: id++, label: `Adult ${i + 1}`,
      icon: 'bi bi-person',
      itenerary: `${from._id} ⟶ ${to._id}`,
      cabin: `${cabin} Class`
    })
  }
  for (let i = 0; i < pax.children; i++) {
    items.push({
      id: id++, label: `Child ${i + 1}`,
      icon: 'bi bi-person',
      itenerary: `${from._id} ⟶ ${to._id}`,
      cabin: `${cabin} Class`
    })
  }
  for (let i = 0; i < pax.infants; i++) {
    items.push({
      id: id++, label: `Infant ${i + 1}`,
      icon: 'bi bi-person',
      itenerary: `${from._id} ⟶ ${to._id}`,
      cabin: `${cabin} Class`
    })
  }

  return items
})

const passengerForms = ref(bookingStore.passengers || [])
const contactForm = ref({
  title: bookingStore.contact?.title || '',
  firstName: bookingStore.contact?.firstName || '',
  lastName: bookingStore.contact?.lastName || '',
  countryCode: bookingStore.contact?.countryCode || '',
  mobileNumber: bookingStore.contact?.mobileNumber || '',
  email: bookingStore.contact?.email || '',
  confirmEmail: bookingStore.contact?.confirmEmail || '',
  useFirstGuestDetails: bookingStore.contact.useFirstGuestDetails || false
})

function copyFirstGuestDetails(isChecked) {
  if (isChecked && passengerForms.value.length > 0) {
    const firstPassenger = passengerForms.value[0]
    contactForm.value = {
      ...contactForm.value,
      title: firstPassenger.title || '',
      firstName: firstPassenger.firstName || '',
      lastName: firstPassenger.lastName || '',
      useFirstGuestDetails: true,
    }
  } else if (!isChecked) {
    // Clear copied values
    contactForm.value = {
      ...contactForm.value,
      title: '',
      firstName: '',
      lastName: '',
      useFirstGuestDetails: false,
    }
  }
}

watch(
  tabItems,
  (newTabs) => {
    // Reset or expand passengerForms to match tab count
    passengerForms.value = newTabs.map((_, index) => {
      return (
        passengerForms.value[index] || {
          title: '',
          firstName: '',
          lastName: '',
          day: '',
          month: '',
          year: '',
          nationality: '',
        }
      )
    })
  },
  { immediate: true }
)

// Sync passenger and contact form
watch(passengerForms, (v) => bookingStore.setPassengers(v), { deep: true })
watch(contactForm, (v) => bookingStore.setContact(v), { deep: true })
</script>

<template>
  <div class="container-fluid d-flex flex-column p-0 flight guests-page">
    <main class="container-fluid px-2 pt-1 pb-2">
      <!-- Progress Bar -->
      <ProgressBar title="Guests" :steps="5" :currentStep="2" />
      <!-- Passenger Information -->
      <div class="px-2 mb-4">
        <h6 class="mb-3 normal-text-bold">Passenger Information</h6>
        <VerticalTabs :tabs="tabItems" v-model="activeTabIndex">
          <template #default="{ activeTab, index }">
            <PassengerForm v-if="tabItems[index]" :key="tabItems[index].id" v-model="passengerForms[index]"
              :routeLabel="activeTab.itenerary" :flightType="activeTab.cabin" />
          </template>
        </VerticalTabs>
      </div>
      <!-- Contact Information -->
      <div class="px-2">
        <h6 class="mb-3 normal-text-bold">Contact Information</h6>
        <ContactInfoForm v-model="contactForm" @useGuestDetails="copyFirstGuestDetails" />
      </div>
      <!-- Sticky Button -->
      <StickyButtonGroup primaryText="Continue" primaryLink="/add-ons" secondaryText="Back" secondaryLink="/flights"
        :showSecondary="true" />
    </main>
  </div>
</template>
<style scoped>
.guests-page {
  max-width: 800px;
}
</style>
