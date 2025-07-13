import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        production: "production/index.html",
        "in-development": "in-development/index.html",
        404: "404/index.html",
      },
    },
  },
});
