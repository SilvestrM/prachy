<template>
  <div class="container">
    <Menu />
    <div class="card">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
html {
  font-size: 14px;
}

.container {
  width: 100%;
  max-width: 80rem;
  margin-inline: auto;
}
</style>

<script lang="ts" setup>
import Menu from "@/components/navigation/Menu.vue";
</script>

