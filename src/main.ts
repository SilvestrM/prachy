import { createApp } from "vue";
import PrimeVue from "primevue/config";

import "normalize-css";
import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";

createApp(App)
	.use(PrimeVue)
	.use(store, key)
	.use(router)
	.mount("#app");
