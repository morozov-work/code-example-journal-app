<template>
  <v-btn
    v-if="!isPhone"
    class="toolbar-btn pa-0"
    color="white"
    min-width="0"
    plain
  >
    <slot name="icon"></slot>
    <span v-if="!isTablet" class="toolbar-btn__content secondary--text text-h6">
      {{ content }}
    </span>
  </v-btn>
</template>

<script>
import { mapGetters } from "vuex";

import "./ToolbarBtn.scss";

export default {
  name: "toolbar-btn",

  props: {
    content: String,
  },

  computed: {
    ...mapGetters("common", {
      deviceType: ["GET_DEVICE_TYPE"],
    }),

    isPhone() {
      return this.deviceType === "phone";
    },

    isTablet() {
      return this.deviceType === "tablet";
    },
  },
};
</script>
