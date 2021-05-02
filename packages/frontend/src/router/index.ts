import { clearAlerts } from "../store/alert"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../layouts/default.vue"),
    children: [
      {
        path: "/",
        component: () => import("../pages/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../layouts/auth.vue"),
    children: [
      {
        path: "/login",
        component: () => import("../pages/auth/login.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(to => {
  // Clear alerts on each route
  clearAlerts()

  // Shortcuts
  const shortcuts: { [key: string]: string } = {
    "/l": "/login",
    "/log": "/login",
    "/a": "/login",
    "/auth": "/login",
  }

  if (Object.keys(shortcuts).includes(to.path)) return shortcuts[to.path]
})

export default router
