<template>
    <div class="widget-grid">
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
    </div>
</template>
<script lang="ts" setup>
import Widget from "@/components/data/Widget.vue"
</script>
<script lang="ts">
import { key } from "@/store";
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore(key);

        onMounted(() => {
            store.dispatch("fetchTransactions")
        })
        return {};
    },
});
</script>

<style lang="scss" scoped>
.widget-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, clamp(30rem, 30%, 60rem));
    padding: 2rem;
    justify-content: center;
}
</style>