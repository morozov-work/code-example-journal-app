<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from "vuex";
import { findDeviceType } from "@/util/utils";
import { checkToken } from "@/api/auth";

export default {
  name: "App",

  computed: {
    ...mapGetters("common", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),
  },

  methods: {
    onResize() {
      const type = findDeviceType();
      this.$store.commit("common/SET_DEVICE_TYPE", type);
      this.$store.commit("common/SET_VIEWPORT_SHIFT");
    },
  },

  watch: {
    isNavigationExpanded() {
      this.$store.commit("common/SET_VIEWPORT_SHIFT");
    },
  },

  async beforeMount() {
    try {
      this.$store.commit("auth/SET_IS_TOKEN_CHECKED");
      await checkToken();
      this.$store.commit("auth/SET_AUTH_USER", true);
      this.$router.push({ name: this.$route.name });
    } catch (e) {
      console.log(e);
    }
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
