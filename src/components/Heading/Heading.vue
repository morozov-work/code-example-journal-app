<template>
  <h1 class="mt-15">
    <v-col>
      <v-row align-content="center">
        <journals class="align-self-center mr-5" />
        <span
          class="text-uppercase font-weight-light"
          style="font-size: 2.5rem; letter-spacing: 0.15em"
          >мои журналы</span
        >
      </v-row>
    </v-col>
  </h1>
</template>

<script>
import Journals from "@/assets/icons/layout/journals.svg";

export default {
  components: {
    Journals,
  },

  name: "heading",
  props: {},

  data() {
    return {};
  },
};
</script>
