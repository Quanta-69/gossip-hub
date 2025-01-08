<template>
  <div class="container wrapper">
    <h1 class="text-center text-5xl font-semibold my-6">
      Our Latest <span class="text-[var(--spice)]">Gossips</span> 🌶👀
    </h1>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else class="cards">
      <div v-for="blog in blogs" :key="blog.id" class="blog-card">
        <h1 class="text-2xl font-medium w-full truncate">{{ blog.title }}</h1>
        <p class="truncate w-full">{{ blog.content }}</p>
        <p><strong>Posted by:</strong> {{ blog.author || "Anonymous" }}</p>
        <p><em>Posted on {{ new Date(blog.timestamp).toLocaleString() }}</em></p>
        <NuxtLink class="btn" :to="`/gossip/${blog.id}`">Full Gist! 😀</NuxtLink>
      </div>
    </div>
    <p v-if="blogs.length === 0" class="text-3xl text-center font-medium my-8">
      Loading latest gossip...
    </p>
    <h1 class="text-2xl font-medium text-center my-2">
      Oh! Refresh for more gossip! 😂
    </h1>
    <h1 class="text-2xl font-medium text-center my-2">
      Orrrrrr Publish yours! 😉
    </h1>
    <div class="btn-wrap">
      <NuxtLink to="/addgist" class="btn mx-auto">Publish Your Own Gossip!</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useBlogs } from "~/composables/useBlogs";

// Fetch blogs using the composable
const { blogs, errorMessage, fetchBlogs } = useBlogs();

onMounted(() => {
  fetchBlogs();
});
</script>

<style scoped>
.cards {
  .blog-card {
    @apply w-full max-w-md rounded-md shadow-lg border-2 p-2 flex-col flex items-start justify-center gap-3;
  }
  @apply w-full flex items-center justify-center gap-4 flex-wrap-reverse mx-auto p-2 sm:justify-start;
}
</style>
