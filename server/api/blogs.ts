import fs from "fs";
import path from "path";

// Define types for better TypeScript support
interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

interface IPTracker {
  [key: string]: string; // Key is IP address, value is timestamp
}

// Path to the blogs.json file
const blogsFilePath = path.resolve("data/blogs.json");

// In-memory IP tracker
const ipTracker: IPTracker = {};

// Helper: Read blogs from JSON file
const readBlogs = (): Blog[] => {
  const data = fs.readFileSync(blogsFilePath, "utf-8");
  return JSON.parse(data) as Blog[];
};

// Helper: Write blogs to JSON file
const writeBlogs = (blogs: Blog[]): void => {
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), "utf-8");
};

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === "GET") {
    // Fetch blogs
    const blogs = readBlogs();
    return blogs;
  }

  if (method === "POST") {
    // Handle blog submission
    const body = await readBody<Partial<Blog>>(event);
    const { title, content, author } = body;
    const clientIP = getRequestHeaders(event)["x-forwarded-for"] || event.req.socket.remoteAddress || "unknown";

    // Input validation
    if (!title || !content) {
      throw createError({ statusCode: 400, message: "Title and content are required." });
    }

    // Rate limit: Check if the user has posted in the last 20 minutes
    const lastSubmissionTime = ipTracker[clientIP];
    const now = new Date();

    if (lastSubmissionTime && (now.getTime() - new Date(lastSubmissionTime).getTime()) < 0 * 60 * 1000) {
      throw createError({ statusCode: 429, message: "You can only post once every 20 minutes." });
    }

    // Update IP tracker
    ipTracker[clientIP] = now.toISOString();

    // Append blog to JSON file
    const blogs = readBlogs();
    const newBlog: Blog = {
      id:  String(blogs.length + 1),
      title,
      content,
      author: author || "Anonymous",
      timestamp: now.toISOString(),
    };
    blogs.push(newBlog);
    writeBlogs(blogs);

    return { message: "Spicy Gossip Posted successfully!", blog: newBlog };
  }
});
