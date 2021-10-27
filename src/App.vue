<template>
  <v-app
    ><v-app-bar
      :style="{
        left: viewportShift,
      }"
      app
    ></v-app-bar>
    <navigation></navigation>

    <v-main
      :style="{
        'padding-left': viewportShift,
      }"
    >
      <v-container fluid>
        <v-layout wrap>
          <v-card
            :style="{ margin: '0 20px 20px 0' }"
            v-for="(journal, index) in journals"
            :key="index"
            width="350"
            height="207"
          >
            {{ journal }}
          </v-card>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/navigation/Navigation.vue";
import { mapGetters } from "vuex";
export default {
  components: { Navigation },
  name: "App",

  data: () => ({
    showNav: true,
    navItems: [
      "Журналы",
      "Организации",
      "пользователи",
      "оповещения",
      "Отладка",
    ],
    journals: [
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
    ],
  }),

  methods: {
    onToggleMenu() {
      this.showNav = !this.showNav;
    },
  },

  computed: {
    ...mapGetters("layout", {
      viewportShift: ["GET_VIEWPORT_SHIFT"],
    }),
  },
};
</script>
