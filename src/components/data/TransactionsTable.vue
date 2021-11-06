<template>
  <div class="p-panel">
    <DataTable
      :resizableColumns="true"
      :sortOrder="1"
      :value="data"
      @rowContextmenu="onRowContextMenu"
      class="p-datatable-sm"
      columnResizeMode="fit"
      contextMenu
      dataKey="id"
      groupRowsBy="month"
      responsiveLayout="scroll"
      rowGroupMode="rowspan"
      selectionMode="single"
      sortField="month"
      sortMode="single"
      v-model:contextMenuSelection="selected"
      v-model:selection="selected"
    >
      <template #header>
        <Toolbar>
          <template #right>
            <Button
              @click="addTransaction"
              label="Add"
              icon="pi pi-plus"
              class="p-mr-2"
            />
            <!-- <Button label="Upload" icon="pi pi-upload" class="p-button-success" />
                <i class="pi pi-bars p-toolbar-separator p-mr-2" />
                <SplitButton label="Save" icon="pi pi-check" :model="items" class="p-button-warning"></SplitButton> -->
          </template>
        </Toolbar>
        <!-- <SpeedDial
          :model="[]"
          showIcon="pi pi-bars"
          hideIcon="pi pi-times"
          buttonClass="p-button-outlined"
          direction="right"
        /> -->
      </template>
      <Column field="month" header="Month">
        <template #body="slotProps">
          {{ GetMonthByNumber(slotProps.data.month) }}
        </template>
      </Column>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
      ></Column>
      <Column field="type" header="Transaction Type">
        <template #body="slotProps">
          {{ slotProps.data.type?.name }}
        </template>
      </Column>
    </DataTable>
    <ContextMenu :model="ctxMenuModel" ref="cm" />

    <EditTransactionDialog
      ref="editDialog"
      :isUpdate="true"
    ></EditTransactionDialog>
    <EditTransactionDialog ref="createDialog"></EditTransactionDialog>
  </div>
</template>

<script lang="ts">
//

// import FileUpload from "primevue/fileupload";
// import InputText from "primevue/toolbar";
// import Rating from "primevue/toolbar";
// import Textarea from "primevue/textarea";
// import Dropdown from "primevue/dropdown";
// import RadioButton from "primevue/radiobutton";
// import InputNumber from "primevue/inputnumber";

import { computed, PropType, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ContextMenu from "primevue/contextmenu";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
//import SpeedDial from "primevue/speeddial";

import EditTransactionDialog from "@/components/data/dialogs/EditTransactionDialog.vue";

import { GetMonthByNumber } from "@/utils/dateUtils";
import { DTOTransaction, Transaction } from "@/types/api/Transaction";
import store, { key } from "@/store";
import { useStore } from "vuex";

export default {
  props: ["data"],
  components: {
    DataTable,
    Column,
    ContextMenu,
    Toolbar,
    Button,
    EditTransactionDialog,
    //SpeedDial,
  },
  setup(props: any) {
    const columns = ref([
      { field: "date", header: "Date", sortable: true },
      { field: "description", header: "Text", sortable: false },
      { field: "amount", header: "Amount", sortable: true },
      { field: "account.name", header: "Account", sortable: true },
    ]);

    const selected = ref();

    const createDialog = ref();
    const editDialog = ref();

    const store = useStore(key);

    const cm = ref();
    const ctxMenuModel = ref([
      {
        label: "Edit",
        icon: "pi pi-fw pi-search",
        command: () => editTransaction(selected.value),
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-times",
        command: () => deleteTransaction(selected.value),
      },
    ]);

    const actionMenu = ref([
      {
        label: "Add",
        icon: "pi pi-pencil",
        command: () => {
          return;
        },
      },
      {
        label: "Update",
        icon: "pi pi-refresh",
        command: () => {
          return;
        },
      },
    ]);

    function addTransaction() {
      createDialog.value.openDialog(
        new Transaction({ date: new Date(), description: "" })
      );
    }

    function editTransaction(row: any): void {
      editDialog.value.openDialog(new Transaction(row));
    }

    function deleteTransaction(row: any) {
      return;
    }

    function onRowContextMenu(event: any) {
      cm.value.show(event.originalEvent);
    }

    return {
      columns,
      selected,
      GetMonthByNumber,
      ctxMenuModel,
      cm,
      onRowContextMenu,
      editDialog,
      createDialog,
      actionMenu,
      addTransaction,
    };
  },
};
</script>

<style lang="scss" scoped>
.p-toolbar {
  padding: 0;
  //margin-bottom: 2rem;
}
</style>
