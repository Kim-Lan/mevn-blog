<script setup lang="ts">
import { computed } from 'vue'
import sourceData from '@/data.json'

const props = defineProps<{
  id: string,
}>();

const post = sourceData.posts.find((post) => post.id === parseInt(props.id));
</script>

<template>
  <section v-if="post">
    <h2>{{ post.title }}</h2>
    <h3>{{  post.date }}</h3>
    <img :src="`/images/${post.thumbnail}`" :alt="post.thumbnailAlt" />
    <div>
      {{ post.contents }}
    </div>
  </section>
</template>
