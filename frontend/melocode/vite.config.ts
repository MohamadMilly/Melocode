import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "tokyo-night", // Changes the code block theme to a VS Code theme
            keepBackground: true, // Keeps the editor background color
            defaultLang: "plaintext",
          },
        ],
      ], // Adds IDs to <h1>, <h2> for linking
      providerImportSource: "@mdx-js/react",
    }),
  ],
  server: {
    proxy: {
      "/compiler-api": {
        target: "https://api.onlinecompiler.io",
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/compiler-api/, ""),
      },
    },
  },
});
