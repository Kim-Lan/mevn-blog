<template>
  <section class="w-104">
    <form class="flex flex-col gap-4 bg-white p-8 rounded">
      <h2 class="text-2xl text-slate-800">Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        class="bg-slate-200 p-2 rounded"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        class="bg-slate-200 p-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="bg-slate-200 p-2 rounded"
      />
      <button class="bg-blue-400 text-white drop-shadow rounded p-2">Register</button>
    </form>
  </section>
</template>
