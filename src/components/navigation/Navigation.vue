<template>
  <v-navigation-drawer
    :mini-variant="!isNavigationExpanded"
    :mini-variant-width="collapsedWidth"
    :width="expandedWidth"
    color="primary"
    app
  >
    <v-col>
      <v-row>
        <v-btn @click="toogleNavigationExpanded">expand</v-btn>
      </v-row>
      <navigation-list></navigation-list>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
import NavigationList from "@/components/NavigationList/NavigationList.vue";

import { mapGetters, mapActions } from "vuex";
import { navigation as navigationSettings } from "@/util/constants";

import "./Navigation.scss";

export default {
  name: "navigation",

  components: {
    NavigationList,
  },

  methods: {
    ...mapActions("layout", ["TOGGLE_NAVIGATION_EXPANDED"]),

    toogleNavigationExpanded() {
      this.$store.dispatch("layout/TOGGLE_NAVIGATION_EXPANDED");
    },
  },

  computed: {
    ...mapGetters("layout", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    expandedWidth: () => navigationSettings.expandedWidth,

    collapsedWidth: () => navigationSettings.collapsedWidth,
  },

  mounted() {},
};
</script>
