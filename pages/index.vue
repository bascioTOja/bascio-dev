<template>
  <div class="container">
    <UCard class="mx-auto my-8 max-w-lg">
      <template #header>
        <h1 class="text-xl font-bold">Bascio.dev</h1>
      </template>

      <div class="space-y-6">
        <p>Witaj w projekcie korzystającym z dostosowanego motywu Nuxt UI.</p>

        <div class="grid gap-4">
          <h2 class="text-lg font-bold mt-2">Przyciski</h2>
          <div class="flex flex-wrap gap-2">
            <UButton color="primary">Zielony</UButton>
            <UButton color="secondary">Brązowy</UButton>
            <UButton color="blue">Niebieski</UButton>
            <UButton color="yellow">Żółty</UButton>
            <UButton color="sand">Piaskowy</UButton>
            <UButton color="neutral">Neutralny</UButton>
          </div>

          <h2 class="text-lg font-bold mt-2">Warianty przycisków</h2>
          <div class="flex flex-wrap gap-2">
            <UButton color="green" variant="solid">Solid</UButton>
            <UButton color="green" variant="outline">Outline</UButton>
            <UButton color="green" variant="ghost">Ghost</UButton>
            <UButton color="green" variant="soft">Soft</UButton>
          </div>

          <h2 class="text-lg font-bold mt-2">Komponenty formularzy</h2>
          <UInput placeholder="Wprowadź tekst" />
          <USelect :options="['Opcja 1', 'Opcja 2', 'Opcja 3']" placeholder="Wybierz opcję" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
// Kod komponentu
</script>
