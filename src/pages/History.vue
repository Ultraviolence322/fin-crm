<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title' | locale}}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length">
      {{'NoRecords' | locale}}
      <router-link to="/record">{{'AddFirst' | locale}}</router-link>
    </p>

    <section v-else>
      <div class="history-chart">
        <PieChart :chartdata="chartdata" :options="chartoptions" />
      </div>
      <div class="history-table">
<HistoryTable :records="items" />
      </div>
      

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHadler"
        :next-text="'&#8594;'"
        :prev-text="'&#8592;'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import localeFilter from "@/filters/locale.filter";

import PieChart from "@/charts/PieChart";

export default {
  name: "history",
  metaInfo() {
    return {
      title: localeFilter("Menu_History"),
    };
  },
  mixins: [paginationMixin],
  components: {
    HistoryTable,
    PieChart,
  },
  data() {
    return {
      records: [],
      loading: true,
      chartdata: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20],
          },
        ],
      },
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    try {
      this.records = await this.$store.dispatch("fetchRecords");
      const categories = await this.$store.dispatch("fetchCategories");

      this.setup(categories);

      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((r) => {
          return {
            ...r,
            categoryName: categories.find((c) => c.id === r.categoryId).name,
            recordType:
              r.type === "outcome"
                ? localeFilter("Outcome")
                : localeFilter("Income"),
            recordClass: r.type === "outcome" ? "red" : "green",
          };
        })
      );
      categories.forEach((c) => {
        this.chartdata.labels.push(c.name);
      });
      this.chartdata.datasets[0].data = categories.map((c) => {
        return this.records.reduce((total, el) => {
          if (el.categoryId === c.id && el.type === "outcome") {
            total += el.amount;
          }
          return total;
        }, 0);
      });
    },
  },
};
</script>

<style scoped>
.history-table {
   overflow: scroll;
 }
</style>