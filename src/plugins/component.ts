import { App } from "vue";
import * as component from "@/components/myComponents/mode";



export default {
  install(app: App) {
    // 全局注册二次封闭组件
    for (let key in component) {
      app.component(key, (component as any)[key]);
    }
  },
};
