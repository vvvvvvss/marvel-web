import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["ui/styles.css"],
    },
  },
  resolve: {
    alias: {
      ui: path.resolve(__dirname, "../../packages/ui/dist"),
    },
  },
  plugins: [react()],
});
