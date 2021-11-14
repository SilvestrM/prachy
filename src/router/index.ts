import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import LandingPage from "@/views/LandingPage.vue"
import store from "@/store/"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: (to) => {
      if (store.getters.isAuthenticated) {
        return { name: "Dashboard" }
      } else {
        return { name: "LandingPage" }
      }
    },
  },
  {
    path: "/welcome",
    name: "LandingPage",
    component: LandingPage,
    meta: { noMenu: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/transactions",
    name: "Transactions",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: { requiresAuth: true },
    component: () => import("../views/Transactions.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/settings/SettingsLayout.vue"),
    redirect: { name: "AccountSettings" },
    meta: { requiresAuth: true },
    children: [
      {
        path: "account",
        name: "AccountSettings",
        component: () => import("../views/settings/Account.vue"),
        // components: {
        // 	settingsView: () => import("../views/settings/Account.vue"),
        // },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && store.getters.isAuthenticated) {
    next()
  } else {
    if (to.name === "LandingPage") {
      next()
    } else {
      next({ name: "LandingPage" })
    }
  }
})

export default router
