import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  // 存放数据
  state: () => {
    return {
      num: 0,
    };
  },
  // 修改数据（类似计算属性）
  getters: {},
  // 方法
  actions: {},
});
