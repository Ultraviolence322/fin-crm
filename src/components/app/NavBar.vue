<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('togglesidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{data | date('datatime')}}</span>
      </div>

      <ul class="right">
        <li>
          <a ref="dropdown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{'ProfileTitle' | locale}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{'Exit' | locale}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      data: new Date(),
      interval: null,
      dropdown: null,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.data = new Date();
    }, 1000);
    window.M.Dropdown.init(this.$refs.dropdown);
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style>
</style>