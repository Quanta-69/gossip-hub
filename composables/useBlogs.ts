import { ref } from "vue";
import type { Blog } from "~/types/Blog";

const blogs = ref<Blog[]>([]);
const errorMessage = ref<string>("");

export const useBlogs = () => {
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      blogs.value = await response.json();
    } catch (error: any) {
      errorMessage.value = error.message || "An error occurred.";
    }
  };

  const submitBlog = async (blog: Partial<Blog>) => {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit blog.");
      }
    } catch (error: any) {
      throw error.message || "An error occurred.";
    }
  };

  return { blogs, errorMessage, fetchBlogs, submitBlog };
};
