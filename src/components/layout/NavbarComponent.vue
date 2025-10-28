<template>
  <nav class="container px-0">
    <div class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img class="img-fluid" src="../../assets/images/logo_dark.png" alt="Flyx Logo" height="44">
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto gap-3">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/about">About</router-link>
            <router-link class="nav-link" to="/contact">Contact</router-link>
            <router-link class="nav-link" to="/login">Sign In</router-link>
            <router-link class="btn btn-primary" to="/register" role="button">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
nav {
  color: var(--color-primary) !important;
}

nav .logo-text {
  color: var(--color-primary) !important;
}

nav .nav-link {
  color: var(--color-gray-3) !important;
}

nav .nav-link:hover {
  color: var(--color-primary) !important;
}
</style>
