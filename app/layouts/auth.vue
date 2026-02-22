<template>
  <div class="container flex items-center justify-center">
    <UCard class="login-box">
      <div class="login-box-header text-center">
        <h2 class="text-xl">
          <template v-if="title">{{ title }}</template>
          <NuxtLink to="/" class="font-bold hover:opacity-90 transition-opacity duration-200;">
            bascio<span class="text-green-400">.dev</span>
          </NuxtLink>
        </h2>
      </div>

      <slot />

      <div class="text-center space-y-1">
        <slot name="links"/>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.container {
  margin-top: 16vh;
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
