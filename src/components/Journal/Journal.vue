<template>
  <component :is="currentJournal" />
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
      default: null,
    },
  },

  computed: {
    currentJournal() {
      if (this.component) return this.component;
      const journalsList =
        this.$store.getters["journals/GET_JOURNALS_ITEMS_LIST"];
      const currentJournal = journalsList.filter((journal) => {
        return journal.route === this.$attrs.route;
      });
      return currentJournal[0].component;
    },
  },
};
</script>
