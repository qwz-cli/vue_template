import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
const app = createApp(App);

// 路由
import router from "./route/index.js";
app.use(router);

// pinia
import {createPinia} from 'pinia';
const pinia = createPinia()
app.use(pinia)

app.mount("#app");
