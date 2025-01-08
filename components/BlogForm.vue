<template>
  <div class="container">
    <div class="blog-form">
      <form @submit.prevent="handleSubmit">
        <!-- Blog Title -->
        <div class="form-group">
          <label for="title">Gossip Title</label>
          <input
            type="text"
            id="title"
            v-model="title"
            placeholder="A Good Introduction"
            required
          />
        </div>

        <!-- Blog Content -->
        <div class="form-group">
          <label for="content">Gossip Content</label>
          <textarea
            id="content"
            v-model="content"
            rows="5"
            placeholder="Say everything the way it happened"
            required
          ></textarea>
        </div>

        <!-- Blog Author -->
        <div class="form-group">
          <label for="author">Your Name? (Optional)</label>
          <input
            type="text"
            id="author"
            v-model="author"
            placeholder="Your name (or leave blank)"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit">Cast This Gossip! 🤣</button>
      </form>

      <!-- Success and Error Messages -->
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <div class="btn-wrap">
        <NuxtLink v-if="successMessage" to="/gossip" class="btn">
          Continue Gossiping Now! 😀
        </NuxtLink>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBlogs } from "~/composables/useBlogs";

const { submitBlog } = useBlogs();

// Reactive variables for form state
const title = ref<string>("");
const content = ref<string>("");
const author = ref<string>("");
const successMessage = ref<string>("");
const errorMessage = ref<string>("");

const handleSubmit = async (): Promise<void> => {
  try {
    // Submit the blog using the composable function
    await submitBlog({
      title: title.value,
      content: content.value,
      author: author.value,
    });

    // Reset the form on success
    successMessage.value = "Blog added successfully!";
    title.value = "";
    content.value = "";
    author.value = "";
    errorMessage.value = ""; // Clear any previous error messages
  } catch (error: any) {
    // Display the error message
    successMessage.value = ""; // Clear any previous success messages
    errorMessage.value = error.message || "An error occurred.";
  }
};
</script>

<style scoped>
.blog-form {
  @apply mx-auto w-full max-w-2xl;
}

.form-group {
  @apply mb-4;
}

label {
  @apply block mb-1 font-medium text-xl;
}

input,
textarea,
button {
  @apply w-full p-2 my-1 text-xl text-slate-800 outline-none rounded-md shadow-md;
}

button {
  background-color: var(--spice);
  @apply text-xl font-medium text-white rounded-md py-2;
}

.success-message {
  color: white;
  @apply text-xl font-medium text-center my-6;
}

.error-message {
  color: var(--spice);
  @apply text-xl font-medium text-center my-6;
}
</style>
