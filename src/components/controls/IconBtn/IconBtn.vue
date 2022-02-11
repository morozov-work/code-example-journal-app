<template>
  <v-btn
    depressed
    class="icon-btn"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    @click.stop="$emit('click')"
  >
    <slot name="content"></slot>
    <pop-up :content="popUpContent" v-if="showPopUp && popUpContent" />
  </v-btn>
</template>

<script>
import "./IconBtn.scss";

export default {
  name: "icon-btn",
  props: {
    popUpContent: String,
  },

  data() {
    return {
      hover: false,
      showPopUp: false,
      hoverTimeout: undefined,
    };
  },

  methods: {
    mouseOver: function () {
      this.hover = true;
      this.hoverTimeout = setTimeout(() => {
        if (this.hover) {
          this.showPopUp = true;
        }
      }, 1500);
    },

    mouseLeave: function () {
      this.hover = false;
      this.showPopUp = false;
    },
  },
};
</script>
