<template>
  <v-app>
    <viewport-card title="Заявка на подключение к BARLANE ЖУРНАЛЫ">
      <template v-slot:actions>
        <v-col>
          <v-row>
            <v-text-field label="E-Mail" :rules="rules" hide-details="auto" />
          </v-row>
          <v-row>
            <v-text-field label="ФИО" :rules="rules" hide-details="auto" />
          </v-row>
          <v-row>
            <v-text-field label="Телефон" :rules="rules" hide-details="auto" />
          </v-row>
          <v-row>
            <v-text-field
              label="Наименование организации"
              :rules="rules"
              hide-details="auto"
            />
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

export default {
  name: "register",
  components: { ViewportCard },
  props: {},
  data() {
    return {
      loading: false,
    };
  },
};
</script>
