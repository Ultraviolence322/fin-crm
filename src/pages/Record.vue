<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_NewRecord' | locale}}</h3>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length">
      {{'NoCategories' | locale}}
      <router-link to="/categories">{{'AddFirst' | locale}}</router-link>
    </p>
    <form v-else class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{category.name}}</option>
        </select>
        <label>{{'SelectCategory' | locale}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{'Income' | locale}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{'Outcome' | locale}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{'invalid':($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minValue)}"
        />
        <label for="amount">{{'Amount' | locale}}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.required"
          class="helper-text invalid"
        >{{'Message_EnterAmount' | locale}}</span>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >{{'Message_MinLength' | locale}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="des"
          :class="{'invalid':$v.des.$dirty && !$v.des.required}"
        />
        <label for="description">{{'Description'|locale}}</label>
        <span
          v-if="$v.des.$dirty && !$v.des.required"
          class="helper-text invalid"
        >{{'Message_EnterDescription'|locale}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create' | locale}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import localeFilter from "@/filters/locale.filter";

export default {
  metaInfo() {
    return {
      title: localeFilter("Menu_NewRecord"),
    };
  },
  data() {
    return {
      categories: null,
      loading: true,
      select: null,
      amount: 1,
      des: "",
      type: "income",
      category: {},
      info: this.$store.getters.info,
    };
  },
  validations: {
    des: { required },
    amount: { required, minValue: minValue(1) },
  },
  methods: {
    isBill() {
      if (this.type === "outcome") {
        return this.info.bill >= this.amount;
      }
      return true;
    },
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.isBill()) {
        const newRecord = {
          categoryId: this.category,
          des: this.des,
          amount: this.amount,
          type: this.type,
          date: new Date().toJSON(),
        };
        try {
          await this.$store.dispatch("addRecord", newRecord);
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });
          this.amount = 1;
          this.des = "";
          this.info = this.$store.getters.info;
          this.$message(localeFilter("RecordHasBeenCreated"));
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$error(
          `${localeFilter("NotEnoughMoney")} (${this.info.bill - this.amount})`
        );
      }
    },
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.categories = this.categories.reverse();
      this.loading = false;
      if (this.categories.length) {
        this.category = this.categories[0].id;
        setTimeout(() => {
          this.select = window.M.FormSelect.init(this.$refs.select);
          window.M.updateTextFields();
        }, 0);
      }
    } catch (e) {
      console.log(e);
    }
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