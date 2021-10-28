<template>
  <v-app>
    <viewport-card title="Восстановить пароль">
      <template v-slot:actions>
        <v-col>
          <v-row>
            <input-text label="Введите логин" />
          </v-row>
          <v-row>
            <v-btn block outlined class="mb-3">Восстановить</v-btn>
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
  components: { ViewportCard, InputText },
  name: "resetting",
  props: {},
};
</script>
