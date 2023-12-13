import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
dotenv.config();

// Определение текущего окружения
const isDev = process.env.NODE_ENV === "development";
const apiProxyTarget = isDev
  ? process.env.VITE_API_PROXY_TARGET_DEV
  : process.env.VITE_API_PROXY_TARGET_PROD;
const fileProxyTarget = process.env.VITE_API_PROXY_TARGET_FILE;

console.debug("NODE_ENV:", process.env.NODE_ENV);
console.debug("apiProxyTarget:", apiProxyTarget);
console.debug("fileProxyTarget:", process.env.VITE_API_PROXY_TARGET_PROD);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api/": {
        target: apiProxyTarget,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        changeOrigin: true,
        configure: (proxy, options) => {
          console.log("CONFIGURE");
          proxy.on("proxyReq", function (proxyReq, req, res): void {
            console.log(`Proxying request to: ${req.url}`);
          });
        },
      },
      "/files/": {
        target: fileProxyTarget,
        rewrite: (path) => path.replace(/^\/files/, "/files"),
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "",
  build: {
    chunkSizeWarningLimit: 3000,
  },
});
