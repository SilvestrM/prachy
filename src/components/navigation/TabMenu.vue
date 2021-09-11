<template>
    <div class="card">
        <TabMenu :model="items" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TabMenu from "primevue/tabmenu";

export default defineComponent({
    components: {
        TabMenu,
    },
    setup() {
        const active = ref(3);
        const items = ref([
            {
                label: "Dashboard",
                icon: "pi pi-fw pi-home",
                to: "Dashboard",
            },
            {
                label: "Transactions",
                icon: "pi pi-fw pi-calendar",
                to: "Transactions",
            },
            {
                label: "Budgets",
                icon: "pi pi-fw pi-file",
                name: "Dashboard",
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
::v-deep(.tabmenudemo-content) {
    padding: 2rem 1rem;
}
</style>