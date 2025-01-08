export default defineEventHandler((event) => {
    const clientIP = getRequestHeaders(event)["x-forwarded-for"] || event.req.socket.remoteAddress || "unknown";
  
    // Attach client IP to the event for downstream use
    event.context.clientIP = clientIP;
  });
  