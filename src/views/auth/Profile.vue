<template>
  <div class="container">
    <div class="login-box">
      <div class="text-center login-box-header">
        <h5><router-link to="/">bascio<span class="green-text">.dev</span></router-link></h5>
      </div>
      <div>
        <div>
          id: {{ user.id }}
        </div>
        <div>
          username: {{ user.username }}
        </div>
        <div>
          email: {{ user.email }}
        </div>
      </div>
      <div class="text-center">
        <router-link to="/tools">Tools</router-link>
        <br>
        <button @click="useAuthStore().logout()">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth.store";
import axios from 'axios';

let user = ref({
  id: null,
  username: null,
  email: null
});

onMounted(async () => {
  const response = await axios
      .get('users/me/')
      .catch((error) => console.error(error));

  if (response) {
    user.value.id = response.data.id;
    user.value.username = response.data.username;
    user.value.email = response.data.email;
  }
})
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
