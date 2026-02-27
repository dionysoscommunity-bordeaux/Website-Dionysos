export default defineEventHandler((event) => {
  setHeader(event, "X-Content-Type-Options", "nosniff");
  setHeader(event, "X-Frame-Options", "DENY");
  setHeader(event, "Referrer-Policy", "strict-origin-when-cross-origin");
  setHeader(event, "Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  setHeader(event, "Cross-Origin-Opener-Policy", "same-origin");
  setHeader(event, "Cross-Origin-Resource-Policy", "same-site");
});
