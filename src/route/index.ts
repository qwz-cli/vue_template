import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    // component: () => import("../views/Test.vue"),
    redirect: '/home'
  },
  {
    path: "/home",
    component: () => import("@/views/Home/Home.vue"),
  },
  {
    path: "/test",
    component: () => import("@/views/Test.vue"),
  },
];

// 创建路由
const router = createRouter({
  // 路由模式
  history: createWebHistory(),
  // 路由地址
  routes,
});

export default router;
