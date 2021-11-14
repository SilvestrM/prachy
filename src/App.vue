<template>
  <div class="container">
    <Menu v-if="!$route.meta.noMenu" />
    <div class="card">
      <router-view />
    </div>
  </div>
  <Toast position="bottom-right" group="global"></Toast>
</template>

<style lang="scss">
html {
  font-size: 17px;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
  padding: 1rem;
}
</style>

<script lang="ts" setup>
import Menu from "@/components/navigation/Menu.vue"
import Toast from "primevue/toast"
import { useToast } from "primevue/usetoast"
import { computed } from "vue"
import { useStore } from "vuex"
import { key } from "./store"

const toast = useToast()
const store = useStore(key)
store.state.toast = toast
store.dispatch("initApp")
</script>
