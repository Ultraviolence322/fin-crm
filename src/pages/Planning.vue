<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning' | locale}}</h3>
      <h4>{{info.bill | currency}}</h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length">
      {{'NoCategories' | locale}}
      <router-link to="/categories">{{'AddFirst' | locale}}</router-link>
    </p>
    <section v-else>
      <div v-for="c in categories" :key="c.id">
        <p>
          <strong>{{c.name}}:</strong>
          {{c.spend | currency}} {{'Of' | locale}} {{c.limit | currency}}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
            class="determinate"
            :class="c.progressColor"
            :style="{width:c.progressPersent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import currencyFilter from "@/filters/currency.filter";
import localeFilter from "@/filters/locale.filter";

export default {
  name: "planning",
  metaInfo() {
    return {
      title: localeFilter("Menu_Planning"),
    };
  },
  data() {
    return {
      categories: [],
      loading: true,
      info: this.$store.getters.info,
    };
  },
  async mounted() {
    try {
      const categories = await this.$store.dispatch("fetchCategories");
      const records = await this.$store.dispatch("fetchRecords");
      this.categories = categories.map((c) => {
        const spend = records
          .filter((r) => r.categoryId === c.id)
          .filter((r) => r.type === "outcome")
          .reduce((total, e) => {
            return (total += +e.amount);
          }, 0);
        const percent = (100 * spend) / c.limit;
        const progressPersent = percent > 100 ? 100 : percent;
        const progressColor =
          percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
        const tooltipValue = c.limit - spend;
        const tooltip =
          (tooltipValue < 0
            ? localeFilter("MoreThan")
            : localeFilter("Stayed")) + currencyFilter(Math.abs(tooltipValue));
        return {
          ...c,
          spend,
          percent,
          progressPersent,
          progressColor,
          tooltip,
        };
      });
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
</style>