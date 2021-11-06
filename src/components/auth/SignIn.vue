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
        <Password :feedback="false" id="pw" v-model="password" />

        <label for="pw">Password</label>
      </span>
      <Button @click="login(email, password)" label="Sign In" />
      <span>
        <p>Not registered yet?</p>
        <Button @click="openSignUp" class="p-button-link" label="SignUp"
      /></span>
    </div>
    <!-- <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="closeDialog"
      />
      <Button
        @click="login(email, password)"
        label="SignIn"
        icon="pi pi-check"
      />
    </template> -->
  </Dialog>
  <SignUp ref="signUpDialog"></SignUp>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import useDialog from "@/composables/dialog";
import { Credentials } from "@/types/auth";
import { useStore } from "vuex";
import { key } from "@/store";

import SignUp from "./SignUp.vue";

export default defineComponent({
  // props: { visible: Boolean },
  components: { Dialog, Password, InputText, Button, SignUp },
  setup() {
    const email = ref<string>();
    const password = ref<string>();
    const store = useStore(key);

    const signUpDialog = ref();

    const { visible, openDialog, closeDialog } = useDialog();

    async function login(email: string, password: string) {
      await store.dispatch("login", new Credentials(email, password));
      closeDialog();
    }

    function openSignUp() {
      signUpDialog.value.openDialog();
    }

    return {
      email,
      password,
      visible,
      openDialog,
      closeDialog,
      login,
      signUpDialog,
      openSignUp,
    };
  },
});
</script>

<style lang="scss">
</style>
