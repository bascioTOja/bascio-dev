<template>
  <div>
    <div class="cards-wrapper row">
      <div class="card-wrapper col-md-6 col-lg-4 align-center">
        <div class="card btn-card" :style="{ backgroundColor: '#' + card.color }" data-url="{% url module.url %}">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <h6 class="card-subtitle mb-2"><span class="badge bg-primary"></span></h6>
            <p class="card-text">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ToolCard',
  props: {
    card: {
      type: Object,
      required: true
    },
  },
}

</script>

<style scoped lang="scss">
  .card-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .card {
    width: 18rem;
  }

  .btn-card {
    transition-timing-function: ease-out;
    transition-duration: 250ms;
    -webkit-transition-timing-function: ease-out;
    -webkit-transition-duration: 250ms;
    -moz-transition-timing-function: ease-out;
    -moz-transition-duration: 250ms;
  }

  .btn-card:hover {
    opacity: .8;
    transform: scale(1.04);
    cursor: pointer;
  }
</style>
