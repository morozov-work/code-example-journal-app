<template>
  <v-container class="viewport-card" fluid>
    <v-card :loading="loading" min-width="500px" class="viewport-card__card">
      <v-card-title class="viewport-card__card--title">
        <slot name="title">
          <p>{{ title }}</p>
        </slot>
      </v-card-title>
      <v-card-actions>
        <v-container>
          <slot name="actions"></slot>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import "./ViewportCard.scss";

export default {
  name: "viewport-card",
  props: {
    title: String,
    loading: Boolean,
  },
};
</script>
