<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | locale }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{'invalid': ($v.name.$dirty && !$v.name.required)}"
        />
        <label for="description">{{ 'Name' | locale }}</label>
        <small class="helper-text invalid" v-if="($v.name.$dirty && !$v.name.required)">Введите имя</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRu" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | locale }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import localeFilter from "@/filters/locale.filter";

export default {
  name: "profile",
  metaInfo() {
    return {
      title: localeFilter("ProfileTitle"),
    };
  },
  data() {
    return {
      name: "",
      isRu: true,
    };
  },
  validations: {
    name: { required },
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch("updateInfo", {
          name: this.name,
          locales: this.isRu ? "ru-RU" : "en-US",
        });
        this.$message(localeFilter("Updated"));
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.name = this.$store.getters.info.name;
    this.isRu = this.$store.getters.info.locales === "ru-RU" ? true : false;
    setTimeout(() => {
      window.M.updateTextFields();
    });
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>