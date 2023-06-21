import { useNoteDetailsState } from "@/store/noteDetails"
import { useUserActions } from "@/store/user"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createRouter, createWebHistory } from "vue-router"
import { useAuthActions } from "@/store/auth"
import { useNotesListActions } from "@/store/notesList"
import envConfig from "@/envConfig"
import { Routes } from "./routes"

const testPath = {
  path: "/test",
  name: Routes.TEST_PAGE,
  component: () => import("../pages/TestPage.vue"),
  meta: {
    requiresAuth: true,
  },
}

export const routes = [
  {
    path: "/",
    name: Routes.HOME_PAGE,
    component: () => import("../pages/HomePage.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/groups",
    name: Routes.GROUPS_PAGE,
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
    name: Routes.GROUP_PAGE,
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
    name: Routes.EDIT_PANEL,
    component: () => import("../pages/EditingPanel.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shared-note",
    name: Routes.SHARED_EDITING_PANEL,
    component: () => import("../pages/EditingPanel.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings/avatars",
    name: Routes.AVATARS_PAGE,
    component: () => import("../pages/AvatarsPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/registerByRamzi",
    name: Routes.SIGN_UP,
    component: () => import("../components/auth/Registeration.vue"),
  },
  {
    path: "/login",
    name: Routes.LOGIN,
    component: () => import("../components/auth/Login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: Routes.NOT_FOUND,
    component: () => import("../pages/404.vue"),
  },
]

if (envConfig.isProd) {
  routes.push(testPath)
}

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
