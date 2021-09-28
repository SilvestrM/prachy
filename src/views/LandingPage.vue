<template>
  <div>
    <h2>Welcome to Prachy</h2>
    <Button @click="openSignUp()"
      >Sign Up</Button>
    <SignIn ref="signInDialog"></SignIn>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Button from "primevue/button";
import SignIn from "@/components/auth/SignIn.vue";

export default defineComponent({
    components: {Button, SignIn},
  setup() {
    const signInDialog = ref();

    function openSignUp() {
      signInDialog.value.openDialog();
    }
    return { signInDialog, openSignUp };
  },
});
</script>


<style scoped>
</style>