import { createRouter, createWebHashHistory } from "vue-router"

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../../pages/Home.vue"),
  },
  {
    path: "/note",
    name: "notePanel",
    component: () => import("../../pages/EditingPanel.vue"),
  },
  {
    path: "/register",
    name: "signup",
    component: () => import("../../components/auth/Registeration.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../../components/auth/Login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../../pages/404.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
