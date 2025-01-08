<template>
    <div class="container">
      <div class="blog-form">
        <form @submit.prevent="submitBlog">
          <!-- Blog Title -->
          <div class="form-group">
            <label for="title">Gossip Title</label>
            <input type="text" id="title" v-model="blog.title" placeholder="A Good Introduction" required/>
          </div>
    
          <!-- Blog Content -->
          <div class="form-group">
            <label for="content">Gossip Content</label>
            <textarea id="content" v-model="blog.content" rows="5" placeholder="Say everything the way it happened" required></textarea>
          </div>
    
          <!-- Blog Author -->
          <div class="form-group">
            <label for="author">Your Name? (Optional)</label>
            <input type="text" id="author" v-model="blog.author" placeholder="Your name (or leave blank)"/>
          </div>
    
          <!-- Submit Button -->
          <button type="submit">Cast This Gossip! 🤣</button>
        </form>
    
        <!-- Success and Error Messages -->
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <div class="btn-wrap">
          <NuxtLink v-if="successMessage" to="/gossip" class="btn" >Continue Gossiping Now! 😀</NuxtLink>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>      
    </div>

  </template>
  
<script setup lang="ts">
  import { ref } from "vue";
  
  // Blog form state
  const blog = ref({
    title: "",
    content: "",
    author: "",
  });
  
  const successMessage = ref("");
  const errorMessage = ref("");
  
  // Submit blog function
  const submitBlog = async () => {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog.value),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit the blog");
      }
  
      // Clear form and display success message
      blog.value = { title: "", content: "", author: "" };
      successMessage.value = "Your Spicy Gossip Has Been Posted!";
      errorMessage.value = "";
    } catch (error: any) {
      // Handle errors
      successMessage.value = "";
      errorMessage.value = error.message || "An error occurred.";
    }
  };
</script>
  
  <style scoped>
  .blog-form {
    @apply mx-auto w-full max-w-2xl
  }
  
  .form-group {
    @apply mb-4
  }
  
  label {
    @apply block mb-1 font-medium text-xl
  }
  
  input,
  textarea,
  button {
    @apply w-full p-2 my-1 text-xl text-slate-800 outline-none rounded-md shadow-md
  }
  
  button {
    background-color: var(--spice);
    @apply text-xl font-medium text-white rounded-md py-2
  }
  .success-message {
    color: white;
    @apply text-xl font-medium text-center my-6
  }
  .error-message {
    color: var(--spice);
  }
  </style>
  