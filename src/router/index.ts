import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import LandingPage from "@/views/LandingPage.vue";
import store from "@/store/";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "LandingPage",
		component: LandingPage,
		meta: { public: true },
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
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if(to.matched.toString() === "/") {
		if(store.getters.isAuthenticated) {
			next({name: "Dashboard"})
		} else {
			next({ name: "LandingPage" });
		}
	}
	next();
});

export default router;
