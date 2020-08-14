<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from "@/utils/messages";
export default {
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
};
</script>

<style>
</style>