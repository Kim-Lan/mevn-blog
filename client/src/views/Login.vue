<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store.ts'

const isLoading = ref(false);

const email = ref('');
const password = ref('');

const auth = useAuthStore();

async function login() {
  try {
    isLoading.value = true;
    const user = await auth.login(email.value, password.value);
  } catch(error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="w-104">
    <form
      @submit.prevent="login"
      class="flex flex-col gap-4 bg-white p-8 rounded"
    >
      <h2 class="text-2xl text-slate-800">Login</h2>
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="Email"
        :disabled="isLoading"
        class="bg-slate-200 p-2 rounded"
      />
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Password"
        :disabled="isLoading"
        class="bg-slate-200 p-2 rounded"
      />
      <button class="bg-blue-400 text-white drop-shadow rounded p-2">Login</button>
    </form>
  </section>
</template>
