import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "normalize-css";
import "primevue/resources/themes/saga-green/theme.css";
import "@/assets/styles/primevue-vars.scss";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "@/assets/styles/main.scss";

import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";

createApp(App)
	.use(PrimeVue)
	.use(ToastService)
	.use(store, key)
	.use(router)
	.mount("#app");
