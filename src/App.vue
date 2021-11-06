<template>
  <div class="container">
    <Menu v-if="$route.name !== 'LandingPage'" />
    <div class="card">
      <router-view />
    </div>
  </div>
  <Toast position="top-center" group="global"></Toast>
</template>

<style lang="scss">
html {
  font-size: 18px;
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
import Menu from "@/components/navigation/Menu.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { key } from "./store";

//const toast = useToast();
const store = useStore(key);
store.dispatch("initApp");

//store.state.toast = toast;
</script>
