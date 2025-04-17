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
          <h5>Odzyskiwanie hasła</h5>
        </div>
      </template>

      <form class="space-y-4" @submit.prevent="recoverPassword">
        <UFormGroup label="Email">
          <UInput
            v-model="email"
            name="email"
            type="email"
            :color="emailError ? 'error' : undefined"
            tabindex="1"
          />
          <template #hint v-if="emailError">
            <span class="text-red-500">{{ emailError }}</span>
          </template>
        </UFormGroup>

        <UButton type="submit" color="primary" block>
          Odzyskaj hasło
        </UButton>
      </form>

      <div class="text-center mt-4">
        <NuxtLink to="/login">Masz już konto?</NuxtLink>
        <p class="p-0 m-2">
          Utwórz konto
          <NuxtLink to="/register" class="text-primary">tutaj</NuxtLink>
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const emailError = ref('');

const validateEmail = (): boolean => {
  if (!email.value.trim()) {
    emailError.value = 'Email jest wymagany';
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Niepoprawny format email';
    return false;
  }

  emailError.value = '';
  return true;
};

const recoverPassword = async () => {
  if (!validateEmail()) {
    return;
  }

  try {
    // Tutaj dodaj logikę odzyskiwania hasła
    useToast().add({
      title: 'Sukces',
      description: 'Instrukcje odzyskiwania hasła zostały wysłane na podany adres email',
      color: 'green',
    });
  } catch (error) {
    useToast().add({
      title: 'Błąd',
      description: 'Nie udało się wysłać instrukcji odzyskiwania hasła',
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
