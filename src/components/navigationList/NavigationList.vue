<template>
  <v-row justify="center">
    <v-expansion-panels accordion flat class="expansion-panels">
      <v-expansion-panel>
        <v-expansion-panel-header
          color="primary"
          class="expansion-panel-header"
          :hide-actions="!showHeaders"
        >
          <v-row class="expansion-panel-header__content" align="center">
            <main-icon class="expansion-panel-header__content__icon" />
            <transition name="fade">
              <span v-if="showHeaders">Главная</span>
            </transition>
          </v-row>
          <template v-slot:actions>
            <transition name="fade">
              <chevron-down
                v-if="showHeaders"
                class="expansion-panel-header__chevron--main"
              />
            </transition>
          </template>
        </v-expansion-panel-header>
      </v-expansion-panel>
      <v-expansion-panel
        v-for="(item, index) in navItems"
        :key="index"
        class="expansion-panel"
      >
        <v-expansion-panel-header
          color="primary"
          class="expansion-panel-header"
          @click="onChange(item.title)"
        >
          <v-row class="expansion-panel-header__content" align="center">
            <component
              :is="item.icon"
              class="expansion-panel-header__content__icon"
            />
            <transition name="fade">
              <span v-if="showHeaders">{{ item.title }}</span>
            </transition>
          </v-row>
          <template v-slot:actions>
            <transition name="fade">
              <div v-if="showHeaders">
                <chevron-down
                  :class="
                    item.title === activeItem
                      ? 'expansion-panel-header__chevron--active'
                      : 'expansion-panel-header__chevron'
                  "
                />
              </div>
            </transition>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content color="primary">
          <v-list>
            <v-list-item v-for="(item, index) in content" :key="index">
              <v-list-item-content class="expansion-panel-content">
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
    activeItem: undefined,
    showHeaders: navigation.defaultState,
    navItems: [
      { title: "Журналы", icon: "JournalsIcon" },
      { title: "Организации", icon: "OrganizationsIcon" },
      { title: "Пользователи", icon: "UsersIcon" },
      { title: "Оповещения", icon: "NotificationsIcon" },
      { title: "Отладка", icon: "CheckoutIcon" },
    ],
    content: [
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

  methods: {
    onChange(item) {
      this.activeItem === item
        ? (this.activeItem = undefined)
        : (this.activeItem = item);
    },
  },

  computed: {
    ...mapGetters("layout", {
      isNavigationExpanded: ["GET_NAVIGATION_EXPANDED"],
    }),
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
