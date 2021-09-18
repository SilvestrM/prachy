<template>
  <Dialog
    v-model:visible="visible"
    :style="{ width: '450px' }"
    :header="isUpdate ? 'Edit Transaction' : 'Create Transaction'"
    :modal="true"
    class="p-fluid"
  >
    <div class="pr-form pr-form__vertical">
      <span class="p-field">
        <label for="description">Text</label>
        <InputText
          id="description"
          type="text"
          v-model="transactionData.description"
        />
      </span>
      <span class="p-field">
        <label for="amount">Amount</label>
        <InputNumber
          id="amount"
          type="text"
          mode="currency"
          currency="EUR"
          v-model="transactionData.amount"
          showButtons
        />
      </span>
      <div class="p-field">
        <label for="icon">Icon</label>
        <Calendar id="icon" v-model="transactionData.date" :showIcon="true" />
      </div>
      <div class="p-field">
        <Dropdown
          v-model="transactionData.accountId"
          :options="accounts"
          optionLabel="name"
          optionValue="id"
        />
      </div>
      <div class="p-field">
        <Dropdown
          v-model="transactionData.typeId"
          :options="transTypes"
          optionLabel="name"
          optionValue="id"
        />
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="save"
      />
    </template>
  </Dialog>
</template>
<script lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import {
  ComponentObjectPropsOptions,
  ComponentPropsOptions,
  computed,
  onMounted,
  ref,
} from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { Transaction } from "@/types/api/Transaction";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";

import useDialog from "@/composables/dialog";

// import Rating from "primevue/toolbar";
// import Textarea from "primevue/textarea";
// import RadioButton from "primevue/radiobutton";

export default {
  props: ["isUpdate"],
  components: {
    Dialog,
    Button,
    InputText,
    InputNumber,
    Calendar,
    Dropdown,
  },
  setup(props: ComponentObjectPropsOptions) {
    onMounted(() => {
      store.dispatch("fetchAccounts");
    });
    const store = useStore(key);

    const { visible, dialogData, openDialog, closeDialog } =
      useDialog<Transaction>();

    // TODO maybe make grouped
    const accounts = computed(() => store.getters.getAccounts);
    const transTypes = computed(() => store.getters.getTransactionTypes);

    const transactionData = dialogData;

    async function save() {
      if (props.isUpdate) {
        await store.dispatch("updateTransaction", transactionData.value);
      } else {
        await store.dispatch("createTransaction", transactionData.value);
      }
      closeDialog();
    }

    return {
      visible,
      transactionData,
      openDialog,
      closeDialog,
      save,
      accounts,
      transTypes,
    };
  },
};
</script>
<style lang="">
</style>