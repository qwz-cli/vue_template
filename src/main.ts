import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
const app = createApp(App);

// 路由
import router from "./route/index.js";
app.use(router);

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

// 多语言
import i18n from "@/language";
app.use(i18n);

// 性能sdk
import sdk from "monitor-sdk_plugins";
app.use(sdk);

// 批量使用我的插件
import myPlugins from "@/plugins";
app.use(myPlugins);

// 注册全部 element图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}


// 页面引导 
import  'v3-tour/dist/vue-tour.css'
import VueTour from 'v3-tour' 
app.use(VueTour);

// 引入饿了么全部css样式
import "element-plus/dist/index.css";

app.mount("#app");
