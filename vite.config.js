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
          game: resolve(root, "game.html"),
        },
        output: {
          assetFileNames: `assets/[name].[ext]`,
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
    plugins: [
      {
        name: "add-data-preload-attr",
        transformIndexHtml(html) {
          return html.replace(
            new RegExp('property="og:image"', "g"),
            `property="og:image"`
          );
        },
      },
    ],
  };
});
