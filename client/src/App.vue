<script setup lang="ts">
import AppContainer from './components/AppContainer.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <app-container>
    <app-header />
    <main class="flex flex-col items-center py-8 px-4">
      <router-view :key="$route.path"></router-view>
    </main>
    <app-footer />
  </app-container>
</template>

