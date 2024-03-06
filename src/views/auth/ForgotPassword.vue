<template>
  <div class="container">
    <div class="login-box">
      <div class="text-center login-box-header">
        <h5><router-link to="/">bascio<span class="green-text">.dev</span></router-link></h5>
        <h5>Recover password</h5>
      </div>
      <form method="post" class="form-group mb-2">
        <div v-if="!email_is_valid" class="alert alert-danger" role="alert">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="text" name="username" v-bind:class="{'form-control' : true, 'is-invalid': !email_is_valid}" tabindex="1">
          <div v-if="!email_is_valid" class="invalid-feedback">
            {{ email }}
          </div>
        </div>
        <button type="submit" name="login" class="btn btn-primary btn-login">Recover password</button>
      </form>
      <div class="text-center">
        <router-link to="/login">Have an account?</router-link>
        <p class="p-0 m-2">Create account <router-link to="/register">here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      email_is_valid: true,
    }
  },
  methods: {

  }
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
