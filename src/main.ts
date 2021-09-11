import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { createClient } from "@supabase/supabase-js";

import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const supabaseUrl = "https://pahiiutdrgjeiompfqho.supabase.co";
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY
	? process.env.VUE_APP_SUPABASE_KEY
	: "Supabase key not found";
const supabase = createClient(supabaseUrl, supabaseKey);

createApp(App)
	.use(PrimeVue)
	.use(store)
	.use(router)
	.mount("#app");
