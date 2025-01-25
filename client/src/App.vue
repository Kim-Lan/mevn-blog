<script setup lang="ts">
</script>

<template>
  <header>
    <router-link to="/">
      <h1 class="font-bold text-3xl">MEVN Blog</h1>
    </router-link>
  </header>

  <main>
    <router-view :key="$route.path"></router-view>
  </main>
</template>

