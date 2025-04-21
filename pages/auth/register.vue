<template>
  <Auth title="Sign up to">
    <UForm
      :state="form"
      class="space-y-4 pb-2"
      @submit="doSignUp"
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

      <UFormField label="Re-password" name="re_password">
        <UInput
          v-model="form.re_password"
          class="w-full"
          type="re_password"
          placeholder="Enter your password again"
          autocomplete="current-password"
          :ui="{
            base: 'auth-input',
          }"
          icon="i-heroicons-lock-closed"
        />
      </UFormField>

      <div class="pt-2">
<!--          <UButton-->
<!--            type="submit"-->
<!--            color="green"-->
<!--            variant="solid"-->
<!--            block-->
<!--            :loading="isLoading"-->
<!--            size="lg"-->
<!--          >-->
<!--            Sign up-->
<!--          </UButton>-->
        <UButton
          type="submit"
          color="error"
          variant="solid"
          block
          :loading="isLoading"
          size="lg"
        >
          SIGN UP IS CLOSE
        </UButton>
      </div>
    </UForm>

    <template #links>
      <div>
        <NuxtLink to="/auth/login">Have an account?</NuxtLink>
      </div>
    </template>
  </Auth>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Auth from '~/layouts/Auth.vue';

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/profile',
  }
})

const isLoading = ref(false);
const formError = ref('');

const form = reactive({
  username: '',
  email: '',
  password: '',
  re_password: '',
});

const doSignUp = async () => {
  isLoading.value = true;
  formError.value = '';

  // isLoading.value = false;
};
</script>
