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
            theme: "tokyo-night",
            keepBackground: true, 
            defaultLang: "plaintext",
          },
        ],
      ],
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
