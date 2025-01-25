<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import sourceData from '@/data.json'

const route = useRoute();

const postId = parseInt(route.params.id);
const post = sourceData.posts.find((post) => post.id === postId);
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
