<template>
  <component :is="component" />
</template>

<script>
import BactericidalLog from "@/components/Journals/BactericidalLog/BactericidalLog.vue";
export default {
  name: "journal",
  components: {
    BactericidalLog,
  },
  props: {
    component: {
      type: String,
      required: true,
    },
  },

  methods: {},
};
</script>
