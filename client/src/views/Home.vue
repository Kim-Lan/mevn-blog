<script setup lang="ts">
import sourceData from '@/data.json'
import { formatDate } from '../utils/dateUtils'

const posts = sourceData.posts;
</script>

<template>
  <div class="w-full md:w-3/4 lg:w-1/2 flex flex-col gap-6">
    <section v-for="post in posts.slice().reverse()" class="w-full bg-white border-1 border-slate-200 rounded-lg overflow-hidden">
      <!-- Cover Photo -->
      <div v-if="post.cover" class="h-50 md:h-60 lg:h-70 overflow-hidden flex flex-col justify-center">
        <img class="object-cover" :src="`/images/${post.cover}`" :alt="post.coverAlt">
      </div>

      <div class="px-4 py-3">
        <router-link  :to="{ name: 'post', params: { slug: post.slug }}">
          <h2 class="font-semibold text-2xl text-slate-800">{{ post.title }}</h2>
        </router-link>
        <p class="text-sm text-slate-600 mb-2">
          @{{ post.author }} &middot; {{ formatDate(post.date) }}
        </p>
        <p class="text-sm line-clamp-3 text-slate-800">
          {{ post.contents }}
        </p>
      </div>
    </section>
  </div>
</template>
