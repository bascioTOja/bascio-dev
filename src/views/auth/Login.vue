<template>
  <div class="container">
    <div class="login-box">
      <div class="text-center login-box-header">
        <h5>
          Log in to
          <router-link to="/">
            bascio<span class="green-text">.dev</span>
          </router-link>
        </h5>
      </div>
      <form class="form-group mb-2" method="post" @submit.prevent="doLogin">
        <div
          v-if="!username_is_valid || !password_is_valid"
          class="alert alert-danger"
          role="alert"
        >
          Invalid credentials
        </div>
        <div class="mb-3">
          <label class="form-label" for="username">Username</label>
          <input
            v-model="credentials.username"
            name="username"
            tabindex="1"
            type="text"
            v-bind:class="{
              'form-control': true,
              'is-invalid': !username_is_valid,
            }"
          />
          <div v-if="!username_is_valid" class="invalid-feedback">
            <!--            {{ credentials.username }}-->
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input
            v-model="credentials.password"
            name="password"
            tabindex="2"
            type="password"
            v-bind:class="{
              'form-control': true,
              'is-invalid': !password_is_valid,
            }"
          />
          <div v-if="!password_is_valid" class="invalid-feedback">
            <!--            {{ credentials.password }}-->
          </div>
        </div>
        <button class="btn btn-primary btn-login" name="login" type="submit">
          Log in
        </button>
      </form>
      <div class="text-center">
        <router-link to="/forgot-password">Forgot your password?</router-link>
        <p class="p-0 m-2">
          Create account
          <router-link to="/register">here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotification } from 'naive-ui';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
import router from '@/router';

const notification = useNotification();
const username_is_valid = ref(true);
const password_is_valid = ref(true);

const credentials = ref({
  username: '',
  password: '',
});

const doLogin = async () => {
  const authStore = useAuthStore();
  const loggedIn = await authStore.login({
    username: credentials.value.username,
    password: credentials.value.password,
  });

  if (loggedIn) {
    await router.push('/tools');
  } else {
    notification['error']({
      content: 'Error',
      meta: 'Invalid credentials',
      duration: 2500,
      keepAliveOnHover: true,
    });
    username_is_valid.value = false;
    password_is_valid.value = false;
  }
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
  background-color: #171717;
  padding: 20px;
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
