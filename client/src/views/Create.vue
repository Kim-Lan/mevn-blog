<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BASE_API_URL } from '../constants.js'
import { useAuthStore } from '../stores/auth.store.ts'

const router = useRouter();
const auth = useAuthStore();

const errorMessage = ref('');
const isLoading = ref(false);

const title = ref('');
const contents = ref('');

async function createPost() {
  try {
    isLoading.value = true;
    let formData = new FormData(document.getElementById('createForm'));
    formData.append('author', auth.user.username);
    const response = await fetch(`${BASE_API_URL}/api/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      },
      body: formData,
    });
    if (response && response.ok) {
      const data = await response.json();
      router.push({ name: 'post', params: { slug: data.slug }});
    } else {
      errorMessage.value = response.statusText;
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section class="w-full md:w-3/4 lg:w-1/2">
    <form
      @submit.prevent="createPost"
      id="createForm"
      enctype="multipart/form-data"
      class="flex flex-col gap-4 bg-white p-8 rounded"
    >
      <h2 class="text-2xl text-slate-800">Create New Post</h2>
      <input
        class="border-3 border-dashed border-slate-200 bg-slate-100 text-slate-500 rounded p-2"
        type="file"
        name="cover"
      />
      <input
        v-model="title"
        name="title"
        placeholder="Post Title"
        class="bg-slate-200 p-2 rounded"
      />
      <textarea
        v-model="contents"
        name="contents"
        rows="5"
        class="bg-slate-200 p-2 rounded"
      ></textarea>
      <button class="bg-blue-400 hover:bg-blue-300 active:bg-blue-500 text-white drop-shadow rounded p-2">Create Post</button>
    </form>
  </section>
</template>
