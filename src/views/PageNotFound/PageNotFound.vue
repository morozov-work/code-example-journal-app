<template>
  <v-app>
    <v-container class="wrapper" fluid>
      <v-card class="card-404" flat>
        <v-card-title class="card-404__title">
          <p>404</p>
        </v-card-title>
        <v-card-subtitle class="card-404__subtitle">
          <p>Page not found</p>
        </v-card-subtitle>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import "./PageNotFound.scss";

export default {
  name: "NotFound",
  props: {},
};
</script>
