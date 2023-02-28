// !获取 vue3 原型

import { ComponentInternalInstance, getCurrentInstance } from "vue";
export default function useCurrentInstance() {
  const { appContext,proxy } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties;
  return {
    $this : globalProperties, // vue原型
    componentName:proxy?.$options.name // 组件名称
  };
}
