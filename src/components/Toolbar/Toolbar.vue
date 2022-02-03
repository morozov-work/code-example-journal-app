<template>
  <v-row class="mx-2">
    <v-btn color="white" plain>
      <bag class="mr-3" />
      <span class="mr-2 secondary--text text-h6">SJR</span>
      <chevron-down />
    </v-btn>
    <v-spacer />
    <v-btn @click="camera">Camera</v-btn>
    <v-btn @click="scanner">Scanner</v-btn>
    <v-btn v-if="!isTablet" color="white" plain>
      <play class="mr-3" />
      <span class="secondary--text text-h6">видеоуроки</span>
    </v-btn>
    <v-btn v-if="!isTablet" color="white" plain>
      <paper class="mr-3" />
      <span class="secondary--text text-h6">инструкции</span>
    </v-btn>
    <v-btn v-if="!isTablet" color="white" plain>
      <chat-question class="mr-3" />
      <span class="secondary--text text-h6">Задать вопрос</span>
    </v-btn>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import Bag from "@/assets/icons/toolbar/bag.svg";
import ChevronDown from "@/assets/icons/toolbar/chevron-down.svg";
import Play from "@/assets/icons/toolbar/play.svg";
import Paper from "@/assets/icons/toolbar/paper.svg";
import ChatQuestion from "@/assets/icons/toolbar/chat-question.svg";
import { usePhotoGallery } from "@/composables/camera.js";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

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

  computed: {
    ...mapGetters("common", {
      deviceType: ["GET_DEVICE_TYPE"],
    }),

    isTablet() {
      return this.deviceType === "tablet" || this.deviceType === "phone";
    },
  },

  methods: {
    camera() {
      const { takePhoto } = usePhotoGallery();
      takePhoto();
    },

    async scanner() {
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content);
      } else {
        console.log("no content");
      }
    },
  },
};
</script>
