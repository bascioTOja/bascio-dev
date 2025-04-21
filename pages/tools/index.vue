<template>
  <Tools>
    <div v-for="tool in tools" :key="tool.code" class="tool-card"/>
  </Tools>
</template>

<script setup lang="ts">
import Tools from '~/layouts/Tools.vue';

definePageMeta({
  auth: false,
})

const tools = ref([]);

onMounted(async () => {
  try {
    const { data } = await $fetch('/api/tools');
    if (data.value) {
      tools.value = data.value;
    }
  } catch (error) {
    console.error('Error fetching tools:', error);
    tools.value = [];
  }
});
</script>


<style scoped lang="scss"/>
