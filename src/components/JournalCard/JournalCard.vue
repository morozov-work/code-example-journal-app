<template>
  <v-card width="350" height="207"> journal </v-card>
</template>

<script>
import Add from "@/assets/icons/card/add.svg";
import Alert from "@/assets/icons/card/alert.svg";
import Download from "@/assets/icons/card/download.svg";
import Print from "@/assets/icons/card/print.svg";
import Settings from "@/assets/icons/card/settings.svg";

import "./JournalCard.scss";

export default {
  components: {
    Add,
    Alert,
    Download,
    Print,
    Settings,
  },

  name: "journal-card",
  props: {},

  data() {
    return {};
  },
};
</script>
