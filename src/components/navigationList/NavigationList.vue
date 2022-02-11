<template>
  <v-col>
    <v-row justify="center">
      <v-expansion-panels
        v-model="activePanelIndex"
        accordion
        flat
        tile
        hover
        class="expansion-panels"
        active-class="expansion-panel--active"
      >
        <v-expansion-panel
          v-for="(panel, index) in panels"
          :key="index"
          class="expansion-panel"
          style="background-color: #ffffff00 !important"
        >
          <v-expansion-panel-header
            color="primary"
            class="panel-header freeze-height"
            :hide-actions="!showHeaders"
            open="false"
            style="background-color: #ffffff00 !important"
          >
            <v-row class="panel-header__row" align="center">
              <component :is="panel.icon" class="panel-header__icon" />
              <transition name="fade">
                <span v-if="showHeaders" class="panel-header__title">
                  {{ panel.title }}
                </span>
              </transition>
            </v-row>
            <template v-slot:actions>
              <transition name="fade">
                <div v-if="showHeaders">
                  <chevron-down
                    :class="
                      index
                        ? 'panel-header__chevron'
                        : 'panel-header__chevron--main'
                    "
                  />
                </div>
              </transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content v-if="index">
            <v-list flat class="journals-list">
              <v-list-item-group v-model="activeJournalIndex">
                <v-list-item
                  color="purple"
                  v-for="(item, index) in panelsContent[panel.name]"
                  :key="index"
                  active-class="journal--active"
                  class="journal"
                >
                  <v-list-item-content class="journal-header">
                    <active-journal-pointer
                      class="journal-header__active-journal-pointer"
                    />
                    <span>{{ item.value }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { navigation } from "@/util/constants";

import MainIcon from "@/assets/icons/navigation/main.svg";
import JournalsIcon from "@/assets/icons/navigation/journals.svg";
import OrganizationsIcon from "@/assets/icons/navigation/organizations.svg";
import UsersIcon from "@/assets/icons/navigation/users.svg";
import NotificationsIcon from "@/assets/icons/navigation/notifications.svg";
import CheckoutIcon from "@/assets/icons/navigation/checkout.svg";
import ChevronDown from "@/assets/icons/navigation/chevron-down.svg";
import ActiveJournalPointer from "@/assets/icons/navigation/active-journal-pointer.svg";

import "./NavigationList.scss";

export default {
  name: "navigation-list",

  components: {
    MainIcon,
    JournalsIcon,
    OrganizationsIcon,
    UsersIcon,
    NotificationsIcon,
    CheckoutIcon,
    ChevronDown,
    ActiveJournalPointer,
  },

  data: () => ({
    activePanelIndex: undefined,
    activeJournalIndex: undefined,
    showHeaders: navigation.defaultState,
    panels: [
      {
        name: "main",
        title: "Главная",
        icon: "MainIcon",
      },
      {
        name: "journals",
        title: "Журналы",
        icon: "JournalsIcon",
      },
      {
        name: "organizations",
        title: "Организации",
        icon: "OrganizationsIcon",
      },
      {
        name: "users",
        title: "Пользователи",
        icon: "UsersIcon",
      },
      {
        name: "alerts",
        title: "Оповещения",
        icon: "NotificationsIcon",
      },
      {
        name: "debugging",
        title: "Отладка",
        icon: "CheckoutIcon",
      },
    ],

    panelsContent: {
      main: [],
      journals: [
        {
          name: "bactericidal",
          value: "Бактерицидная установка",
          route: "log-bactericidal",
        },
      ],
      organizations: [],
      users: [],
      alerts: [],
      debugging: [],
    },
  }),

  computed: {
    ...mapGetters("common", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    activePanel() {
      if (
        !this.isNavigationExpanded ||
        (!this.activePanelIndex && this.activePanelIndex !== 0)
      )
        return;
      return this.panels[this.activePanelIndex].title;
    },

    activeJournal() {
      if (
        !this.isNavigationExpanded ||
        (!this.activeJournalIndex && this.activeJournalIndex !== 0)
      )
        return;
      return this.panelsContent[this.activeJournalIndex];
    },
  },

  methods: {
    ...mapActions("navigation", ["SET_NAVIGATION_ACTIVE_PANEL"]),
    ...mapActions("navigation", ["SET_NAVIGATION_ACTIVE_JOURNAL"]),
  },

  mounted() {},

  watch: {
    isNavigationExpanded(newVal, oldVal) {
      if (oldVal) {
        this.activePanelIndex = undefined;
        this.activeJournalIndex = undefined;
        this.showHeaders = this.isNavigationExpanded;
      } else {
        setTimeout(() => {
          this.showHeaders = this.isNavigationExpanded;
        }, 150);
      }
    },

    activePanel(newVal) {
      this["SET_NAVIGATION_ACTIVE_PANEL"](newVal);
    },

    activeJournal(newVal) {
      this["SET_NAVIGATION_ACTIVE_JOURNAL"](newVal);
    },
  },
};
</script>
