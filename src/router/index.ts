import { useNoteDetailsState } from "@/store/noteDetails"
import { useUserActions } from "@/store/user"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createRouter, createWebHistory } from "vue-router"
import { useAuthActions } from "@/store/auth"

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
  // {
  //   path: "/:pathMatch(.*)",
  //   name: "NotFound",
  //   component: () => import("../pages/404.vue"),
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const { getUser } = useUserActions()
  const { isEditing } = useNoteDetailsState()
  const { setLoggedIn } = useAuthActions()

  if (to.name === "NotFound") {
    next()
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      // have to make a LoadApp function here
      await getUser()
      setLoggedIn(true)

      if (to.name === "notePanel") {
        if (isEditing.value) {
          next()
        } else {
          next({ name: "home" })
        }
      } else {
        next()
      }
    } else {
      setLoggedIn(false)
      next({ name: "login" })
    }
  } else {
    if (to.name === "login" || to.name === "signup") {
      if (await getCurrentUser()) {
        setLoggedIn(true)
        next({ name: "home" })
      } else {
        setLoggedIn(false)
        next()
      }
    }
  }
})

export default router
