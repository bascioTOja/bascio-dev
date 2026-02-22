<template>
  <Tools>
    <div v-if="loading" class="py-10 flex justify-center">
      <USkeleton class="h-32 w-96" />
    </div>
    <div v-else-if="errorMsg">
      <UAlert color="red">{{ errorMsg }}</UAlert>
      <NuxtLink to="/tools/url-shortener">
        <UButton class="mt-4">Back</UButton>
      </NuxtLink>
    </div>
    <div v-else>
      <UForm :state="formState" class="max-w-xl mx-auto mt-6 flex flex-col gap-4" @submit="onUpdate">
        <UInput v-model="formState.name" label="Name" required />
        <UInput v-model="formState.slug" label="Slug" required />
        <UInput v-model="formState.long_url" label="Full URL" required />
        <div class="flex gap-2 mt-2">
          <UButton type="submit" color="green">Save changes</UButton>
          <NuxtLink to="/tools/url-shortener">
            <UButton color="gray">Back</UButton>
          </NuxtLink>
        </div>
      </UForm>
      <div class="mt-6 text-sm text-gray-500">
        <div>ID: {{ shorturl.id }}</div>
        <div>Views: {{ shorturl.views }}</div>
        <div>Created at: {{ shorturl.created_at }}</div>
        <div>Last updated: {{ shorturl.updated_at }}</div>
      </div>
      <UAlert v-if="successMsg" color="green" class="mt-4">{{ successMsg }}</UAlert>
      <UAlert v-if="errorMsg && !loading" color="red" class="mt-4">{{ errorMsg }}</UAlert>
    </div>
  </Tools>
</template>

<script setup lang="ts">
import Tools from '~/layouts/tools.vue';
import useApiFetch from '~/utils/apiFetch';
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface ShortUrl {
  id: number;
  name: string;
  slug: string;
  long_url: string;
  short_url: string;
  views: number;
  created_at: string;
  updated_at: string;
}

const route = useRoute();
const id = route.params.id;

const loading = ref(true);
const errorMsg = ref('');
const successMsg = ref('');
const shorturl = ref<ShortUrl>({} as ShortUrl);
const formState = reactive({ name: '', slug: '', long_url: '' });

const fetchShortUrl = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const { data } = await useApiFetch()(`urlshortener/shorturls/${id}/`);
    if (data.value) {
      shorturl.value = data.value as ShortUrl;
      formState.name = (data.value as ShortUrl).name;
      formState.slug = (data.value as ShortUrl).slug;
      formState.long_url = (data.value as ShortUrl).long_url;
    } else {
      errorMsg.value = 'Link not found.';
    }
  } catch {
    errorMsg.value = 'Error fetching details.';
  } finally {
    loading.value = false;
  }
};

const onUpdate = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  try {
    const { data } = await useApiFetch()(`urlshortener/shorturls/${id}/`, {
      method: 'PUT',
      body: { ...formState },
    });
    if (data.value) {
      successMsg.value = 'Updated successfully!';
      shorturl.value = data.value as ShortUrl;
    }
  } catch {
    errorMsg.value = 'Error saving changes.';
  }
};

onMounted(fetchShortUrl);
</script>

<style scoped lang="scss">

</style>
