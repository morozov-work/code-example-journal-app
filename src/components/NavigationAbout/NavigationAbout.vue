<template>
  <div class="navigation-about">
    <transition name="fade">
      <div v-if="showAbout" class="navigation-about__logo">
        <spark-logo />
      </div>
    </transition>
    <transition name="fade">
      <v-col v-if="showAbout" class="pt-0 pb-4">
        <v-row align="center" class="navigation-about__item about-item mt-0">
          <about-location class="about-item__icon" />
          <span class="about-item__text">
            г. Тула, проспект Ленина, дом 104, офис 210
          </span>
        </v-row>
        <v-row align="center" class="navigation-about__item about-item mt-0">
          <about-phone class="about-item__icon" />
          <span class="about-item__text"> +7 (499) 705-99-36 </span>
        </v-row>
        <v-row
          align="center"
          class="navigation-about__item about-item mb-0 mt-0"
        >
          <about-email class="about-item__icon" />
          <span class="about-item__text"> up@spark-integration.ru </span>
        </v-row>
      </v-col>
      <check-mark v-else class="navigation-about__check-mark" />
    </transition>
    <backdrop
      class="navigation-about__backdrop"
      :style="{ position: 'absolute', bottom: parallax, left: 0 }"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { navigation } from "@/util/constants";

import SparkLogo from "@/assets/icons/navigation/spark-logo.svg";
import AboutLocation from "@/assets/icons/navigation/about-location.svg";
import AboutPhone from "@/assets/icons/navigation/about-phone.svg";
import AboutEmail from "@/assets/icons/navigation/about-email.svg";
import CheckMark from "@/assets/icons/navigation/check-mark.svg";
import Backdrop from "@/assets/icons/navigation/backdrop.svg";

import "./NavigationAbout.scss";

export default {
  name: "navigation-about",

  components: {
    AboutLocation,
    AboutPhone,
    AboutEmail,
    SparkLogo,
    CheckMark,
    Backdrop,
  },

  props: {
    scrollTop: Number,
  },

  data() {
    return {
      showAbout: navigation.defaultState,
    };
  },

  methods: {},

  computed: {
    ...mapGetters("common", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    parallax() {
      return this.scrollTop / 4;
    },
  },

  mounted() {},

  watch: {
    isNavigationExpanded(val, oldVal) {
      if (oldVal) {
        this.showAbout = this.isNavigationExpanded;
      } else {
        setTimeout(() => {
          this.showAbout = this.isNavigationExpanded;
        }, 150);
      }
    },
  },
};
</script>
