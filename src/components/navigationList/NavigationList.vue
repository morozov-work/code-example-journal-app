<template>
  <v-row justify="center">
    <chevron></chevron>
    <v-expansion-panels accordion flat class="expansion-panels">
      <v-expansion-panel>
        <v-expansion-panel-header
          color="primary"
          class="expansion-panel-header"
        >
          <v-row :style="{ 'line-height': '1rem' }" align="center">
            <main-icon :style="{ 'margin-right': '16px' }" />
            Главная
          </v-row>
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
        >
          <v-row :style="{ 'line-height': '1rem' }" align="center">
            <component :is="item.icon" :style="{ 'margin-right': '16px' }" />
            {{ item.title }}
          </v-row>
          <template v-slot:actions>
            <v-icon color="#FFFFFF">mdi-chevron-down</v-icon>
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
import "./NavigationList.scss";
//import Chevron from "@/components/icons/Chevron.vue";
import MainIcon from "@/assets/icons/navigation/main.svg";
import JournalsIcon from "@/assets/icons/navigation/journals.svg";
import OrganizationsIcon from "@/assets/icons/navigation/organizations.svg";
import UsersIcon from "@/assets/icons/navigation/users.svg";
import NotificationsIcon from "@/assets/icons/navigation/notifications.svg";
import CheckoutIcon from "@/assets/icons/navigation/checkout.svg";

export default {
  name: "navigation-list",

  components: {
    MainIcon,
    JournalsIcon,
    OrganizationsIcon,
    UsersIcon,
    NotificationsIcon,
    CheckoutIcon,
  },

  data: () => ({
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

  methods: {},

  computed: {},

  mounted() {},
};
</script>
