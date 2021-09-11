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
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
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