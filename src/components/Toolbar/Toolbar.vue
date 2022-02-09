<template>
  <v-row
    class="toolbar-container my-0"
    :class="{ 'mx-10': !isPhone, 'mx-4': isPhone }"
  >
    <v-btn
      v-if="isPhone"
      class="ma-0 pa-0"
      color="white"
      min-width="0"
      plain
      @click="toggleNavigation"
    >
      <transition name="fade">
        <humburger-menu v-if="!isNavigationExpanded" />
      </transition>
      <transition name="fade">
        <close-menu v-if="isNavigationExpanded" />
      </transition>
    </v-btn>
    <v-spacer v-if="isPhone" />
    <v-btn color="white" plain class="ma-0 pa-0">
      <bag class="mr-3" />
      <span class="mr-2 secondary--text text-h6">SJR</span>
      <chevron-down />
    </v-btn>
    <v-spacer v-if="!isPhone" />
    <!-- кнопка камеры пока отключена за ненадобностью -->
    <!-- <v-btn @click="camera">Camera</v-btn> -->
    <toolbar-btn
      v-for="control in toolbarControls"
      :key="control.content"
      :content="control.content"
    >
      <template v-slot:icon>
        <component :is="control.icon"></component>
      </template>
    </toolbar-btn>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

import ToolbarBtn from "@/components/ToolbarBtn/ToolbarBtn.vue";

import HumburgerMenu from "@/assets/icons/toolbar/humburger-menu.svg";
import CloseMenu from "@/assets/icons/toolbar/close-menu.svg";
import Bag from "@/assets/icons/toolbar/bag.svg";
import ChevronDown from "@/assets/icons/toolbar/chevron-down.svg";
import Play from "@/assets/icons/toolbar/play.svg";
import Paper from "@/assets/icons/toolbar/paper.svg";
import ChatQuestion from "@/assets/icons/toolbar/chat-question.svg";

import { usePhotoGallery } from "@/composables/camera.js";

import "./Toolbar.scss";

export default {
  components: {
    ToolbarBtn,
    HumburgerMenu,
    CloseMenu,
    Bag,
    ChevronDown,
    Play,
    Paper,
    ChatQuestion,
  },

  name: "toolbar",

  data() {
    return {
      toolbarControls: [
        { icon: "Play", content: "видеоуроки" },
        { icon: "Paper", content: "инструкции" },
        { icon: "ChatQuestion", content: "задать вопрос" },
      ],
    };
  },

  computed: {
    ...mapGetters("common", {
      deviceType: ["GET_DEVICE_TYPE"],
    }),

    ...mapGetters("common", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    isPhone() {
      return this.deviceType === "phone";
    },
  },

  methods: {
    toggleNavigation() {
      this.$store.commit("common/TOGGLE_NAVIGATION");
    },

    // Камера отключена
    camera() {
      const { takePhoto } = usePhotoGallery();
      takePhoto();
    },
  },
};
</script>
