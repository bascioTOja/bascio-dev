<template>
  <Auth title="Log in to">
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

      <UFormField label="Username" name="username">
        <UInput
          v-model="form.username"
          class="w-full"
          placeholder="Enter your username"
          autocomplete="username"
          :ui="{
            base: 'auth-input',
          }"
          icon="i-heroicons-user"
        />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="form.password"
          class="w-full"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          :ui="{
            base: 'auth-input',
          }"
          icon="i-heroicons-lock-closed"
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
          Log in
        </UButton>
      </div>
    </UForm>

    <template #links>
      <div>
        <NuxtLink to="/auth/forgot-password">
          Forgot your password?
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

const { signIn } = useAuth()
const isLoading = ref(false);
const formError = ref('');

const form = reactive({
  username: '',
  password: ''
});

const doLogin = async () => {
  isLoading.value = true;
  formError.value = '';

  const credentials = {
    username: form.username,
    password: form.password,
  }

  await signIn(credentials, { callbackUrl: '/' })

  isLoading.value = false;
};
</script>
