<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories' | locale}}</h3>
    </div>
    <Loader v-if="loading" />
    <section v-else>
      <div class="row">
        <CategoriesAdd @created="addNewCategory" />
        <CategoriesEdit
          @update="updateCategory"
          :categories="categories"
          :key="categories.length + update"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesAdd from "@/components/CategoriesAdd";
import CategoriesEdit from "@/components/CategoriesEdit";
import localeFilter from "@/filters/locale.filter";

export default {
  name: "categories",
  metaInfo() {
    return {
      title: localeFilter("Menu_Categories"),
    };
  },
  components: {
    CategoriesAdd,
    CategoriesEdit,
  },
  data() {
    return {
      categories: [],
      loading: true,
      update: 0,
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.unshift(category);
    },
    updateCategory(category) {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.categories[index].name = category.name;
      this.categories[index].limit = category.limit;
      this.update++;
    },
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.categories.reverse();
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
</style>