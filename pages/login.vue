<template>
  <div class="container flex items-center justify-center">
    <UCard class="login-box">
      <div class="login-box-header text-center">
        <h2 class="text-xl">
          Log in to
          <NuxtLink to="/" class="font-bold hover:opacity-90 transition-opacity duration-200;">
            bascio<span class="text-green-400">.dev</span>
          </NuxtLink>
        </h2>
      </div>

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

      <div class="text-center space-y-1">
        <div>
          <NuxtLink to="/forgot-password" class="transition-colors duration-200">
            Forgot your password?
          </NuxtLink>
        </div>
        <div>
          Don't have an account?
          <NuxtLink to="/register" class="transition-colors duration-200">
            Sign up
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
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

<style lang="scss" scoped>
.container {
  margin-top: 20vh;
}

.login-box-header {
  padding: 10px;
  margin-bottom: 10px;
  font-weight: bolder;
}

.login-box {
  width: 325px;
  background-color: #171717;
  border-radius: var(--default-border-radius);
  margin: 20px;
  -webkit-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  -moz-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  box-shadow: 0 6px 20px 0 var(--color-box-shadow);
}

.btn-login {
  width: 100%;
  margin-top: 10px;
}
</style>
