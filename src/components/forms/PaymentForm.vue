<template>
  <form class="payment-card mx-0 mb-4" @submit.prevent="handleSubmit">
    <!-- Header -->
    <div class="bg-primary text-white py-3 px-3 normal-text-bold">
      Credit or Debit
    </div>

    <!-- Card Type Section -->
    <div class="d-flex py-3 justify-content-between align-items-center px-4">
      <div class="form-check d-none d-md-block">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
        <label class="form-check-label small-text-regular" for="flexRadioDefault2">
          Debit, Credit or Prepaid Cards
        </label>
      </div>
      <div class="d-flex align-items-center justify-content-center flex-grow-1 flex-md-grow-0 gap-1">
        <img src="@/assets/images/amex.png" alt="Amex" />
        <img src="@/assets/images/discover.png" alt="Discover" />
        <img src="@/assets/images/mastercard.png" alt="Mastercard" />
        <img src="@/assets/images/visa.png" alt="Visa" />
      </div>
    </div>

    <div class="px-2">
      <hr class="my-3 mx-2" />
    </div>

    <!-- Main Form Section -->
    <div class="d-flex flex-column gap-4 flex-md-row px-2">
      <!-- Card Details -->
      <div class="container px-0">
        <div class="px-2">
          <p class="normal-text-regular m-0">Card Details</p>
        </div>

        <div class="row px-2 gy-2">
          <div class="col-12">
            <label for="cardNumber" class="form-label extra-small-text-bold">Card Number*</label>
            <input type="text" class="form-control" id="cardNumber" v-model="form.cardNumber" required />
          </div>
          <div class="col-12">
            <label for="firstName" class="form-label extra-small-text-bold">First Name*</label>
            <input type="text" class="form-control" id="firstName" v-model="form.firstName" required />
          </div>
          <div class="col-12">
            <label for="lastName" class="form-label extra-small-text-bold">Last Name*</label>
            <input type="text" class="form-control" id="lastName" v-model="form.lastName" required />
          </div>
        </div>

        <div class="row px-2 pt-2">
          <div class="col-4">
            <label for="cvv" class="form-label extra-small-text-bold">CVV*</label>
            <input type="text" class="form-control" id="cvv" v-model="form.cvv" required />
          </div>
          <div class="col-8">
            <label for="expDate" class="form-label extra-small-text-bold">Expiration Date*</label>
            <input type="text" class="form-control" id="expDate" v-model="form.expDate" placeholder="MM/YY" required />
          </div>
        </div>
      </div>

      <!-- Billing Address -->
      <div class="container px-0">
        <div class="px-2">
          <p class="normal-text-regular m-0">Billing Address</p>
        </div>

        <div class="row px-2 gy-2 mb-4">
          <div class="col-12">
            <label for="streetAddress" class="form-label extra-small-text-bold">Street Address*</label>
            <input type="text" class="form-control" id="streetAddress" v-model="form.streetAddress" required />
          </div>
          <div class="col-12">
            <label for="city" class="form-label extra-small-text-bold">City/Town*</label>
            <input type="text" class="form-control" id="city" v-model="form.city" required />
          </div>
          <div class="col-12">
            <label for="country" class="form-label extra-small-text-bold">Country*</label>
            <input type="text" class="form-control" id="country" v-model="form.country" required />
          </div>
          <div class="col-12">
            <label for="contactNumber" class="form-label extra-small-text-bold">Contact Number*</label>
            <input type="text" class="form-control" id="contactNumber" v-model="form.contactNumber" required />
          </div>
          <div class="col-12">
            <label for="email" class="form-label extra-small-text-bold">Email*</label>
            <input type="email" class="form-control" id="email" v-model="form.email" required />
          </div>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="bg-secondary p-2 m-3 payment-disclaimer rounded">
      <p class="extra-small-text-regular mb-0">
        <strong>Disclaimer</strong>: Flyx authenticates all debit and credit card transactions, and reserves
        the right to refuse you, or your baggage, if in the exercise of reasonable discretion, we determine
        that the payment of your fare has been done fraudulently or unlawfully. Some banks may charge
        additional fees for this transaction.
      </p>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  cardNumber: '',
  firstName: '',
  lastName: '',
  cvv: '',
  expDate: '',
  streetAddress: '',
  city: '',
  country: '',
  contactNumber: '',
  email: '',
})

const handleSubmit = () => {
  console.log('Payment form submitted:', form)
  // Example: emit or call API here
  // emit('submit', form)
}
</script>

<style scoped>
.payment-disclaimer {
  background-color: var(--color-gray-5) !important;
}

.payment-method-container {
  max-width: 1000px !important;
}

img {
  height: 25px;
}
</style>
