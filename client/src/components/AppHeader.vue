<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store.ts'
import { BASE_API_URL } from '../constants.js'

const route = useRoute();
const router = useRouter();

const auth = useAuthStore();

const searchTerm = ref('');

function search() {
  router.push({ name: 'search', query: { query: searchTerm.value }});
}

function logout() {
  auth.setUser(null);
  if (route.meta.requiresAuth) {
    router.push({ name: 'home' });
  }
}
</script>

<template>
  <header class="bg-blue-400 text-white border-b-4 border-slate-200 px-6 py-4 flex justify-between">
    <div class="flex flex-col md:flex-row gap-4 md:gap-6">
      <router-link to="/">
        <h1 class="font-bold text-3xl md:text-4xl hover:text-slate-200">MEVN Blog</h1>
      </router-link>
      <form
        @submit.prevent="search"
        class="md:self-end text-slate-700"
      >
        <input
          v-model="searchTerm"
          type="text"
          name="search"
          class="bg-slate-200 rounded-l-xl py-1 px-2"
        />
        <button
          class="bg-slate-300 hover:bg-slate-100 active:bg-slate-400 rounded-r-xl py-1 px-2"
        >
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
      </form>
    </div>

    <div class="flex items-start gap-4 font-bold text-sm md:text-base">
      <router-link :to="{ name: 'create' }">
        <div class="rounded-lg bg-slate-100 hover:bg-slate-300 active:bg-slate-400 text-slate-700 py-2 px-3">
          <font-awesome-icon :icon="['fas', 'plus']" />
          Create
        </div>
      </router-link>
      <router-link v-if="!auth.user" :to="{ name: 'login' }" class="p-2">
        <div class="flex flex-col justify-center hover:text-slate-200">
          Login
        </div>
      </router-link>
      <div v-else class="flex flex-col justify-center cursor-pointer hover:text-slate-200 py-2" @click="logout">
        Logout
      </div>
    </div>
  </header>
</template>
