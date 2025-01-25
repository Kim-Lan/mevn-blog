<template>
  <div class="w-full md:w-3/4 lg:w-1/2 py-8 px-4">
    <form class="flex flex-col gap-4">
      <h2 class="text-2xl">Create New Post</h2>
      <input
        name="title"
        placeholder="Post Title"
        class="bg-slate-200 p-2 rounded"
      />
      <textarea rows="5" class="bg-slate-200 p-2 rounded"></textarea>
      <button class="bg-blue-400 text-white drop-shadow rounded p-2">Create Post</button>
    </form>
  </div>
</template>
