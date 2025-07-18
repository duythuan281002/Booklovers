import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8081,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 8081, // đảm bảo cổng đúng
    },
  },
});
