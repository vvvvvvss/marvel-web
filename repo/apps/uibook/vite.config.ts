import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postcss from "rollup-plugin-postcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["ui/styles.css"],
    },
  },
  plugins: [
    react(),
    postcss({
      modules: true,
      minimize: true,
    }),
  ],
});
