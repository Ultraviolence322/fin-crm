<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"Create" | locale}}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            v-model="name"
            id="name"
            type="text"
            :class="{'invalid':$v.name.$dirty && !$v.name.required}"
          />
          <label for="name">{{"Title" | locale}}</label>
          <span
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
          >{{"Message_CategoryTitle" | locale}}</span>
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
          {{"Create" | locale}}
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
  name: "categories-add",
  data() {
    return {
      name,
      limit: 100,
    };
  },
  validations: {
    name: { required },
    limit: { required, minValue: minValue(100) },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const category = {
        name: this.name,
        limit: this.limit,
      };
      try {
        const newCategory = await this.$store.dispatch("addCategory", category);
        this.name = "";
        this.limit = 100;
        this.$v.$reset();
        this.$message(localeFilter("Category_HasBeenCreated"));
        this.$emit("created", newCategory);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    window.M.updateTextFields();
  },
};
</script>

<style>
</style>