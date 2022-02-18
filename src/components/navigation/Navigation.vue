<template>
  <v-navigation-drawer
    :mini-variant="!isNavigationExpanded"
    :mini-variant-width="collapsedWidth"
    :width="navigationWidth"
    :height="navigationHeight"
    color="primary"
    :expand-on-hover="!isPhone"
    disable-resize-watcher
    mobile-breakpoint="0"
    hide-overlay
    permanent
    :clipped="isPhone"
    app
    ref="drawer"
    @mouseenter.native="onMouseEnter"
    @mouseleave.native="onMouseLeave"
    @update:mini-variant="onUpdateMiniVariant"
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

    isPhone() {
      return this.deviceType === "phone";
    },

    expandedWidth() {
      return this.isPhone
        ? navigationSettings.expandedWidthMobile
        : navigationSettings.expandedWidth;
    },

    collapsedWidth() {
      return this.isPhone
        ? navigationSettings.collapsedWidthMobile
        : navigationSettings.collapsedWidth;
    },

    navigationWidth() {
      return this.isNavigationExpanded
        ? this.expandedWidth
        : this.collapsedWidth;
    },

    navigationHeight() {
      return "100%";
    },
  },

  methods: {
    onMouseEnter() {
      if (!this.isPhone) {
        this.$store.commit("common/SET_NAVIGATION_EXPANDED");
      }
    },

    onMouseLeave() {
      if (!this.isPhone) {
        this.$store.commit("common/SET_NAVIGATION_COLLAPSED");
      }
    },

    onUpdateMiniVariant(isCollapsed) {
      if (isCollapsed) {
        this.$store.commit("common/SET_NAVIGATION_COLLAPSED");
      }
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
