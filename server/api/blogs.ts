import { defineEventHandler, readBody, createError } from "h3";
import { trackIP } from "./tracker"; // Import the tracker function
import fs from "fs";
import path from "path";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

const blogsFilePath = path.resolve("data/blogs.json");

// Ensure blogs.json exists
const ensureBlogsFileExists = (): void => {
  if (!fs.existsSync(blogsFilePath)) {
    fs.writeFileSync(blogsFilePath, JSON.stringify([], null, 2), "utf-8");
  }
};

// Get blogs
const getBlogs = (): Blog[] => {
  ensureBlogsFileExists();
  const data = fs.readFileSync(blogsFilePath, "utf-8");
  return JSON.parse(data) as Blog[];
};

// Write blogs
const saveBlogs = (blogs: Blog[]): void => {
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), "utf-8");
};

// API handler
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    return getBlogs();
  }

  if (method === "POST") {
    // Enforce rate-limiting
    trackIP(event);

    const body = await readBody<Partial<Blog>>(event);
    if (!body.title || !body.content) {
      throw createError({ statusCode: 400, message: "Title and content are required." });
    }

    const blogs = getBlogs();
    const newBlog: Blog = {
      id: String(blogs.length + 1),
      title: body.title,
      content: body.content,
      author: body.author || "Anonymous",
      timestamp: new Date().toISOString(),
    };

    blogs.push(newBlog);
    saveBlogs(blogs);
    return { message: "Blog added successfully!", blog: newBlog };
  }

  throw createError({ statusCode: 405, message: "Method not allowed." });
});
