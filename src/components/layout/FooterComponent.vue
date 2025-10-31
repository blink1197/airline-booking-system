<template>
  <footer class="container-fluid">
    <div class="pt-5 pb-2 container">
      <div class="row">
        <div class="col-md-3 offset-md-1 mb-3">
          <router-link to="/">
            <img class="img-fluid" src="@/assets/images/logo_white.png" alt="Flyx Logo" height="44" />
          </router-link>
        </div>
        <div class="col-6 col-md-2 mb-3">
          <h5>About Us</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <router-link to="/about" class="nav-link p-0 text-body-secondary">
                About Flyx
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/about" class="nav-link p-0 text-body-secondary">
                Benefits
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/about" class="nav-link p-0 text-body-secondary">
                Get Started
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md-2 mb-3">
          <h5>Contact Us</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <router-link to="/contact" class="nav-link p-0 text-body-secondary">
                Locations
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/contact" class="nav-link p-0 text-body-secondary">
                Office Schedule
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md-2 mb-3">
          <h5>Privacy</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <router-link to="/terms" class="nav-link p-0 text-body-white">
                Terms and Conditions
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/privacy" class="nav-link p-0 text-body-secondary">
                Privacy Notice
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-5 mb-2 gap-5 d-flex justify-content-center footer-socials">
        <a href="#"><i class="bi bi-facebook fs-3"></i></a>
        <a href="#"><i class="bi bi-instagram fs-3"></i></a>
        <a href="#"><i class="bi bi-twitter-x fs-3"></i></a>
        <a href="#"><i class="bi bi-messenger fs-3"></i></a>
      </div>
      <div class="py-4 my-4 text-center">
        <p>© 2025 Flyx, Inc. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--color-primary) !important;
  color: var(--color-white);
}

footer a {
  color: var(--color-gray-4) !important;
  text-decoration: none !important;
}

footer a:hover {
  color: var(--color-white) !important;
}

footer .footer-socials a {
  color: inherit !important;
  text-decoration: none !important;
}
</style>
