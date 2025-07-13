import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        production: "production/index.html",
        "in-development": "in-development/index.html",
        "page-not-found": "page-not-found/index.html",
      },
    },
  },
});
