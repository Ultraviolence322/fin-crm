<template>
  <div>
    <div class="page-title">
      <h3>{{'Bill' | locale}}</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div v-if="!loading" class="row">
      <HomeBill :rates="this.currency.rates" />
      <HomeCurrency :rates="this.currency.rates" :date="this.currency.date" />
    </div>

    <Loader v-else />
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import localeFilter from "@/filters/locale.filter";
import firebase from "firebase/app";

export default {
  name: "home",
  metaInfo() {
    return {
      title: localeFilter("Menu_Bill"),
    };
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
  computed: {
    loading() {
      if (this.currency) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async refresh() {
      this.currency = null;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.currency.rates["RUB"] = 1;
    },
  },
  data() {
    return {
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.currency.rates["RUB"] = 1;
    console.log(firebase.auth().currentUser);
  },
};
</script>

<style>
</style>