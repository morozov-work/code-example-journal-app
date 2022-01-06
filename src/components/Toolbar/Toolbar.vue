<template>
  <v-row class="mx-2">
    <v-btn color="white" plain>
      <bag class="mr-3" />
      <span class="mr-2 secondary--text text-h6">SJR</span>
      <chevron-down />
    </v-btn>
    <v-spacer />
    <v-btn color="white" plain>
      <play class="mr-3" />
      <span class="secondary--text text-h6">видеоуроки</span>
    </v-btn>
    <v-btn color="white" plain>
      <paper class="mr-3" />
      <span class="secondary--text text-h6">инструкции</span>
    </v-btn>
    <v-btn color="white" plain>
      <chat-question class="mr-3" />
      <span class="secondary--text text-h6">Задать вопрос</span>
    </v-btn>
  </v-row>
</template>

<script>
import Bag from "@/assets/icons/toolbar/bag.svg";
import ChevronDown from "@/assets/icons/toolbar/chevron-down.svg";
import Play from "@/assets/icons/toolbar/play.svg";
import Paper from "@/assets/icons/toolbar/paper.svg";
import ChatQuestion from "@/assets/icons/toolbar/chat-question.svg";

export default {
  components: {
    Bag,
    ChevronDown,
    Play,
    Paper,
    ChatQuestion,
  },

  name: "toolbar",
  props: {},

  data() {
    return {};
  },
};
</script>
