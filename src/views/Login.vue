<template>
  <v-app>
    <viewport-card title="Журналы">
      <template v-slot:actions>
        <v-col>
          <v-row>
            <v-text-field
              outlined
              dense
              label="Имя пользователя"
              :rules="rules"
              hide-details="auto"
            />
          </v-row>
          <v-row>
            <v-text-field
              outlined
              dense
              label="Пароль"
              :rules="rules"
              hide-details="auto"
            />
          </v-row>
          <v-row><v-checkbox label="Запомнить меня" /></v-row>
          <v-row><v-btn block outlined>Войти</v-btn></v-row>
          <v-row class="mt-5">
            <router-link to="/register">
              Регистрация нового пользователя
            </router-link>
          </v-row>
          <v-row class="mt-5">
            <router-link to="/resetting/request"> Забыли пароль? </router-link>
          </v-row>
        </v-col>
      </template>
    </viewport-card>
  </v-app>
</template>

<script>
import ViewportCard from "@/components/ViewportCard/ViewportCard.vue";

export default {
  name: "login",
  components: { ViewportCard },
  props: {},
  data() {
    return {
      loading: false,
    };
  },
};
</script>
