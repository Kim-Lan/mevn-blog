<script setup lang="ts">
import { computed } from 'vue'
import sourceData from '@/data.json'
import { formatDate } from '../utils/dateUtils'

const props = defineProps<{
  slug: string,
}>();

const post = sourceData.posts.find((post) => post.slug === props.slug);
</script>

<template>
  <section class="w-full md:w-3/4 lg:w-1/2 bg-white border-1 border-slate-200 rounded-lg overflow-hidden">
    <!-- Cover Photo -->
    <img :src="`/images/${post.cover}`" :alt="post.coverAlt">

    <div class="px-5 py-4">
      <h2 class="font-semibold text-2xl text-slate-800">{{ post.title }}</h2>
      <p class="text-sm text-slate-600 mb-2">
        @{{ post.author }} &middot; {{ formatDate(post.date) }}
      </p>

      <p
        v-for="(paragraph, index) in post.contents.split('\n')"
        :key="index"
        class="my-3 text-slate-800"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>
