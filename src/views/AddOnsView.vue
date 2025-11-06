<script setup>
import insuranceImage from '@/assets/images/add-on1.jpg';
import extraBaggageImage from '@/assets/images/add-on2.jpg';
import seatSelectorImage from '@/assets/images/add-on3.jpg';
import ProgressBar from '@/components/common/ProgressBar.vue';
import CardComponent from '@/components/ui/CardComponent.vue';
import StickyButtonGroup from '@/components/ui/StickyButtonGroup.vue';
import { useAddonsStore } from '@/stores/add-ons';
import { useFlightSearchStore } from '@/stores/flightSearch';
import { computed } from 'vue';

const addOnStore = useAddonsStore();
const { addOns, toggleAddOn } = addOnStore;

// Function to handle toggling the add-on
function toggleAddon(name) {
  toggleAddOn(name);
}

// Computed object for Travel Insurance card props
const travelInsuranceProps = computed(() => {
  const selected = addOns['travel insurance'].selected;

  return {
    image: insuranceImage,
    title: 'Travel Insurance',
    name: 'travel insurance',
    description: 'Protect your trip with coverage for flight delays, lost baggage, and unexpected emergencies.',
    primaryText: 'Include',
    secondaryText: 'Remove',
    badgeText: selected ? 'Added' : '',
    miscText: selected ? 'Automatically added' : '',
    showPrimary: !selected,
    showSecondary: selected,
    isSelected: selected,
    'onPrimary-click': () => toggleAddon('travel insurance'),
    'onSecondary-click': () => toggleAddon('travel insurance')
  };
});


// Redirect users to home if they proceeded to this page without selectedFlight in the store
defineOptions({
  beforeRouteEnter(to, from, next) {
    const flightStore = useFlightSearchStore()
    if (!flightStore.selectedFlight) {
      next({ name: 'flights' })
    } else {
      next()
    }
  },
})
</script>



<template>
  <div class="container-fluid d-flex flex-column p-0 flight addons-page">
    <div class="container-fluid px-2 pt-1 pb-2">
      <!-- Progress Bar -->
      <ProgressBar title="Add-ons" :steps="5" :currentStep="3" />

      <!-- Add-ons selection -->
      <div class="px-2 mb-4">
        <h6 class="mb-3 normal-text-bold">Select your add-ons</h6>
        <div class="row gx-3 gy-4 mb-5">
          <div class="col-12 col-md-6">
            <CardComponent v-bind="travelInsuranceProps" />
          </div>
        </div>
        <div class="row gx-3 gy-4 ">
          <div class="col-12 col-md-6">
            <CardComponent :image="extraBaggageImage" title="Extra Baggage"
              description="Add extra baggage allowance to your booking." primaryText="" miscText="Coming soon"
              :isSelected="false" :showPrimary="false" />
          </div>
          <div class="col-12 col-md-6">
            <CardComponent :image="seatSelectorImage" title="Seat Selector"
              description="Choose your preferred seats in advance." primaryText="" miscText="Coming soon"
              :isSelected="false" :showPrimary="false" />
          </div>
        </div>
      </div>
      <!-- Sticky Button -->
      <StickyButtonGroup primaryText="Continue" primaryLink="/payment" secondaryText="Back" secondaryLink="/guests"
        :showSecondary="true" />
    </div>
  </div>
</template>

<style scoped>
.addons-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>
