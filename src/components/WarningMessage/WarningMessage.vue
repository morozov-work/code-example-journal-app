<template>
  <div
    class="app-warning d-flex align-center justify-space-between mt-4 py-4 px-8"
  >
    <div class="d-flex align-center mr-4">
      <warning class="align-self-center mr-4" />
      <v-col>
        <v-row>
          <span class="font-weight-semibold black--text text-h6"
            >У Вас имеются незаполненные журналы</span
          >
        </v-row>
        <v-row>
          <span class="font-weight-medium gray--text"
            >Заполните данные в разделе “журналы”</span
          >
        </v-row>
      </v-col>
    </div>
    <close />
  </div>
</template>

<script>
import Warning from "@/assets/icons/layout/warning.svg";
import Close from "@/assets/icons/layout/close.svg";

import "./WarningMessage.scss";

export default {
  components: {
    Warning,
    Close,
  },

  name: "warning-message",
  props: {},

  data() {
    return {};
  },
};
</script>
