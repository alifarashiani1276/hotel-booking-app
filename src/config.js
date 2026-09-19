// Base URL of the json-server backend.
// - Local dev: falls back to http://localhost:5000
// - Production (Vercel): set VITE_API_URL to your deployed backend URL
const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_URL = rawUrl.replace(/\/+$/, "");
