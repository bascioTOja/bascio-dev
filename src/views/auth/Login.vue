<template>
  <div class="container">
    <div class="login-box">
      <div class="text-center login-box-header">
        <h5>Log in to <router-link to="/">bascio<span class="green-text">.dev</span></router-link></h5>
      </div>
      <form method="post" class="form-group mb-2" @submit.prevent="handleLogin">
        <div v-if="!username_is_valid || !password_is_valid" class="alert alert-danger" role="alert">
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input v-model="form.username" type="text" name="username" v-bind:class="{'form-control' : true, 'is-invalid': !username_is_valid}" tabindex="1">
          <div v-if="!username_is_valid" class="invalid-feedback">
            {{ form.username }}
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password" type="password" name="password" v-bind:class="{'form-control' : true, 'is-invalid': !password_is_valid}" tabindex="2">
          <div v-if="!password_is_valid" class="invalid-feedback">
            {{ form.password}}
          </div>
        </div>
        <button type="submit" name="login" class="btn btn-primary btn-login">Log in</button>
      </form>
      <div class="text-center">
        <router-link to="/forgot-password">Forgot your password?</router-link>
        <p class="p-0 m-2">Create account <router-link to="/register">here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import {useAuthStore} from "@/stores/auth.store";

let username_is_valid = true;
let password_is_valid = true;

const form = {
  username: '',
  password: '',
}

const handleLogin = async () => {
  const authStore = useAuthStore();

  return authStore
      .login(form.username, form.password)
      .catch(error => console.error(error));
}

</script>

<style scoped lang="scss">
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
