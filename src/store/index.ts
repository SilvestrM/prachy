import { supabase } from "@/api/supabase"
import { Credentials } from "@/types/auth"
import { useToast } from "primevue/usetoast"
import { InjectionKey } from "vue"
import { createStore, Store } from "vuex"
import createPersistedState from "vuex-persistedstate"
import { accounts } from "./modules/accounts"
import { transactions } from "./modules/transactions"

import router from "@/router/index"

export interface RootState {
  session: any
  toast: any
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export default createStore<RootState>({
  // state: {

  // },
  mutations: {
    setSession: (state, session) => {
      state.session = session
    },
  },
  actions: {
    async initApp({ commit, state }) {
      supabase.auth.onAuthStateChange((event, session) => {
        commit("setSession", session)
        console.log(event)
        console.log(session)

        if (event === "SIGNED_OUT") {
          router.push({ name: "LandingPage" })
        }
      })
    },
    async login({ commit, state }, credentials: Credentials) {
      // state.toast.add({
      //   severity: "info",
      //   summary: "Info Message",
      //   detail: "Message Content",
      //   life: 3000,
      //   group: "global",
      // })

      const { error, ...authData } = await supabase.auth.signIn({
        email: credentials.email,
        password: credentials.password,
      })
      if (error) {
        alert("Error logging in: " + error.message)
        return
      }
      // No error throw, but no user detected so send magic link
      if (!error && !authData.user) {
        alert("Check your email for the login link!")
        return
      }
      commit("setSession", authData.session)
    },

    async register({ commit }, credentials: Credentials) {
      const { error, ...authData } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        alert("Error logging in: " + error.message)
        return
      }
      // No error throw, but no user detected so send magic link
      if (!error && !authData.user) {
        alert("Check your email for the login link!")
        return
      }

      commit("setSession", authData.session)
    },

    async logout({ commit }) {
      const { error } = await supabase.auth.signOut()
      if (error) {
        alert("Error logging in: " + error.message)
      }
    },
  },
  getters: {
    getSession(state) {
      return state.session
    },
    getLoggedInUser(state) {
      return state.session.user
    },
    isAuthenticated(state) {
      return state.session ? true : false
    },
  },
  modules: {
    transactions,
    accounts,
  },
  //plugins: [createPersistedState()],
})
