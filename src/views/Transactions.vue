<template>
  <TransactionsTable :data="transactions" />
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import TransactionsTable from "@/components/data/TransactionsTable.vue";

export default defineComponent({
  components: { TransactionsTable },
  setup() {
    const store = useStore(key);
    onMounted(async () => {
      await store.dispatch("fetchTransactions");
      //await store.dispatch("fetchTransactionTypes");
    });
    const transactions = computed(() => store.getters.getTransactions);

    return { transactions };
  },
});
</script>


<style scoped>
</style>