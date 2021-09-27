<template>
  <div class="main-layout">
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <NavBar @togglesidebar="isOpenSideBar = !isOpenSideBar" />
      <SideBar :isOpen="isOpenSideBar" />
      <main class="app-content" :class="{'full': !isOpenSideBar}">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/app/SideBar";
import NavBar from "../components/app/NavBar";

import messages from "@/utils/messages";

export default {
  name: "main-layout",
  components: {
    SideBar,
    NavBar,
  },
  data() {
    return {
      isOpenSideBar: false,
      loading: true,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(err) {
      this.$message(messages[err.code] || "Unknown Error!");
    },
  },
  async mounted() {
    const uid = await this.$store.dispatch("getUid");
    await this.$store.dispatch("fetchInfo", uid);
    this.loading = false;
  },
};
</script>

<style>
</style>