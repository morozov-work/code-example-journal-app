<template>
  <main-layout>
    <template v-slot:content>
      <div class="d-flex flex-column align-start">
        <div>
          <warning-message />
          <heading />
          <div class="mt-6" style="display: flex; flex-wrap: wrap">
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
    </template>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout/MainLayout.vue";
import WarningMessage from "@/components/WarningMessage/WarningMessage.vue";
import Heading from "@/components/Heading/Heading.vue";
import JournalCard from "@/components/JournalCard/JournalCard.vue";
import NewJournal from "@/components/NewJournal/NewJournal.vue";

import TemperatureHumidity from "@/assets/icons/journals/temperature-humidity.svg";

import "./Home.scss";

export default {
  components: {
    MainLayout,
    WarningMessage,
    Heading,
    JournalCard,
    NewJournal,
    TemperatureHumidity,
  },

  name: "Home",

  data() {
    return {
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
    };
  },

  computed: {},

  methods: {},
};
</script>
