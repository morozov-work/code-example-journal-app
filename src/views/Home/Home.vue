<template>
  <v-app>
    <v-app-bar
      :style="{ left: viewportShift }"
      class="app-toolbar"
      flat
      color="white"
      height="56px"
      app
    >
      <toolbar />
    </v-app-bar>
    <navigation></navigation>
    <v-main :style="{ 'padding-left': viewportShift }">
      <v-container fluid class="pt-0 pr-10 pb-10 pl-10">
        <div class="d-flex flex-column align-start">
          <div>
            <warning-message />
            <heading />
            <div
              class="mt-6"
              style="
                display: grid;
                grid-gap: 20px;
                grid-template-columns: repeat(3, auto);
              "
            >
              <!-- :style="{ margin: '0 20px 20px 0' }" -->
              <journal-card title="Температура и влажность помещения">
                <template v-slot:icon>
                  <temperature-humidity />
                </template>
              </journal-card>
              <v-card
                v-for="(journal, index) in journals"
                :key="index"
                width="400"
                height="276"
              >
                {{ journal }}
              </v-card>
              <new-journal></new-journal>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation/Navigation.vue";
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import WarningMessage from "@/components/WarningMessage/WarningMessage.vue";
import Heading from "@/components/Heading/Heading.vue";
import JournalCard from "@/components/JournalCard/JournalCard.vue";
import NewJournal from "@/components/NewJournal/NewJournal.vue";

import TemperatureHumidity from "@/assets/icons/journals/temperature-humidity.svg";

import { mapGetters } from "vuex";

import "./Home.scss";

export default {
  components: {
    Navigation,
    Toolbar,
    WarningMessage,
    Heading,
    JournalCard,
    NewJournal,
    TemperatureHumidity,
  },

  name: "Home",

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

  computed: {
    ...mapGetters("layout", {
      viewportShift: ["GET_VIEWPORT_SHIFT"],
    }),
  },
};
</script>
