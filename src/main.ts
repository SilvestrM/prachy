import { createApp } from "vue"
import PrimeVue from "primevue/config"
import ToastService from "primevue/toastservice"
import Tooltip from "primevue/tooltip"

import "normalize-css"
import "primevue/resources/themes/saga-green/theme.css"
import "@/assets/styles/primevue-vars.scss"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import "@/assets/styles/main.scss"

import App from "./App.vue"
import router from "./router"
import store, { key } from "./store"

import SignIn from "@/components/auth/SignIn.vue"

createApp(App)
  .use(PrimeVue)
  .use(ToastService)
  .directive("tooltip", Tooltip)
  .component("SignIn", SignIn)
  .use(store, key)
  .use(router)
  .mount("#app")
