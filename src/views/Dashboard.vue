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
<script lang="ts">
import { getCurrencies } from "@/api/currency_service";
import { key } from "@/store";
import { computed, defineComponent, onMounted, ref, toRefs } from "vue";
import { useStore } from "vuex";
import Widget from "@/components/data/Widget.vue";

export default defineComponent({
  components: { Widget },
  setup() {
    const store = useStore(key);

    onMounted(async () => {
      store.dispatch("fetchTransactions");
    });
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