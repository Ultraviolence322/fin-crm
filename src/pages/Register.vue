<template>
  <form class="card auth-card" @submit.prevent="onSignIn">
    <div class="card-content">
      <span class="card-title">{{'CRM_Title' | locale}}</span>

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{'invalid':($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
        />
        <label for="name">{{'Name' | locale}}</label>
        <small class="helper-text invalid" v-if="($v.name.$dirty && !$v.name.required)">Пустое поле</small>
        <small
          class="helper-text invalid"
          v-if="($v.name.$dirty && !$v.name.minLength)"
        >{{'Message_MinLength' | locale}} {{$v.name.$params.minLength.min}}</small>
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
        <div class="input-field">
          <input
            id="password2"
            type="password"
            class="validate"
            :class="{'invalid': ($v.repeatPassword.$dirty && !$v.repeatPassword.repeatPassword)}"
            v-model="repeatPassword"
          />
          <label for="password">{{'Password' | locale}}</label>
          <small
            class="helper-text invalid"
            v-if="($v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword)"
          >{{'RepeatPassword' | locale}}</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="check" />
            <span>{{'AcceptRules' | locale}}</span>
          </label>
          <small
            class="helper-text invalid"
            v-if="($v.check.$dirty && !$v.check.checked)"
          >{{'AcceptRules' | locale}}</small>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button class="btn waves-effect waves-light auth-submit" type="submit">
            {{'Register' | locale}}
            <i class="material-icons right">send</i>
          </button>
        </div>
        <p class="center">
          {{'HasAccount' | locale}}
          <router-link to="/login">{{'Login' | locale}}</router-link>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";
import localeFilter from "@/filters/locale.filter";

export default {
  name: "register",
  metaInfo() {
    return {
      title: localeFilter("Register"),
    };
  },
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      check: false,
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
    name: { required, minLength: minLength(3) },
    check: { checked: (v) => v },
  },
  methods: {
    async onSignIn() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$message("Accept Email");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.auth-submit {
  margin-bottom: 2rem;
}
</style>