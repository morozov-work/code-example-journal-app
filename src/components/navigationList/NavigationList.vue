<template>
  <v-row justify="center">
    <chevron></chevron>
    <v-expansion-panels accordion flat class="expansion-panels">
      <v-expansion-panel>
        <v-expansion-panel-header color="primary" class="expansion-panel-header"
          >Главная</v-expansion-panel-header
        >
      </v-expansion-panel>
      <v-expansion-panel
        v-for="(item, index) in navItems"
        :key="index"
        class="expansion-panel"
      >
        <v-expansion-panel-header color="primary" class="expansion-panel-header"
          >{{ item }}
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
import Chevron from "@/components/icons/Chevron.vue";

export default {
  name: "navigation-list",

  components: {
    Chevron,
  },

  data: () => ({
    navItems: [
      "Журналы",
      "Организации",
      "пользователи",
      "оповещения",
      "Отладка",
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
