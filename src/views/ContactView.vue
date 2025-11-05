<script setup>
import { ref } from "vue";
import api from "../api/api.js";

const name = ref("");
const email = ref("");
const message = ref("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post("/contact", {
      name: name.value,
      email: email.value,
      message: message.value,
    });
    alert("Thank you! Your message has been sent.");
    name.value = "";
    email.value = "";
    message.value = "";
  } catch (err) {
    console.error(err);
    alert("Failed to send message.");
  }
};
</script>

<template>
  <main class="container mx-auto pt-md-3 pb-md-5">
    <div class="row align-items-center justify-content-center g-0">
      <!-- Left Side Image -->
      <div class="col-md-6 d-none d-md-block py-5 px-0">
        <div class="contact-image"></div>
      </div>

      <!-- Right Side Contact Form -->
      <div class="col-md-6 col-sm-12 d-flex align-items-center justify-content-center px-4 py-5 p-md-5">
        <div class="w-100" style="max-width: 720px;">
          <div class="card-body">
            <h2 class="text-center mb-4 fw-bold">Get in touch</h2>
            <p class="text-center text-muted mb-4">We'd love to hear from you! Please fill out the form below.</p>

            <form @submit="handleSubmit">
              <div class="mb-3">
                <label class="form-label fw-bold">Full Name</label>
                <input type="text" class="form-control py-2" v-model="name" placeholder="Your full name" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Email Address</label>
                <input type="email" class="form-control py-2" v-model="email" placeholder="name@example.com" required />
              </div>
              <div class="mb-4">
                <label class="form-label fw-bold">Message</label>
                <textarea class="form-control py-2" rows="4" v-model="message" placeholder="Write your message..." required></textarea>
              </div>
              <div class="d-grid mb-3">
                <button type="submit" class="btn btn-primary btn-lg fw-bold py-2">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-image {
  background-image: url("../assets/images/contact_image.jpg");
  background-size: cover;
  background-position: center;
  height: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 767px) {
  .contact-image {
    display: none;
  }
}
</style>
