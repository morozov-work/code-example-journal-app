<template>
  <v-menu
    v-model="menu"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        :required="required"
        :rules="rules"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "date-input",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },

    rules: {
      type: Array,
      required: false,
    },
  },

  model: {
    prop: "value",
    event: "dateChange",
  },

  data() {
    return {
      menu: false,
    };
  },

  computed: {
    date: {
      get: function () {
        return this.dateFormatted(this.value);
      },
      set: function (value) {
        this.$emit("dateChange", this.ISODate(value));
      },
    },
  },

  methods: {
    dateFormatted(date) {
      return date ? date.slice(0, 10) : "";
    },

    ISODate(date) {
      return date ? new Date(Date.parse(date)).toISOString() : "";
    },
  },
};
</script>
