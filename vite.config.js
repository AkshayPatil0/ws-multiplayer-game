import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

const root = resolve(__dirname, "client");
const outDir = resolve(__dirname, "public");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(root, "index.html"),
          game: resolve(root, "game", "index.html"),
        },
      },
    },
    root,
    define: {
      process: {
        env: {
          WS_API: env.WS_API,
        },
      },
    },
  };
});
