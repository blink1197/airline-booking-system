<template>
  <div class="card shadow-sm">
    <img :src="image" class="card-img-top img-fluid" :alt="title" />
    <div class="card-body">
      <p><strong>{{ title }}</strong></p>
      <p class="card-text">{{ description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <router-link class="btn btn-sm btn-primary" :to="link">
            {{ primaryText }}
          </router-link>
        </div>
        <small class="text-body-secondary">{{ secondaryText }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: [String, Object],
    default: '#'
  },
  primaryText: {
    type: String,
    required: true
  },
  secondaryText: {
    type: String
  }
})
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: var(--shadow-card);
}

.card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}


@media (max-width: 576px) {
  .card img {
    height: 180px;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .card img {
    height: 220px;
  }
}
</style>
