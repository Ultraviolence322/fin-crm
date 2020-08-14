<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'CurrencyAmountTitle' | locale}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'Currency' | locale}}</th>
              <th>{{'CurrencyType' | locale}}</th>
              <th>{{'Date' | locale}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currency" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur]}}</td>
              <td>{{date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-bill",
  props: ["rates", "date"],
  data() {
    return {
      currency: ["RUB", "USD", "EUR"],
    };
  },
};
</script>

<style>
</style>