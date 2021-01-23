import store from "@/store"
import Vue from "vue"
import VueRouter, { RouteConfig, RouterMode } from "vue-router"
import { component } from "vue/types/umd"

Vue.use(VueRouter)

const mode: RouterMode = "history"

const routes: RouteConfig[] = [
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/pages/index.vue")
      },
      {
        path: "/announce",
        component: () => import("@/pages/announce.vue")
      },
      {
        path: "/poll",
        component: () => import("@/pages/poll.vue")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/layouts/auth.vue"),
    children: [
      {
        path: "/login",
        component: () => import("@/pages/auth/login.vue")
      },
      {
        path: "/login/discord",
        component: () => import("@/pages/auth/discord-login.vue")
      },
      {
        path: "/bot-authorize", // temporary till sim7k wakes his ass up
        component: () => import("@/pages/auth/discord-login.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Clear flash messages on each route
  store.dispatch("clearFlash")

  // Login redirects
  const redirectToLogin = [
    "/l",
    "/log",
    "/r",
    "/reg",
    "/register",
    "/a",
    "/auth"
  ]
  if (redirectToLogin.includes(to.matched[0].path)) return next("/login")

  next()
})

export default router
