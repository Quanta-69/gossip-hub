import { H3Event, createError } from "h3";

interface IPTracker {
  [key: string]: string; // Maps client IP to timestamp (ISO string)
}

const ipTracker: IPTracker = {};

// Middleware to enforce rate-limiting (e.g., one blog submission every 20 minutes)
export const trackIP = (event: H3Event, rateLimitMinutes = 20): void => {
  const clientIP =
    event.req.headers["x-forwarded-for"] || event.req.socket.remoteAddress || "unknown";

  const now = new Date();
  const lastSubmission = ipTracker['clientIP'];
  
  if (lastSubmission) {
    const lastSubmissionTime = new Date(lastSubmission);
    const timeElapsed = (now.getTime() - lastSubmissionTime.getTime()) / (60 * 1000); // Minutes

    if (timeElapsed < rateLimitMinutes) {
      throw createError({
        statusCode: 429,
        message: `Please wait ${
          rateLimitMinutes - Math.floor(timeElapsed)
        } minutes before submitting another blog.`,
      });
    }
  }

  // Update tracker with the current timestamp
  ipTracker['clientIP'] = now.toISOString();
};
