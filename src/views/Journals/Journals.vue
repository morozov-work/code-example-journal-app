<template>
  <div class="d-flex flex-column align-start">
    <div>
      <warning-message />
      <heading />
      <div class="mt-6" style="display: flex; flex-wrap: wrap">
        <journal-card
          title="Журнал бактерицидных ламп"
          @openJournal="openJournal"
        >
          <template v-slot:icon>
            <germicidal />
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

<script>
import WarningMessage from "@/components/WarningMessage/WarningMessage.vue";
import Heading from "@/components/Heading/Heading.vue";
import JournalCard from "@/components/JournalCard/JournalCard.vue";
import NewJournal from "@/components/NewJournal/NewJournal.vue";

// import TemperatureHumidity from "@/assets/icons/journals/temperature-humidity.svg";
import Germicidal from "@/assets/icons/journals/germicidal.svg";

export default {
  components: {
    WarningMessage,
    Heading,
    JournalCard,
    NewJournal,
    // TemperatureHumidity,
    Germicidal,
  },

  name: "Journals",

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
    openJournal() {
      this.$router.push({ name: "Journal" });
    },
  },
};
</script>
