<template>
  <main-layout>
    <template v-slot:content>HOME</template>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout/MainLayout.vue";

export default {
  components: {
    MainLayout,
  },

  name: "Home",

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>
