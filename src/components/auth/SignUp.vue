<template>
  <Dialog
    v-model:visible="visible"
    :style="{ width: '450px' }"
    header="Sign In"
    :modal="true"
    class="p-fluid"
  >
    <div class="pr-form pr-form__vertical">
      <span class="p-float-label">
        <InputText id="email" type="email" v-model="email" />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label">
        <Password id="pw" v-model="password" />

        <label for="pw">Password</label>
      </span>
      <span class="p-float-label">
        <Password id="pw" v-model="pwCheck" />

        <label for="pw">Re-Password</label>
      </span>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDialog"
      />
      <Button
        @click="register(email, password, pwCheck)"
        label="SignUp"
        icon="pi pi-check"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import useDialog from "@/composables/dialog";
import { key } from "@/store";
import { Credentials } from "@/types/auth";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { defineComponent, ref, SetupContext } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  // props: { visible: Boolean },
  components: { Dialog, Password, InputText, Button },
  emits: ["close"],
  setup() {
    const email = ref<string>();
    const password = ref<string>();
    const pwCheck = ref<string>();
    const store = useStore(key);

    const { visible, openDialog, closeDialog } = useDialog();

    async function register(email: string, password: string, pwCheck: string) {
      if (password !== pwCheck) {
        return;
      }
      await store.dispatch("register", new Credentials(email, password));
      closeDialog();
    }

    return {
      email,
      password,
      visible,
      openDialog,
      closeDialog,
      register,
      pwCheck,
    };
  },
});
</script>

<style lang="scss">
</style>
