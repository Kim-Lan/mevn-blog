<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <NavigationBar />

  <main>
    <router-view :key="$route.path"></router-view>
  </main>
</template>

