<template>
  <v-navigation-drawer
    :mini-variant="!isNavigationExpanded"
    :mini-variant-width="collapsedWidth"
    :width="expandedWidth"
    color="primary"
    disable-resize-watcher
    hide-overlay
    permanent
    app
    ref="drawer"
  >
    <div class="navigation-wrapper" ref="wrapper">
      <!-- <v-button @click="toogleNavigationExpanded()">expand</v-button> -->
      <navigation-user-menu @toggle-navigation="toogleNavigationExpanded()" />
      <navigation-list />
      <navigation-about :scroll-top="scroll" />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { navigation as navigationSettings } from "@/util/constants";
import { ScrollWatcher } from "@/util/scrollWatcher";

import NavigationList from "@/components/NavigationList/NavigationList.vue";
import NavigationUserMenu from "@/components/NavigationUserMenu/NavigationUserMenu.vue";
import NavigationAbout from "../NavigationAbout/NavigationAbout.vue";

import "./Navigation.scss";

export default {
  name: "navigation",

  components: {
    NavigationList,
    NavigationUserMenu,
    NavigationAbout,
  },

  data() {
    return {
      scroll: 0,
    };
  },

  computed: {
    ...mapGetters("layout", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    expandedWidth: () => navigationSettings.expandedWidth,

    collapsedWidth: () => navigationSettings.collapsedWidth,
  },

  methods: {
    ...mapActions("layout", ["TOGGLE_NAVIGATION_EXPANDED"]),

    toogleNavigationExpanded() {
      this.$store.dispatch("layout/TOGGLE_NAVIGATION_EXPANDED");
    },
  },

  mounted() {
    const params = {
      context: this,
      valueName: "scroll",
      container: document.querySelector(".v-navigation-drawer__content"),
      target: this.$refs.wrapper,
    };
    new ScrollWatcher(params);
  },
};
</script>
