<template>
  <Tools>
    <div class="mb-6">
      <UForm :state="formState" class="flex flex-wrap gap-2 items-end" @submit="onCreate">
        <UInput v-model="formState.name" placeholder="Name" class="w-40" required />
        <UInput v-model="formState.slug" placeholder="Slug (e.g. my-link)" class="w-40" required />
        <UInput v-model="formState.long_url" placeholder="Full URL" class="w-80" required />
        <UButton type="submit" color="green">Add</UButton>
      </UForm>
    </div>
    <UTable :data="shorturls" :columns="columns" class="mb-4">
      <template #actions="{ row }">
        <NuxtLink :to="`/tools/url-shortener/${row.id}`">
          <UButton size="xs" color="gray">Edit</UButton>
        </NuxtLink>
        <UButton size="xs" color="red" class="ml-2" @click="onDelete(Number(row.id))">Delete</UButton>
      </template>
    </UTable>
    <UAlert v-if="errorMsg" color="red" class="mt-2">{{ errorMsg }}</UAlert>
  </Tools>
</template>

<script setup lang="ts">
import Tools from '~/layouts/tools.vue';
import useApiFetch from '~/utils/apiFetch';
import { ref, reactive, onMounted, h } from 'vue';

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

interface CellContext {
  row: { original: ShortUrl };
}

const shorturls = ref<ShortUrl[]>([]);
const errorMsg = ref('');
const formState = reactive({ name: '', slug: '', long_url: '' });

const columns = [
  { id: 'id', label: 'ID', accessorKey: 'id', header: '#' },
  { id: 'name', label: 'Name', accessorKey: 'name' },
  { id: 'slug', label: 'Slug', accessorKey: 'slug' },
  { id: 'short_url', label: 'Short URL', accessorKey: 'short_url',
    cell: ({ row }: CellContext) => h('a', { href: row.original.short_url, target: '_blank', class: 'text-primary underline' }, row.original.short_url)
  },
  { id: 'long_url', label: 'Full URL', accessorKey: 'long_url',
    cell: ({ row }: CellContext) => h('a', { href: row.original.long_url, target: '_blank', class: 'text-muted underline' }, row.original.long_url)
  },
  { id: 'views', label: 'Views', accessorKey: 'views' },
  { id: 'actions', label: 'Actions', slot: 'actions' },
];

const fetchShortUrls = async () => {
  try {
    const { data } = await useApiFetch()('urlshortener/shorturls/');
    shorturls.value = Array.isArray(data.value) ? data.value : [];
  } catch {
    errorMsg.value = 'Error fetching links.';
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
      shorturls.value.push(data.value as ShortUrl);
      formState.name = '';
      formState.slug = '';
      formState.long_url = '';
    }
  } catch {
    errorMsg.value = 'Error adding link.';
  }
};

const onDelete = async (id: number) => {
  errorMsg.value = '';
  try {
    await useApiFetch()(`urlshortener/shorturls/${id}/`, { method: 'DELETE' });
    shorturls.value = shorturls.value.filter((s) => s.id !== id);
  } catch {
    errorMsg.value = 'Error removing link.';
  }
};

onMounted(fetchShortUrls);
</script>

<style scoped lang="scss">

</style>
