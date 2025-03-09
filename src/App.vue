<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-notification-provider>
      <router-view></router-view>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { onMounted } from 'vue';
import { NConfigProvider, NNotificationProvider, darkTheme } from 'naive-ui';

onMounted(() => {
  const authStore = useAuthStore();
  authStore.loginFromSession();
});

const themeOverrides = {
  common: {
    fontWeightStrong: '600',
    fontSize: '15px',
  },
  Button: {
    fontWeight: 'bold',
    borderRadiusMedium: '9px',
    // primary
    textColorPrimary: '#171717',
    textColorHoverPrimary: '#fff',
    colorPrimary: '#85C44D',
    colorHoverPrimary: '#598534',
    borderPrimary: '1px solid transparent',
    borderHoverPrimary: '1px solid transparent',
    //text
    textColorText: '#bfbfbf',
    textColorTextHover: '#85C44D',
  },

  // --color-main-text: #bfbfbf;
  // --color-main-background: #171717;
  // --color-border-dark: #292929;
  // --color-border: #3b3b3b;
  // --color-box-shadow: #000000;
  //
  // --dark-blue: #212636;
  // --blue: #4f5b82;
  // --brown: #614f4b;
  // --dark-green: #598534;
  // --green: #85C44D;
  // --yellow: #dec267;
  // --sand: #f4f1da;
};
</script>
