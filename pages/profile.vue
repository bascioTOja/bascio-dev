<template>
  <div class="container flex items-center justify-center">
    <UCard class="profile-box">
      <div class="profile-box-header text-center">
        <h2 class="text-xl">
          User Profile on
          <NuxtLink to="/" class="font-bold hover:opacity-90 transition-opacity duration-200;">
            bascio<span class="text-green-400">.dev</span>
          </NuxtLink>
        </h2>
      </div>

      <div class="space-y-4 pb-4">
        <UDivider />

        <div class="flex flex-col items-center justify-center py-4">
          <UAvatar
            :src="`https://ui-avatars.com/api/?name=${userData.username}&background=random`"
            size="xl"
            class="mb-4"
          />
          <h3 class="text-xl font-bold">{{ userData.username }}</h3>
          <p class="text-gray-400">
            <UIcon name="i-heroicons-envelope" class="mr-1" />
            {{ userData.email }}
          </p>
          <p class="text-gray-500 text-sm mt-1">
            <UIcon name="i-heroicons-identification" class="mr-1" />
            ID: {{ userData.id }}
          </p>
        </div>

        <UDivider />

        <div class="space-y-4 pt-2">
          <UButton
            to="/"
            color="gray"
            block
            size="lg"
            icon="i-heroicons-arrow-left"
          >
            Back to Dashboard
          </UButton>

          <UButton
            color="red"
            block
            size="lg"
            icon="i-heroicons-arrow-right-on-rectangle"
            @click="logout"
          >
            Log Out
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { signOut } = useAuth();


// User data from the provided JSON
const userData = ref({
  email: "admin@test.pl",
  id: 2,
  username: "admin"
});

const logout = async () => {
  await signOut({ callbackUrl: '/login' });
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 20vh;
}

.profile-box-header {
  padding: 10px;
  margin-bottom: 10px;
  font-weight: bolder;
}

.profile-box {
  width: 375px;
  background-color: #171717;
  border-radius: var(--default-border-radius);
  margin: 20px;
  -webkit-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  -moz-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  box-shadow: 0 6px 20px 0 var(--color-box-shadow);
}
</style>
