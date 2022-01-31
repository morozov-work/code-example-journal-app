<template>
  <v-navigation-drawer
    v-show="!isTablet"
    :mini-variant="!isNavigationExpanded"
    :mini-variant-width="collapsedWidth"
    :width="expandedWidth"
    color="primary"
    expand-on-hover
    disable-resize-watcher
    mobile-breakpoint="0"
    hide-overlay
    permanent
    app
    ref="drawer"
    @mouseenter.native="onMouseEnter"
    @mouseleave.native="onMouseLeave"
  >
    <div class="navigation-wrapper" ref="wrapper">
      <navigation-user-menu />
      <navigation-list />
      <navigation-about :scroll-top="scroll" />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters("common", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    ...mapGetters("common", {
      deviceType: ["GET_DEVICE_TYPE"],
    }),

    isTablet() {
      return this.deviceType === "tablet" || this.deviceType === "phone";
    },

    expandedWidth: () => navigationSettings.expandedWidth,

    collapsedWidth: () => navigationSettings.collapsedWidth,
  },

  methods: {
    onMouseEnter() {
      this.$store.commit("common/SET_NAVIGATION_EXPANDED");
    },

    onMouseLeave() {
      this.$store.commit("common/SET_NAVIGATION_COLLAPSED");
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
