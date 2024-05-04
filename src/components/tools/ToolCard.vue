<template>
  <div class="card-wrapper col-md-6 col-lg-4 align-center">
    <div
      :style="{ backgroundColor: card.color }"
      class="card"
      @click="clickCard()"
    >
      <div class="card-body">
        <h5 class="card-title">
          {{ card.title }}
        </h5>
        <h6 class="card-subtitle mb-2">
          <span class="badge bg-primary"></span>
        </h6>
        <p class="card-text">
          {{ card.description }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router';

export default {
  name: 'ToolCard',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickCard() {
      if (this.card.url_target) {
        const route = router.resolve({ name: 'tools.' + this.card.code });
        window.open(route.href, this.card.url_target);
      } else {
        router.push({ name: 'tools.' + this.card.code });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  min-height: 9rem;
}

.card {
  width: 18rem;
  transition-timing-function: ease-out;
  transition-duration: 250ms;
  -webkit-transition-timing-function: ease-out;
  -webkit-transition-duration: 250ms;
  -moz-transition-timing-function: ease-out;
  -moz-transition-duration: 250ms;
}

.card:hover {
  opacity: 0.8;
  transform: scale(1.04);
  cursor: pointer;
}
</style>
