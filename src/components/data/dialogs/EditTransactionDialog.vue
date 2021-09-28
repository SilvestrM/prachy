<template>
  <Dialog
    v-model:visible="visible"
    :style="{ width: '450px' }"
    :header="isUpdate ? 'Edit Transaction' : 'Create Transaction'"
    :modal="true"
    class="p-fluid"
  >
    <div class="pr-form pr-form__vertical">
      <div class="p-field">
        <label for="icon">Date</label>
        <Calendar id="icon" v-model="transactionData.date" :showIcon="true" />
      </div>
      <div class="p-formgroup-inline">
        <label for="icon">Transaction Type</label>
        <!-- <Dropdown
          v-model="transactionData.typeId"
          :options="transTypes"
          optionLabel="name"
          optionValue="id"
        /> -->
        <div
          v-for="trans of transTypes"
          :key="trans.id"
          class="p-field-radiobutton"
        >
          <RadioButton
            :id="trans.id"
            name="transType"
            :value="trans.id"
            v-model="transactionData.typeId"
          />
          <label :for="trans.id">{{ trans.name }}</label>
        </div>
      </div>
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
      <span class="p-field">
        <label for="description">Text</label>
        <InputText
          id="description"
          type="text"
          v-model="transactionData.description"
        />
      </span>
      <div class="p-field">
        <label for="icon">Account</label>
        <Dropdown
          v-model="transactionData.accountId"
          :options="accounts"
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
        class="p-button-primary"
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
import { Transaction, TransactionType } from "@/types/api/Transaction";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
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
    RadioButton,
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