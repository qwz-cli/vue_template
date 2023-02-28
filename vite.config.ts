import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  // 设置反向代理，跨域
  server: {
    host: "0.0.0.0",
    port: 528, //更改启动端口
    // 反向代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000", //代理的地址
        changeOrigin: true,
      },
      "/sdk": {
        target: "http://127.0.0.1:3050", //sdk代理的地址
      },
    },
  },
});
