import { useNoteDetailsState } from "@/store/noteDetails"
import { useUserActions } from "@/store/user"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createRouter, createWebHistory } from "vue-router"
import { useAuthActions } from "@/store/auth"
import { useNotesListActions } from "@/store/notesList"

export const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("../pages/HomePage.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  // {
  //   path: "/test",
  //   name: "TestPage",
  //   component: () => import("../pages/TestPage.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    path: "/groups",
    name: "GroupsPage",
    component: () => import("../pages/GroupsPage.vue"),
    meta: {
      requiresAuth: true,
    },
    props: (route: any) => ({
      initData: {
        groupId: route.params.groupId,
      },
    }),
  },
  {
    path: "/group/:groupId?",
    name: "GroupPage",
    component: () => import("../pages/GroupPage.vue"),
    meta: {
      requiresAuth: true,
    },
    props: (route: any) => ({
      initData: {
        groupId: route.params.groupId,
      },
    }),
  },
  {
    path: "/note",
    name: "EditPanel",
    component: () => import("../pages/EditingPanel.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shared-note",
    name: "SharedEditingPanel",
    component: () => import("../pages/EditingPanel.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings/avatars",
    name: "AvatarsPage",
    component: () => import("../pages/AvatarsPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/registerByRamzi",
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

      if (to.name === "EditPanel") {
        if (isEditing.value) {
          next()
        } else {
          next({ name: "HomePage" })
        }
      } else if (to.name === "SharedEditingPanel") {
        if (isEditing.value) {
          next()
        } else {
          next({ name: "GroupsPage" })
        }
      } else if (from.name === "GroupPage" && to.name !== "SharedEditingPanel") {
        const { clearSharedNotes } = useNotesListActions()
        clearSharedNotes()
        next()
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
        next({ name: "HomePage" })
      } else {
        setLoggedIn(false)
        next()
      }
    }
  }
})

export default router
