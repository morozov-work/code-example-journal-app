<template>
  <svg>{{ svg }}</svg>
</template>

<script>
import svg from "@/assets/icons/navigation/chevron-down.svg";
export default {
  name: "chevron",

  computed: {
    svg() {
      return svg;
    },
  },

  mounted() {},
};
</script>
