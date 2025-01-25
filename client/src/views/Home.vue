<script setup lang="ts">
import sourceData from '@/data.json'
import { formatDate } from '../utils/dateUtils'

const posts = sourceData.posts;
</script>

<template>
  <div class="w-full md:w-3/4 lg:w-1/2 flex flex-col py-8 px-4 gap-4">
    <div v-for="post in posts.slice().reverse()" class="w-full bg-white border-1 border-slate-200 py-2 px-3 rounded-lg">
      <router-link  :to="{ name: 'post', params: { id: post.id, slug: post.slug }}">
        <h2 class="font-semibold text-2xl">{{ post.title }}</h2>
      </router-link>
      <p class="text-sm text-slate-600 mb-2">@{{ post.author }} &middot; {{ formatDate(post.date) }}</p>
      <p class="text-sm line-clamp-3">{{ post.contents }}</p>
    </div>
  </div>
</template>
