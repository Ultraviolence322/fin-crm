<template>
  <ul class="sidenav app-sidenav" :class="{'open': isOpen}">
    <router-link
      v-for="link in links"
      :key="link.to"
      tag="li"
      active-class="active"
      :to="link.to"
      :exact="link.exact"
    >
      <a class="waves-effect waves-orange pointer">{{link.name | locale}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "sidebar",
  props: ["isOpen"],
  data() {
    return {
      links: [
        {
          name: "Bill",
          to: "/",
          exact: true,
        },
        {
          name: "Menu_History",
          to: "/history",
        },
        {
          name: "Menu_Planning",
          to: "/planning",
        },
        {
          name: "Menu_NewRecord",
          to: "/record",
        },
        {
          name: "Menu_Categories",
          to: "/categories",
        },
      ],
    };
  },
};
</script>

<style>
</style>