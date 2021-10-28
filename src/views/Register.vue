<template>
  <v-app>
    <viewport-card title="Заявка на подключение к BARLANE ЖУРНАЛЫ">
      <template v-slot:actions>
        <v-col>
          <v-row v-for="(input, index) in inputs" :key="index">
            <input-text :label="input" />
          </v-row>
          <v-row>
            <v-btn block outlined class="mt-6 mb-3">Регистрация</v-btn>
          </v-row>
          <v-row>
            <router-link to="/login"> Вернуться на страницу входа </router-link>
          </v-row>
        </v-col>
      </template>
    </viewport-card>
  </v-app>
</template>

<script>
import ViewportCard from "@/components/ViewportCard/ViewportCard.vue";
import InputText from "@/components/controls/InputText.vue";

export default {
  name: "register",
  components: { ViewportCard, InputText },
  props: {},
  data() {
    return {
      inputs: ["E-Mail", "ФИО", "Телефон", "Наименование организации"],
    };
  },
};
</script>
