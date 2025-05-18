<template>
  <UContainer class="mx-auto mt-[5vh] min-h-[85vh] bg-(--ui-bg) rounded-(--default-border-radius) pr-[.75rem] pl-[.75rem] shadow-default">
    <div class="content-header border-b border-dashed border-(--ui-border) p-3 flex flex-wrap justify-between items-center">
      <div class="btn-link">
        <NuxtLink to="/" class="font-bold hover:opacity-90 transition-opacity duration-200">
          bascio<span class="text-green-400">.dev</span>
        </NuxtLink>
      </div>

      <span class="content-header-title">
<!--          <UBreadcrumb class="text-lg">-->
<!--            <UBreadcrumbItem to="/tools">tools</UBreadcrumbItem>-->
<!--            <UBreadcrumbItem v-if="selectedCard">-->
<!--              {{ selectedCard }}-->
<!--            </UBreadcrumbItem>-->
<!--          </UBreadcrumb>-->
      </span>

      <div class="flex flex-col">
        <USkeleton v-if="isLoading" class="h-9 w-[136px]" />
        <div v-else-if="status === 'authenticated'" class="flex items-center">
          <UButton
            color="gray"
            variant="ghost"
            class="mr-2"
            @click="logOutHandler"
          >
            logout
          </UButton>
          <NuxtLink to="/profile">
            <UButton color="green" class="font-bold">Account</UButton>
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink to="/auth/login">
            <UButton color="green" class="font-bold">Log in</UButton>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="p-4">
      <slot />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { signOut, status } = useAuth();
const isLoading = computed(() => status.value === 'loading');

const logOutHandler = async () => {
  await signOut({ callbackUrl: '/' });
};
</script>

<style scoped lang="scss">
.shadow-default {
  -webkit-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  -moz-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  box-shadow: 0 6px 20px 0 var(--color-box-shadow);
}

.content-header-title {
  font-weight: bold;
  font-size: calc(var(--default-font-size) * 1.5);
  text-transform: capitalize;
}
</style>
