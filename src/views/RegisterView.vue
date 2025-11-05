<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const mobileNumber = ref("");
const dateOfBirth = ref("");
const router = useRouter();

const handleRegister = async (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await api.post("/users/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      mobileNumber: mobileNumber.value,
      dateOfBirth: dateOfBirth.value,
    });

    console.log("Registration response:", res.data);
    alert("Registration successful!");
    router.push("/login");
  } catch (err) {
    // Log full error response for debugging
    console.error("Registration error response:", err.response);
    
    // Show backend error if available
    if (err.response && err.response.data) {
      alert(err.response.data.error || "Registration failed!");
    } else {
      alert("Registration failed! Please check your network or backend.");
    }
  }
};
</script>


<template>
  <main class="container mx-auto pt-md-3 pb-md-5">
    <div class="row align-items-center justify-content-center g-0">
      <!-- Left Side: Image -->
      <div class="col-md-6 d-none d-md-block p-0">
        <div class="register-image h-full"></div>
      </div>

      <!-- Right Side: Registration Form -->
      <div class="col-md-6 col-sm-12 d-flex align-items-center justify-content-center px-4 py-5 p-md-5">
        <div class="w-100" style="max-width:720px;">
          <div class="">
            <div class="card-body">
              <h2 class="card-title text-center mb-4 fw-bold">Create Your Account</h2>
              <p class="card-text text-center text-muted mb-4">
                Join Flyx to explore seamless travel booking.
              </p>

              <form @submit="handleRegister">
                <div class="row g-3 mb-3">
                  <div class="col">
                    <label class="form-label fw-bold">First Name</label>
                    <input class="form-control py-2" v-model="firstName" type="text" placeholder="First Name" required />
                  </div>
                  <div class="col">
                    <label class="form-label fw-bold">Last Name</label>
                    <input class="form-control py-2" v-model="lastName" type="text" placeholder="Last Name" required />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold">Email Address</label>
                  <input class="form-control py-2" v-model="email" type="email" placeholder="Email" required />
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold">Mobile Number</label>
                  <input class="form-control py-2" v-model="mobileNumber" type="text" placeholder="Mobile Number" required />
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold">Date of Birth</label>
                  <input class="form-control py-2" v-model="dateOfBirth" type="date" required />
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold">Password</label>
                  <input class="form-control py-2" v-model="password" type="password" placeholder="Password" required />
                </div>

                <div class="mb-4">
                  <label class="form-label fw-bold">Confirm Password</label>
                  <input class="form-control py-2" v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
                </div>

                <div class="d-grid mb-3">
                  <button type="submit" class="btn btn-primary btn-lg fw-bold py-2">Sign Up</button>
                </div>
              </form>
            </div>

            <div class="text-center mt-4">
              <p class="mb-0">
                Already have an account?
                <router-link to="/login" class="text-decoration-none fw-bold">Sign In</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.register-image {
  background-image: url("@/assets/images/register_image.jpg");
  background-size: cover;
  background-position: center;
  height: 480px;
}
</style>
