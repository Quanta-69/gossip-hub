<template>
    <div class="container wrapper" >
      <div v-if="blog" class="blog-detail w-full mx-auto max-w-lg">
        <h1 class="text-4xl text-center font-medium text-gray-400" >{{ blog.title }}</h1>
        <p class="font-normal text-2xl" >{{ blog.content }}</p>
        <p class="text-gray-400 " ><strong>Posted by: </strong> {{ blog.author || "Anonymous" }}</p>
        <p ><em>Posted on {{ new Date(blog.timestamp).toLocaleString() }}</em></p>
      </div>
      <p v-else>Gossip not found.</p>
      <div class="btn-wrap">
        <NuxtLink to="/gossip" class="btn" >Catch The Latest Gossip! ✨ </NuxtLink>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  import { useRoute } from "vue-router";
  import blogs from "@/data/blogs.json";
  
  interface Blog {
    id: string;
    title: string;
    author?: string;
    content: string;
    timestamp: string;
  }
  
  // Get the route object
  const route = useRoute();
  
  // Extract the blog ID from the URL
  const blogId = route.params.id as string;
  
  // Find the blog with the matching ID
  const blog: Blog | undefined = blogs.find((b) => b.id === blogId);
</script>
  
  <style scoped>
  .blog-detail {
    margin-top: 16px;
  }
  
  .blog-detail h1 {
    margin-bottom: 8px;
  }
  
  .blog-detail p {
    @apply my-10 text-wrap w-full text-center text-xl
  }
  </style>
  