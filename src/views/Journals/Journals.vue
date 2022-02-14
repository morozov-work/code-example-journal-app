<template>
  <div class="d-flex flex-column align-start">
    <div>
      <warning-message />
      <heading />
      <div class="mt-6" style="display: flex; flex-wrap: wrap">
        <journal-card
          v-for="(journal, index) in journalsList"
          :key="index"
          :title="journal.title"
          :component="journal.component"
          :route="journal.route"
          width="400"
          height="276"
          @open="openJournal"
        >
          <template v-slot:icon>
            <component :is="journal.icon" />
          </template>
        </journal-card>
        <new-journal></new-journal>
      </div>
    </div>
  </div>
</template>

<script>
import WarningMessage from "@/components/WarningMessage/WarningMessage.vue";
import Heading from "@/components/Heading/Heading.vue";
import JournalCard from "@/components/JournalCard/JournalCard.vue";
import NewJournal from "@/components/NewJournal/NewJournal.vue";

import Germicidal from "@/assets/icons/journals/germicidal.svg";

export default {
  components: {
    WarningMessage,
    Heading,
    JournalCard,
    NewJournal,
    Germicidal,
  },

  name: "journals",

  computed: {
    journalsList() {
      return this.$store.getters["journals/GET_JOURNALS_ITEMS_LIST"];
    },
  },

  methods: {
    openJournal(params) {
      const { component, route } = params;
      this.$router.push({ name: "journal", params: { component, route } });
    },
  },
};
</script>
