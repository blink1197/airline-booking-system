<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api"; 

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();

const handleRegister = async (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await api.post("/users/register", {
      name: fullName.value,
      email: email.value,
      password: password.value,
    });

    alert("Registration successful!");
    router.push("/login");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Registration failed!");
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
                <div class="mb-3">
                  <label for="fullNameInput" class="form-label fw-bold">Full Name</label>
                  <input class="form-control py-2" id="fullNameInput" v-model="fullName" type="text" placeholder="Full Name" required />
                </div>
                <div class="mb-3">
                  <label for="emailInput" class="form-label fw-bold">Email Address</label>
                  <input class="form-control py-2" id="emailInput" v-model="email" type="email" placeholder="Email" required />
                </div>
                <div class="mb-3">
                  <label for="passwordInput" class="form-label fw-bold">Password</label>
                  <input class="form-control py-2" id="passwordInput" v-model="password" type="password" placeholder="Password" required />
                </div>
                <div class="mb-4">
                  <label for="confirmPasswordInput" class="form-label fw-bold">Confirm Password</label>
                  <input class="form-control py-2" id="confirmPasswordInput" v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
                </div>
                <div class="d-grid mb-3">
                  <button type="submit" class="btn btn-primary btn-lg fw-bold py-2">Sign Up</button>
                </div>
              </form>
            </div>

            <div class="text-center mt-4">
              <p class="mb-0">
                Already have an account?
                <a href="./login.html" class="text-decoration-none fw-bold">Sign In</a>
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
