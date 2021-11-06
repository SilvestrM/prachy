<template>
  <div class="settings-layout">
    <Menu ref="menu" :model="items" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Menu from "primevue/menu";

export default defineComponent({
  components: { Menu },
  setup() {
    const menu = ref();
    const items = ref([
      { label: "Profile", icon: "pi pi-fw pi-user" },
      { label: "Preferences", icon: "pi pi-fw pi-user" },
      {
        label: "Accounts",
        icon: "pi pi-fw pi-calendar",
        to: { name: "AccountSettings" },
      },
      //   { label: "Edit", icon: "pi pi-fw pi-pencil" },
      //   { label: "Documentation", icon: "pi pi-fw pi-file" },
    ]);

    const toggle = (event: Event) => {
      menu.value.toggle(event);
    };
    const save = () => "";

    return { items, menu, toggle, save };
  },
});
</script>

<style scoped>
.settings-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
}
</style>