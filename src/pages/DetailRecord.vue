<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'History_Title' | locale}}</router-link>
        <a v-if="record" class="breadcrumb">{{ record.typeText }}</a>
      </div>
      <Loader v-if="loading" />
      <div v-else-if="record" class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.typeClass">
            <div class="card-content white-text">
              <p>{{'Description' | locale}}: {{ record.des }}</p>
              <p>{{'Amount' | locale}}: {{ record.amount | currency}}</p>
              <p>{{'Category' | locale}}: {{ record.categoryName }}</p>

              <small>{{ new Date(record.date) | date('datatime') }}</small>
            </div>
          </div>
        </div>
      </div>
      <p v-else>Записи с таким ID ({{$route.params.id}}) нет.</p>
    </div>
  </div>
</template>

<script>
import localeFilter from "@/filters/locale.filter";

export default {
  name: "detail-record",
  metaInfo() {
    return {
      title: localeFilter("Menu_NewRecord"),
    };
  },
  data() {
    return {
      loading: true,
      record: {},
    };
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      const record = await this.$store.dispatch("fetchRecordById", id);
      if (!record) {
        this.record = null;
        this.loading = false;
        return;
      }
      const category = await this.$store.dispatch(
        "fetchCategoryById",
        record.categoryId
      );
      this.record = {
        ...record,
        categoryName: category.name,
        typeText:
          record.type === "outcome"
            ? localeFilter("Outcome")
            : localeFilter("Income"),
        typeClass: record.type === "outcome" ? "red" : "green",
      };
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
</style>