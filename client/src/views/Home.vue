<script setup>
import sourceData from '@/data.json'

const posts = sourceData.posts;
</script>

<template>
  <div>
    <h1>Home</h1>
  </div>
  <router-link v-for="post in posts" :to="{ name: 'post', params: { id: post.id, slug: post.slug }}">{{ post.title }}</router-link>
</template>
