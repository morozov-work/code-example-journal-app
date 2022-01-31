<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from "vuex";
import { findDeviceType } from "@/util/utils";

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

  mounted() {
    // if (!this.$store.state.auth.AUTH) this.$router.push("/login");
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
