<template>
  <v-container class="navigation-user-menu">
    <transition name="fade">
      <v-row v-if="showUserMenu" class="navigation-user-menu--expanded">
        <v-col cols="auto" class="navigation-user-menu__icon">
          <user-icon />
        </v-col>
        <v-col cols="9" align-self="center">
          <v-row
            class="navigation-user-menu__name"
            align="center"
            justify="start"
          >
            <span class="navigation-user-menu__name-text">username</span>
            <chevron-down class="navigation-user-menu__button" />
          </v-row>
          <v-row class="navigation-user-menu__role">
            <span>Суперадминистратор</span>
          </v-row>
        </v-col>
      </v-row>
      <hamburger-menu
        v-if="!showUserMenu && !isPhone"
        class="navigation-user-menu__hamburger"
      />
    </transition>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { navigation } from "@/utils/constants";

import UserIcon from "@/assets/icons/navigation/user-icon.svg";
import ChevronDown from "@/assets/icons/navigation/chevron-down.svg";
import HamburgerMenu from "@/assets/icons/navigation/hamburger-menu.svg";

import "./NavigationUserMenu.scss";

export default {
  name: "navigation-user-menu",

  components: {
    UserIcon,
    ChevronDown,
    HamburgerMenu,
  },

  data() {
    return {
      showUserMenu: navigation.defaultState,
    };
  },

  methods: {},

  computed: {
    ...mapGetters("common", {
      deviceType: ["GET_DEVICE_TYPE"],
    }),

    ...mapGetters("common", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    isPhone() {
      return this.deviceType === "phone";
    },
  },

  mounted() {},

  watch: {
    isNavigationExpanded(val, oldVal) {
      if (oldVal) {
        this.showUserMenu = this.isNavigationExpanded;
      } else {
        setTimeout(() => {
          this.showUserMenu = this.isNavigationExpanded;
        }, 150);
      }
    },
  },
};
</script>
