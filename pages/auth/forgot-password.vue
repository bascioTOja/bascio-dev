<template>
  <Auth>
    <h2 class="text-center mb-4">Recover password</h2>

    <UForm
      :state="form"
      class="space-y-4 pb-2"
      @submit="doLogin"
    >
      <UAlert
        v-if="formError"
        color="red"
        variant="soft"
        icon="i-heroicons-exclamation-circle"
        title="Authentication Error"
        :description="formError"
      />

      <UFormField label="Email" name="email">
        <UInput
          v-model="form.email"
          class="w-full"
          placeholder="Enter your email"
          autocomplete="email"
          :ui="{
            base: 'auth-input',
          }"
          icon="i-heroicons-envelope"
        />
      </UFormField>

      <div class="pt-2">
        <UButton
          type="submit"
          color="green"
          variant="solid"
          block
          :loading="isLoading"
          size="lg"
        >
          Recover password
        </UButton>
      </div>
    </UForm>

    <template #links>
      <div>
        <NuxtLink to="/auth/login">
          Have an account?
        </NuxtLink>
      </div>
      <div>
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-green-400">
          Sign up
        </NuxtLink>
      </div>
    </template>
  </Auth>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Auth from '~/layouts/auth.vue';

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/profile',
  }
})

const isLoading = ref(false);
const formError = ref('');

const form = reactive({
  email: '',
});

const doLogin = async () => {
  isLoading.value = true;
  formError.value = '';

  isLoading.value = false;
};
</script>
