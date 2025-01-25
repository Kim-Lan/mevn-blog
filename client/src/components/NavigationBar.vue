<template>
  <header class="bg-blue-400 text-white border-b-4 border-slate-600 px-6 py-4 flex justify-between">
    <router-link to="/">
      <h1 class="font-bold text-3xl">MEVN Blog</h1>
    </router-link>

    <div class="flex gap-4 font-bold">
      <div class="flex flex-col justify-center rounded-lg bg-blue-200 text-slate-600 px-3">
        <router-link :to="{ name: 'create' }">
          Create
        </router-link>
      </div>
      <div class="flex flex-col justify-center">
        <router-link :to="{ name: 'login' }" class="p-2">
          Login
        </router-link>
      </div>
    </div>
  </header>
</template>
