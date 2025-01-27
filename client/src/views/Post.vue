<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import sourceData from '@/data.json'
import { formatDate } from '../utils/dateUtils'
import { BASE_API_URL } from '../constants.js'

const props = defineProps<{
  slug: string,
}>();

const route = useRoute();
const router = useRouter();

const post = ref(null);

onMounted(() => getPost());

async function getPost() {
  try {
    const response = await fetch(`${BASE_API_URL}/api/post/${props.slug}`, {
      method: 'GET',
    });
    if (response && response.ok) {
      const data = await response.json();
      post.value = data;
    } else {
      router.push({
        name: 'NotFound',
        params: { pathMatch: route.path.substring(1).split('/') },
        query: route.query,
        hash: route.hash,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {

  }
}
</script>

<template>
  <section v-if="post" class="w-full md:w-3/4 lg:w-1/2 bg-white border-1 border-slate-200 rounded-lg overflow-hidden">
    <!-- Cover Photo -->
    <img v-if="post.cover" :src="`/images/${post.cover}`" :alt="post.coverAlt">

    <div class="px-5 py-4">
      <h2 class="font-semibold text-2xl text-slate-800">{{ post.title }}</h2>
      <p class="text-sm text-slate-600 mb-2">
        @{{ post.author.username }} &middot; {{ formatDate(post.date) }}
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
