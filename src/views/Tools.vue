<template>
  <div id="content" class="main">
    <div class="container">
      <div class="content-header">
        <div class="btn btn-link">
          <router-link to="/">
            bascio<span class="green-text">.dev</span>
          </router-link>
        </div>
        <span class="content-header-title">
          <n-breadcrumb :theme-overrides="{ common: { fontSize: 17 } }">
            <n-breadcrumb-item>
              <router-link to="/tools">tools</router-link>
            </n-breadcrumb-item>
            <n-breadcrumb-item v-if="selectedCard">
              {{ selectedCard }}
            </n-breadcrumb-item>
          </n-breadcrumb>
        </span>
        <n-space vertical>
          <n-skeleton
            v-if="!authStore.initialized"
            round="true"
            :width="136.25"
            size="medium"
          />
          <div v-else-if="authStore.isLoggedIn">
            <n-button text class="btn-logout" @click="logOutHandler">
              logout
            </n-button>
            <router-link to="/me">
              <n-button type="primary">Account</n-button>
            </router-link>
          </div>
          <div v-else>
            <router-link to="/login">
              <n-button type="primary">Log in</n-button>
            </router-link>
          </div>
        </n-space>
      </div>
      <div class="content">
        <router-view />
        <template v-if="route.name === 'tools'">
          <ToolCard v-for="tool in tools" :key="tool.code" :card="tool" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolCard from '@/components/tools/ToolCard.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NButton,
  NSkeleton,
  NSpace,
} from 'naive-ui';

const route = useRoute();
const authStore = useAuthStore();

const tools = ref([]);

const selectedCard = computed(() => {
  return '----';
  // return toolsData.find((tool) => tool.code === route.name.replace("tools.", ""))?.title;
});

function logOutHandler() {
  authStore.logout();
}

onMounted(() => {
  axios
    .get('tools/')
    .then((response) => {
      if (response.status === 200) {
        tools.value = response.data;
      } else {
        tools.value = [];
      }
    })
    .catch((error) => {
      tools.value = [];
    });
});
</script>

<style lang="scss" scoped>
.container {
  margin-top: 5vh;
  min-height: 85vh;
  background-color: var(--color-main-background);
  border-radius: var(--default-border-radius);
  -webkit-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  -moz-box-shadow: 0 6px 20px 0 var(--color-box-shadow);
  box-shadow: 0 6px 20px 0 var(--color-box-shadow);
}

.content-header {
  border-bottom-color: var(--color-border);
  border-bottom-style: dashed;
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.content-header-title {
  font-weight: bold;
  font-size: calc(var(--default-font-size) * 1.5);
  text-transform: capitalize;
}

.content {
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  flex-direction: row;
  @media (max-width: 768px) {
    justify-content: center;
  }
}

.btn-logout {
  margin-right: 10px;
}
</style>
