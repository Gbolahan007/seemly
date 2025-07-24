import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Exclude server folder from Vite processing
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Only process frontend file extensions
  },
  server: {
    // Proxy API requests to the backend
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
    // Restrict file system access to frontend folders
    fs: {
      allow: ["src", "public"], // Only allow src and public for frontend
    },
  },
});
