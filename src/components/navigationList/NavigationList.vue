<template>
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
      >
        <v-expansion-panel-header
          color="primary"
          :class="
            index
              ? 'expansion-panel__header'
              : 'expansion-panel__header freeze-height'
          "
          :hide-actions="!showHeaders"
          open="false"
        >
          <v-row class="expansion-panel__header__row" align="center">
            <component
              :is="panel.icon"
              class="expansion-panel__header__row__icon"
            />
            <transition name="fade">
              <span v-if="showHeaders">{{ panel.title }}</span>
            </transition>
          </v-row>
          <template v-slot:actions>
            <transition name="fade">
              <div v-if="showHeaders">
                <chevron-down
                  :class="
                    index
                      ? 'expansion-panel__header__chevron'
                      : 'expansion-panel__header__chevron--main'
                  "
                />
              </div>
            </transition>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-if="index" color="primary">
          <v-list>
            <v-list-item v-for="(item, index) in panelsContent" :key="index">
              <v-list-item-content class="expansion-panel__content">
                {{ item }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { navigation } from "@/util/constants";

import MainIcon from "@/assets/icons/navigation/main.svg";
import JournalsIcon from "@/assets/icons/navigation/journals.svg";
import OrganizationsIcon from "@/assets/icons/navigation/organizations.svg";
import UsersIcon from "@/assets/icons/navigation/users.svg";
import NotificationsIcon from "@/assets/icons/navigation/notifications.svg";
import CheckoutIcon from "@/assets/icons/navigation/checkout.svg";
import ChevronDown from "@/assets/icons/navigation/chevron-down.svg";

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
  },

  data: () => ({
    activePanelIndex: undefined,
    showHeaders: navigation.defaultState,
    panels: [
      { title: "Главная", icon: "MainIcon" },
      { title: "Журналы", icon: "JournalsIcon" },
      { title: "Организации", icon: "OrganizationsIcon" },
      { title: "Пользователи", icon: "UsersIcon" },
      { title: "Оповещения", icon: "NotificationsIcon" },
      { title: "Отладка", icon: "CheckoutIcon" },
    ],
    panelsContent: [
      "Температура и влажность помещения",
      "Температура сотрудников",
      "Дезинсекция и дератизация",
      "Дезинфицирующие средства и дезинфекционные работы",
      "Скоропортящаяся пищевая продукция",
      "Температурный режим холодильного оборудования",
      "Температура и влажность склада",
      "Дефростация продуктов",
      "Фритюрные жиры",
      "Бракеражный журнал",
      "Гигиенический журнал здоровья",
      "Бактерицидная установка",
      "Генеральные уборки",
    ],
  }),

  computed: {
    ...mapGetters("layout", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),

    activePanel() {
      return this.activePanelIndex
        ? this.panels[this.activePanelIndex].title
        : undefined;
    },
  },

  mounted() {},

  watch: {
    isNavigationExpanded(val, oldVal) {
      if (oldVal) {
        this.showHeaders = this.isNavigationExpanded;
      } else {
        setTimeout(() => {
          this.showHeaders = this.isNavigationExpanded;
        }, 100);
      }
    },
  },
};
</script>
