<template>
  <header class="bg-blue-400 text-white border-b-4 border-slate-200 px-6 py-4 flex justify-between">
    <router-link to="/">
      <h1 class="font-bold text-4xl">MEVN Blog</h1>
    </router-link>

    <div class="flex gap-4 font-bold">
      <router-link :to="{ name: 'create' }">
        <div class="rounded-lg bg-slate-100 text-slate-700 py-2 px-3">
          <font-awesome-icon :icon="['fas', 'plus']" />
          Create
        </div>
      </router-link>
      <router-link :to="{ name: 'login' }" class="p-2">
        <div class="flex flex-col justify-center">
          Login
        </div>
      </router-link>
    </div>
  </header>
</template>
