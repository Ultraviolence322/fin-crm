<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"Edit"|locale}}</h4>
      </div>
      <p v-if="!categories.length">{{"NoCategories"|locale}}</p>
      <form v-else @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{c.name}}</option>
          </select>
          <label>{{"SelectCategory"|locale}}</label>
        </div>

        <div class="input-field">
          <input
            v-model="name"
            id="name"
            type="text"
            :class="{'invalid':$v.name.$dirty && !$v.name.required}"
          />
          <label for="name">{{"Title"|locale}}</label>
          <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
          >{{"Message_CategoryTitle"|locale}}</span>
        </div>

        <div class="input-field">
          <input
            v-model="limit"
            id="limit"
            type="number"
            :class="{'invalid':($v.limit.$dirty && !$v.limit.required)||($v.limit.$dirty && !$v.limit.minValue)}"
          />
          <label for="limit">{{"Limit" | locale}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.required"
            class="helper-text invalid"
          >{{"Message_EnterLimit" | locale}}</span>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >{{"Message_MinLength" | locale}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{"Update" | locale}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import localeFilter from "@/filters/locale.filter";

export default {
  name: "categories-edit",
  data() {
    return {
      select: null,
      name: this.categories[0] ? this.categories[0].name : null,
      limit: this.categories[0] ? this.categories[0].limit : null,
      current: this.categories[0] ? this.categories[0].id : null,
    };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  validations: {
    name: { required },
    limit: { required, minValue: minValue(100) },
  },
  watch: {
    current() {
      const item = this.categories.find((c) => c.id === this.current);
      this.name = item.name;
      this.limit = item.limit;
    },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const categoryUpdate = {
        name: this.name,
        limit: this.limit,
        id: this.current,
      };
      try {
        await this.$store.dispatch("updateCategory", categoryUpdate);
        this.$message(localeFilter("Category_HasBeenUpdated"));
        this.$emit("update", categoryUpdate);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style>
</style>