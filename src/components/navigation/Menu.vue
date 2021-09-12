<template>
    <div class="menu-wrapper">
        <MenuBar :model="items">
            <template #end></template>
        </MenuBar>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MenuBar from "primevue/menubar";

export default defineComponent({
    components: {
        MenuBar
    },
    setup() {
        const active = ref(3);
        const items = ref([
            {
                label: "Dashboard",
                icon: "pi pi-fw pi-th-large",
                to: "Dashboard",
            },
            {
                label: "Transactions",
                icon: "pi pi-fw pi-list",
                to: "Transactions",
            },
            {
                label: "Budgets",
                icon: "pi pi-fw pi-credit-card",
                name: "Dashboard",
                disabled: true
            },
            {
                label: "Settings",
                icon: "pi pi-fw pi-cog",
                to: "/settings",
            },
        ]);

        return { active, items };
    },
});
</script>

<style scoped lang="scss">
.menu-wrapper {
    margin-bottom: 2rem;
}
</style>