<template>
  <div class="container">
    <UCard class="login-box">
      <template #header>
        <div class="text-center login-box-header">
          <h5>
            <NuxtLink to="/">
              bascio<span class="text-primary">.dev</span>
            </NuxtLink>
          </h5>
        </div>
      </template>

      <div class="space-y-2">
        <div class="grid grid-cols-2 gap-2">
          <div class="font-medium">ID:</div>
          <div>{{ user.id }}</div>

          <div class="font-medium">Nazwa użytkownika:</div>
          <div>{{ user.username }}</div>

          <div class="font-medium">Email:</div>
          <div>{{ user.email }}</div>
        </div>
      </div>

      <div class="text-center mt-4 space-y-2">
        <NuxtLink to="/tools">
          <UButton color="primary" variant="outline" block>
            Narzędzia
          </UButton>
        </NuxtLink>

        <UButton color="red" variant="soft" block @click="logout">
          Wyloguj się
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth.store';

interface User {
  id: number | null;
  username: string | null;
  email: string | null;
}

const user = ref<User>({
  id: null,
  username: null,
  email: null,
});

onMounted(async () => {
  try {
    const response = await useFetch('/api/users/me');

    if (response.data.value) {
      user.value = {
        id: response.data.value.id,
        username: response.data.value.username,
        email: response.data.value.email,
      };
    }
  } catch (error) {
    useToast().add({
      title: 'Błąd',
      description: 'Nie udało się pobrać danych profilu',
      color: 'red',
    });
  }
});

const logout = async () => {
  // const authStore = useAuthStore();
  // await authStore.logout();
  await navigateTo('/login');
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20vh;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
}

.login-box-header {
  padding: 10px;
  margin-bottom: 10px;
  font-weight: bolder;
}

.login-box {
  width: 325px;
  margin: 20px;
}
</style>
