<template>
  <div class="col m12 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'BillInCurrency' | locale}}</span>

        <p class="currency-line" v-for="cur in currency" :key="cur">
          <span>{{getCur(rates[cur]) | currency(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-bill",
  props: ["rates"],
  methods: {
    getCur(to) {
      return (this.$store.getters.info.bill * to).toFixed(2);
    },
  },
  data() {
    return {
      currency: ["RUB", "USD", "EUR"],
    };
  },
};
</script>

<style>
</style>