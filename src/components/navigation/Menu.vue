<template>
  <div class="menu-wrapper">
    <MenuBar :model="items">
      <template #start>
        <img
          alt="logo"
          src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
          height="40"
          class="p-mr-2"
        />
      </template>
      <template #end>
        <Button v-if="!$store.state.session?.user" @click="openSignUp()"
          >Sign Up</Button
        >
        <template v-else>
          <!-- <span>{{ $store.state.session?.user.email }}</span> -->
          <Button
            icon="pi pi-user"
            @click="avatarMenu.toggle($event)"
            class="p-button-rounded p-button-outlined"
          />
          <!-- <Avatar
            @click="avatarMenu.toggle($event)"
            icon="pi pi-user"
            size="large"
            shape="circle"
          /> -->
          <Menu
            id="overlay_tmenu"
            ref="avatarMenu"
            :model="avatarMenuItems"
            :popup="true"
            style="width: 100%; max-width: 20rem"
          >
          </Menu>
        </template>
      </template>
    </MenuBar>
  </div>
  <SignIn ref="signInDialog"></SignIn>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import MenuBar from "primevue/menubar";
import Button from "primevue/button";
//import Avatar from "primevue/avatar";
import SignIn from "@/components/auth/SignIn.vue";
import Menu from "primevue/menu";
import { useStore } from "vuex";
import { key } from "@/store";
import { PrimeIcons } from "primevue/api";

export default defineComponent({
  components: {
    MenuBar,
    Button,
    SignIn,
    //Avatar,
    Menu,
  },
  setup() {
    const store = useStore(key);
    const items = ref([
      {
        label: "Dashboard",
        icon: PrimeIcons.TH_LARGE,
        to: { name: "Dashboard" },
      },
      {
        label: "Transactions",
        icon: PrimeIcons.LIST,
        to: { name: "Transactions" },
      },
      {
        label: "Budgets",
        icon: PrimeIcons.CREDIT_CARD,
        name: "Dashboard",
        disabled: true,
      },
    ]);
    const avatarMenu = ref();
    const user = computed(() => store.getters.getLoggedInUser?.email);
    const avatarMenuItems = ref([
      {
        label: user,
        style: "font-weight:bold",
        icon: PrimeIcons.USER,
      },
      {
        separator: "true",
      },
      {
        label: "Settings",
        icon: PrimeIcons.COG,
        to: { name: "Settings" },
      },
      {
        label: "Logout",
        icon: PrimeIcons.SIGN_OUT,
        command: () => store.dispatch("logout"),
      },
    ]);

    const signInDialog = ref();

    function openSignUp() {
      signInDialog.value.openDialog();
    }

    return {
      items,
      signInDialog,
      openSignUp,
      avatarMenuItems,
      avatarMenu,
    };
  },
});
</script>

<style scoped lang="scss">
.menu-wrapper {
  margin-bottom: 5vh;
}
</style>