<template>
  <router-view></router-view>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { onMounted } from 'vue';

onMounted(() => {
  const authStore = useAuthStore();
  authStore.loginFromSession();
});
</script>
