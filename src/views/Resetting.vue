<template>
  <v-app>
    <viewport-card title="Восстановить пароль">
      <template v-slot:actions>
        <v-col>
          <v-row>
            <v-text-field
              label="Введите логин"
              :rules="rules"
              hide-details="auto"
            />
          </v-row>
          <v-row>
            <v-btn block outlined class="mt-6 mb-3">Восстановить</v-btn>
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
  components: { ViewportCard },
  name: "resetting",
  props: {},
  data() {
    return {
      loading: false,
    };
  },
};
</script>
