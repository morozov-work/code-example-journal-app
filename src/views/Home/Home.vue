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
              @click="getApiData"
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

import { getCookie } from "@/util/cookie";

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
        "Бактерицидная установка",
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
      ],
    };
  },

  computed: {},

  methods: {
    async getData(path, page = false) {
      const base = "https://sjr.asap.dev03.spark-integration.ru/api/";
      const token = `Bearer ${getCookie("jr_access_token")}`;
      const url = base + path;

      const params = {
        headers: { Authorization: token },
      };

      if (page) params.params = { page: 1 };

      try {
        const data = await this.$http.get(url, params);
        console.log(data);
      } catch (e) {
        console.log(e);
        console.log(`${path} request failed`);
      }
    },

    async getApiData() {
      const logsUrl = "bactericidal_logs/004dc656-1b9b-4bfd-8627-4109fca3f3bd";
      const roomUrl = "room_industrials/256fb3dd-3b73-490d-859a-b3653fc8c6f5";
      // const usersUrl = "users/171f7f4d-7589-42fc-add0-5fb7ed68b341";
      // const departmentsUrl = "departments/e541c1f2-d123-426d-a313-6d5bb123adaf";
      // const emloyeesUrl = "employees/75a2948c-918e-440e-9bad-ce3025e675b5";
      const lampsUrl = "lamps/4483758e-85af-442e-b7b2-1a7dd0704970";

      await this.getData(logsUrl, true);
      await this.getData(roomUrl);
      // await this.getData(usersUrl); //request failed
      // await this.getData(departmentsUrl); //request failed
      // await this.getData(emloyeesUrl); //request failed
      await this.getData(lampsUrl);
    },
  },
};
</script>
