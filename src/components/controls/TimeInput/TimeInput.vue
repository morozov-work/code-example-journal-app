<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="value"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="time"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        @input="$emit('timeChange', $event.target.value)"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="time"
      full-width
      format="24hr"
      scrollable
      @click:minute="$refs.menu.save(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "time-input",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      required: true,
    },
  },

  model: {
    prop: "value",
    event: "timeChange",
  },

  data() {
    return { menu: false };
  },

  computed: {
    time: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("timeChange", value);
      },
    },
  },
};
</script>
