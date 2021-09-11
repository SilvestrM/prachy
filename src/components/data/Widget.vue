<template>
    <Panel header="Header" :toggleable="true">
        <template #icons>
            <button class="p-panel-header-icon p-link p-mr-2" @click="toggle">
                <span class="pi pi-cog"></span>
            </button>
            <Menu id="config_menu" ref="menu" :model="items" :popup="true" />
        </template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</template>

<script lang="ts" setup>
import Panel from 'primevue/panel';
import Menu from 'primevue/menu';
</script>

<script lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

export default {
    setup() {
        const toast = useToast();
        let menu: any;
        const collapsed = ref(true);
        const items = ref([
            {
                label: 'Options',
                items: [{
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {
                        toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    command: () => {
                        toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    }
                }
                ]
            },
            {
                label: 'Navigate',
                items: [{
                    label: 'Vue Website',
                    icon: 'pi pi-external-link',
                    url: 'https://vuejs.org/'
                },
                {
                    label: 'Router',
                    icon: 'pi pi-upload',
                    command: () => {
                        window.location.hash = "/fileupload"
                    }
                }
                ]
            }
        ]);

        const toggle = (event: any) => {
            menu.value.toggle(event);
        };

        const save = () => {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
        }

        return { menu, collapsed, items, toggle, save }
    }
}
</script>

<style lang="scss" scoped>
.p-panel p {
    line-height: 1.5;
    margin: 0;
}
</style>