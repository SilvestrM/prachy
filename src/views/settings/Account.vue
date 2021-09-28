<template>
  <div>
    <Dropdown
      v-model="selectedCar"
      :options="cars"
      optionLabel="brand"
      :filter="true"
      placeholder="Select a Car"
      :showClear="true"
    >
      <template #value="slotProps">
        <div class="p-dropdown-car-value" v-if="slotProps.value">
          <img
            :alt="slotProps.value.brand"
            :src="'demo/images/car/' + slotProps.value.brand + '.png'"
          />
          <span>{{ slotProps.value.brand }}</span>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="p-dropdown-car-option">
          <img
            :alt="slotProps.option.brand"
            :src="'demo/images/car/' + slotProps.option.brand + '.png'"
          />
          <span>{{ slotProps.option.brand }}</span>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Dropdown from "primevue/dropdown";

export default defineComponent({
  components: { Dropdown },
  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>