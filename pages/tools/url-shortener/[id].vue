<template>
  <Tools>
    <div v-if="loading" class="py-10 flex justify-center">
      <USkeleton class="h-32 w-96" />
    </div>
    <div v-else-if="errorMsg">
      <UAlert color="red">{{ errorMsg }}</UAlert>
      <NuxtLink to="/tools/url-shortener">
        <UButton class="mt-4">Powrót</UButton>
      </NuxtLink>
    </div>
    <div v-else>
      <UForm :state="formState" class="max-w-xl mx-auto mt-6 flex flex-col gap-4" @submit="onUpdate">
        <UInput v-model="formState.name" label="Nazwa" required />
        <UInput v-model="formState.slug" label="Slug" required />
        <UInput v-model="formState.long_url" label="Pełny URL" required />
        <div class="flex gap-2 mt-2">
          <UButton type="submit" color="green">Zapisz zmiany</UButton>
          <NuxtLink to="/tools/url-shortener">
            <UButton color="gray">Powrót</UButton>
          </NuxtLink>
        </div>
      </UForm>
      <div class="mt-6 text-sm text-gray-500">
        <div>ID: {{ shorturl.id }}</div>
        <div>Wyświetlenia: {{ shorturl.views }}</div>
        <div>Utworzono: {{ shorturl.created_at }}</div>
        <div>Ostatnia edycja: {{ shorturl.updated_at }}</div>
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

const route = useRoute();
const id = route.params.id;

const loading = ref(true);
const errorMsg = ref('');
const successMsg = ref('');
const shorturl = ref<any>({});
const formState = reactive({ name: '', slug: '', long_url: '' });

const fetchShortUrl = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    const { data } = await useApiFetch()(`urlshortener/shorturls/${id}/`);
    if (data.value) {
      shorturl.value = data.value;
      formState.name = data.value.name;
      formState.slug = data.value.slug;
      formState.long_url = data.value.long_url;
    } else {
      errorMsg.value = 'Nie znaleziono linku.';
    }
  } catch (e) {
    errorMsg.value = 'Błąd pobierania szczegółów.';
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
      successMsg.value = 'Zaktualizowano!';
      shorturl.value = data.value;
    }
  } catch (e) {
    errorMsg.value = 'Błąd zapisu zmian.';
  }
};

onMounted(fetchShortUrl);
</script>

<style scoped lang="scss">

</style>
