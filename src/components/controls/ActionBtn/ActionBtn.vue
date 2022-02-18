<template>
  <v-btn depressed plain min-width="0" @click.stop="$emit('click')"
    ><span class="secondary--text"><slot /></span
  ></v-btn>
</template>

<script>
import "./ActionBtn.scss";

export default {
  name: "action-btn",
  props: {},

  data() {
    return {};
  },

  methods: {},
};
</script>
