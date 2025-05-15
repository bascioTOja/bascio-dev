<template>
  <Tools>
    <div class="mb-6">
      <UForm :state="formState" class="flex flex-wrap gap-2 items-end" @submit="onCreate">
        <UInput v-model="formState.name" placeholder="Nazwa" class="w-40" required />
        <UInput v-model="formState.slug" placeholder="Slug (np. moj-link)" class="w-40" required />
        <UInput v-model="formState.long_url" placeholder="Pełny URL" class="w-80" required />
        <UButton type="submit" color="green">Dodaj</UButton>
      </UForm>
    </div>
    <UTable :data="shorturls" :columns="columns" class="mb-4">
      <template #actions="{ row }">
        <NuxtLink :to="`/tools/url-shortener/${row.id}`">
          <UButton size="xs" color="gray">Edytuj</UButton>
        </NuxtLink>
        <UButton size="xs" color="red" class="ml-2" @click="onDelete(row.id)">Usuń</UButton>
      </template>
    </UTable>
    <UAlert v-if="errorMsg" color="red" class="mt-2">{{ errorMsg }}</UAlert>
  </Tools>
</template>

<script setup lang="ts">
import Tools from '~/layouts/tools.vue';
import useApiFetch from '~/utils/apiFetch';
import { ref, reactive, onMounted } from 'vue';

interface ShortUrl {
  id: number;
  name: string;
  slug: string;
  long_url: string;
  views: number;
  created_at: string;
  updated_at: string;
}

const shorturls = ref<ShortUrl[]>([]);
const errorMsg = ref('');
const formState = reactive({ name: '', slug: '', long_url: '' });

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Nazwa' },
  { id: 'slug', label: 'Slug' },
  { id: 'long_url', label: 'Pełny URL' },
  { id: 'views', label: 'Wyświetlenia' },
  { id: 'created_at', label: 'Utworzono' },
  { id: 'updated_at', label: 'Zaktualizowano' },
  { id: 'actions', label: 'Akcje', slot: 'actions' },
];

const fetchShortUrls = async () => {
  try {
    const { data } = await useApiFetch()('urlshortener/shorturls/');
    // Upewniamy się, że mamy tablicę obiektów i przypisujemy ją bezpośrednio
    shorturls.value = Array.isArray(data.value) ? data.value : [];
    console.log('Pobrane dane:', shorturls.value);
  } catch (e) {
    console.error('Błąd fetchShortUrls:', e);
    errorMsg.value = 'Błąd pobierania linków.';
  }
};

const onCreate = async () => {
  errorMsg.value = '';
  try {
    const { data } = await useApiFetch()('urlshortener/shorturls/', {
      method: 'POST',
      body: { ...formState },
    });
    if (data.value) {
      shorturls.value.push(data.value);
      formState.name = '';
      formState.slug = '';
      formState.long_url = '';
    }
  } catch (e) {
    errorMsg.value = 'Błąd dodawania linku.';
  }
};

const onDelete = async (id: number) => {
  errorMsg.value = '';
  try {
    await useApiFetch()(`urlshortener/shorturls/${id}/`, { method: 'DELETE' });
    shorturls.value = shorturls.value.filter((s) => s.id !== id);
  } catch (e) {
    errorMsg.value = 'Błąd usuwania linku.';
  }
};

onMounted(fetchShortUrls);
</script>

<style scoped lang="scss">

</style>
