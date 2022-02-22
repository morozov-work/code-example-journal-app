<template>
  <v-btn
    class="action-btn"
    :depressed="depressed"
    :rounded="rounded"
    :plain="plain"
    color="white"
    min-width="0"
    @click.stop="$emit('click')"
    ><span class="secondary--text"><slot /></span
  ></v-btn>
</template>

<script>
import "./ActionBtn.scss";

export default {
  name: "action-btn",
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },

    depressed: {
      type: Boolean,
      default: true,
    },

    plain: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
