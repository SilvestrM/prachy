<template>
  <div class="pr-grid pr-grid__three">
    <div class="pr-grid__item" v-for="account of accounts" :key="account.id">
      <Panel>
        <template #icons>
          <button class="p-panel-header-icon p-link p-mr-2" @click="toggle">
            <span class="pi pi-cog"></span>
          </button>
          <!-- <Menu id="config_menu" ref="menu" :model="items" :popup="true" /> -->
        </template>
        <div class="p-d-flex p-flex-column p-ai-center p-jc-center">
          <i
            v-tooltip="account.type.name"
            :class="`pi pi-${account.type.icon ?? 'credit-card'} account-icon`"
          ></i>
          <h3 class="p-text-bold">{{ account.name }}</h3>
          <span>{{ account.currency }}</span>
        </div>
      </Panel>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { key } from "@/store";
import { useStore } from "vuex";

import Panel from "primevue/panel";

export default defineComponent({
  components: { Panel },
  setup() {
    const store = useStore(key);

    onMounted(async () => {
      await store.dispatch("fetchAccounts");
    });

    const accounts = computed(() => store.getters.getAccounts);

    return { accounts };
  },
});
</script>

<style lang="scss" scoped>
.pr-grid {
  justify-content: center;

  &__item {
    display: flex;
    flex-direction: column;
    width: 100%;

    .p-panel {
      width: 100%;
    }
  }
}

.account-icon {
  font-size: 3em;
}
</style>