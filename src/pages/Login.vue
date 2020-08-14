<template>
  <form class="card auth-card" @submit.prevent="onLogIn">
    <div class="card-content">
      <span class="card-title">{{'CRM_Title' | locale}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email"
          :class="{'invalid':($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="($v.email.$dirty && !$v.email.required)"
        >{{'Message_EmailRequired' | locale}}</small>
        <small
          class="helper-text invalid"
          v-if="($v.email.$dirty && !$v.email.email)"
        >{{'Message_EmailValid' | locale}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          :class="{'invalid':($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          v-model="password"
        />
        <label for="password">{{'Password' | locale}}</label>
        <small
          class="helper-text invalid"
          v-if="($v.password.$dirty && !$v.password.required)"
        >{{'Message_EnterPassword' | locale}}</small>
        <small
          class="helper-text invalid"
          v-if="($v.password.$dirty && !$v.password.minLength)"
        >{{'Message_MinLength' | locale}} {{$v.password.$params.minLength.min}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Login' | locale}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'NoAccount' | locale}}
        <router-link to="/register">{{'Register' | locale}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";
import localeFilter from "@/filters/locale.filter";

export default {
  name: "login",
  metaInfo() {
    return {
      title: localeFilter("Login"),
    };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    async onLogIn() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("logIn", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
      this.$router.push("/login");
    }
  },
};
</script>

<style>
</style>