<template>
  <v-app>
    <v-app-bar
      :style="{ left: viewportShift }"
      class="app-toolbar"
      flat
      color="white"
      height="56px"
      app
    >
      <toolbar />
    </v-app-bar>
    <navigation></navigation>
    <v-main :style="{ 'padding-left': viewportShift }">
      <v-container fluid class="pt-0 pr-4 pr-sm-10 pb-4 pb-sm-10 pl-4 pl-sm-10">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";

import { mapGetters } from "vuex";

import "./MainLayout.scss";

export default {
  components: {
    Navigation,
    Toolbar,
  },

  name: "main-layout",

  computed: {
    ...mapGetters("common", {
      viewportShift: ["GET_VIEWPORT_SHIFT"],
    }),
  },
};
</script>
