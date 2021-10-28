<template>
  <v-app>
    <viewport-card title="Журналы">
      <template v-slot:actions>
        <v-col>
          <v-row v-for="(input, index) in inputs" :key="index">
            <input-text :label="input.label" :password="input.password" />
          </v-row>
          <v-row><v-checkbox label="Запомнить меня" dense /></v-row>
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
import InputText from "@/components/controls/InputText.vue";

export default {
  name: "login",
  components: { ViewportCard, InputText },
  props: {},
  data() {
    return {
      inputs: [
        { label: "Имя пользователя", password: false },
        { label: "Пароль", password: true },
      ],
    };
  },
};
</script>
