<template>
  <Tools>
    <ToolCard
      v-for="tool in tools"
      :key="tool.code"
      :code="tool.code"
      :title="tool.title"
      :description="tool.description"
      :color="tool.color"
      :url_target="tool.url_target"
    />
  </Tools>
</template>

<script setup lang="ts">
import Tools from '~/layouts/Tools.vue';
import ToolCard from '~/components/ToolCard.vue';
import useApiFetch from '~/utils/apiFetch';

definePageMeta({
  auth: false,
});

interface Tool {
  code: string;
  title: string;
  description: string;
  color: string;
  url_target?: string;
}

const tools = ref<Tool[]>([]);

const fetchTools = async () => {
  try {
    const { data } = await useApiFetch()('tools/');
    if (data.value) {
      tools.value = Object.values(data.value) as Tool[];
    }
  } catch (error) {
    console.error('Error fetching tools:', error);
    tools.value = [];
  }
};

if (tools.value.length === 0) {
  await fetchTools();
}
</script>

<style scoped lang="scss">
</style>
