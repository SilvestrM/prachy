<template>
  <div class="action-card">
    <div class="action-card__content">
      <h2>Welcome to Prachy</h2>
      <!-- <p>Continue by:</p> -->
      <template v-if="!store.getters.isAuthenticated">
        <span>
          <Button @click="openSignUp()">register</Button>
          <span>or</span>
          <Button
            class="p-button-text p-button-secondary"
            @click="openSignIn()"
          >
            Sign In
          </Button>
        </span>
        <span>
          <Button @click="openToast()">tost</Button>
        </span>
        <SignUp ref="signUpDialog"></SignUp>
        <SignIn ref="signInDialog"></SignIn>
      </template>
      <template v-else>
        <Button @click="$router.push('/')">Continue to app</Button>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
/**
 * importuje se globalne kvuli necemu nejde lokalne
 * import SignIn from "@/components/auth/SignIn.vue"*/
import SignUp from "@/components/auth/SignUp.vue"
import Button from "primevue/button"
import { key } from "@/store"
import { useStore } from "vuex"

export default defineComponent({
  components: { Button, SignUp },
  setup() {
    const signInDialog = ref()
    const signUpDialog = ref()
    const store = useStore(key)

    function openSignIn() {
      signInDialog.value.openDialog()
    }
    function openSignUp() {
      signUpDialog.value.openDialog()
    }
    function openToast() {
      store.state.toast.add({
        severity: "info",
        summary: "Info Message",
        detail: "Message Content",
        life: 3000,
        group: "global",
      })
    }
    return {
      signInDialog,
      signUpDialog,
      openSignIn,
      openSignUp,
      openToast,
      store,
    }
  },
})
</script>

<style lang="scss" scoped>
.action-card {
  margin-inline: auto;
  display: flex;
  text-align: center;
  flex-direction: column;
  max-width: 30rem;

  h2 {
    font-size: 2em;
  }

  &__content {
    display: grid;
    gap: 0.5rem;
    justify-content: center;
    justify-items: center;
  }
}
</style>
