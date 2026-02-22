<template>
  <div class="card-wrapper">
    <div
      class="card text-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-104 cursor-pointer"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
      <p class="text-sm">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ToolCardProps {
  code: string;
  title: string;
  description: string;
  color: string;
  urlTarget?: string;
}

const props = defineProps<ToolCardProps>();

async function handleClick() {
  const link = props.code.startsWith('snake') ? `/${props.code}` : `/tools/${props.code}`;
  if (props.urlTarget) {
    await navigateTo(link, {
      open: {
        target: props.urlTarget,
      }
    });
  } else {
    await navigateTo(link);
  }
}
</script>

<style scoped>
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
</style>
