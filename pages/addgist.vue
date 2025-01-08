<template>
    <div class="wrapper">
      <BlogForm />
    </div>
  </template>
  
  <script setup lang="ts">
  import BlogForm from "~/components/BlogForm.vue";
  </script>
  
  <style scoped>
  .wrapper {
    background: url(../assets/img/gossip.svg) center/contain fixed no-repeat;
    border-image: fill 0 linear-gradient(40deg, black, rgba(0, 0, 0, 0.201)) !important;
    border-radius: 0.1cm !important;
  }
  </style>
  