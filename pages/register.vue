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

      <form class="space-y-4" @submit.prevent="doRegister">
        <UAlert
          v-if="formError"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-circle"
        >
          Proszę poprawić błędy w formularzu
        </UAlert>

        <UFormGroup label="Nazwa użytkownika">
          <UInput
            v-model="form.username"
            name="username"
            :color="errors.username ? 'error' : undefined"
            tabindex="1"
          />
          <template #hint v-if="errors.username">
            <span class="text-red-500">{{ errors.username }}</span>
          </template>
        </UFormGroup>

        <UFormGroup label="Email">
          <UInput
            v-model="form.email"
            name="email"
            type="email"
            :color="errors.email ? 'error' : undefined"
            tabindex="2"
          />
          <template #hint v-if="errors.email">
            <span class="text-red-500">{{ errors.email }}</span>
          </template>
        </UFormGroup>

        <UFormGroup label="Hasło">
          <UInput
            v-model="form.password"
            name="password"
            type="password"
            :color="errors.password ? 'error' : undefined"
            tabindex="3"
          />
          <template #hint v-if="errors.password">
            <span class="text-red-500">{{ errors.password }}</span>
          </template>
        </UFormGroup>

        <UFormGroup label="Powtórz hasło">
          <UInput
            v-model="form.re_password"
            name="re_password"
            type="password"
            :color="errors.re_password ? 'error' : undefined"
            tabindex="4"
          />
          <template #hint v-if="errors.re_password">
            <span class="text-red-500">{{ errors.re_password }}</span>
          </template>
        </UFormGroup>

        <UButton type="submit" color="primary" block>
          Zarejestruj się
        </UButton>
      </form>

      <div class="text-center mt-4">
        <NuxtLink to="/login">Masz już konto?</NuxtLink>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const formError = ref(false);

interface FormData {
  username: string;
  email: string;
  password: string;
  re_password: string;
}

const form = ref<FormData>({
  username: '',
  email: '',
  password: '',
  re_password: '',
});

const errors = ref({
  username: '',
  email: '',
  password: '',
  re_password: '',
});

const validateForm = (): boolean => {
  let isValid = true;
  errors.value = {
    username: '',
    email: '',
    password: '',
    re_password: '',
  };

  if (!form.value.username.trim()) {
    errors.value.username = 'Nazwa użytkownika jest wymagana';
    isValid = false;
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email jest wymagany';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Niepoprawny format email';
    isValid = false;
  }

  if (!form.value.password) {
    errors.value.password = 'Hasło jest wymagane';
    isValid = false;
  }

  if (form.value.password !== form.value.re_password) {
    errors.value.re_password = 'Hasła nie są identyczne';
    isValid = false;
  }

  return isValid;
};

const doRegister = async () => {
  formError.value = false;

  if (!validateForm()) {
    formError.value = true;
    return;
  }

  try {
    useToast().add({
      title: 'Sukces',
      description: 'Konto zostało utworzone',
      color: 'green',
    });

    await router.push('/login');
  } catch (error) {
    formError.value = true;
    useToast().add({
      title: 'Błąd',
      description: 'Nie udało się utworzyć konta',
      color: 'error',
    });
  }
};
</script>

<style scoped>
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
