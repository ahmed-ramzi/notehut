import { useUserActions, useUserState } from "@/store/user"
import { createRouter, createWebHashHistory } from "vue-router"

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/note",
    name: "notePanel",
    component: () => import("../pages/EditingPanel.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "signup",
    component: () => import("../components/auth/Registeration.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/auth/Login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../pages/404.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   const { getUser, getTest } = useUserActions()
//   const { user } = useUserState()

//   console.log(user.value?.id)
//   let isLoggedin = false
//   if (await getTest()) {
//     isLoggedin = true
//   }
//   console.log(isLoggedin)
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (isLoggedin) {
//       next()
//     } else {
//       next("/login")
//     }
//   } else {
//     if ((to.name === "login" || to.name === "signup") && isLoggedin) {
//       next("/")
//     } else {
//       next()
//     }
//   }
// })

export default router
