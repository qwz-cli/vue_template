import { defineStore } from "pinia";

export const globalStore = defineStore("global", {
  // 存放数据
  state: () => {
    return {
        language:'en'
    };
  },
  // 修改数据（类似计算属性）
  getters: {},
  // 方法
  actions: {},
});
