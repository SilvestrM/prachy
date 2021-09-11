import { createApp } from "vue";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/saga-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App)
	.use(PrimeVue)
	.use(store)
	.use(router)
	.mount("#app");
