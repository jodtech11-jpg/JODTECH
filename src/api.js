const isDevelopment = window.location.hostname === "localhost";

export const API_BASE_URL = isDevelopment 
  ? "http://localhost:5000" 
  : ""; // Production: relative path for Vercel functions
