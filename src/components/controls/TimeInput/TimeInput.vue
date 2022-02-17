<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        :required="required"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="time"
      format="24hr"
      full-width
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
    /*
     * Передаем дату, которую будем использовать при фортатировании времени в ISO
     */
    date: {
      type: String,
      default: new Date(Date.now()).toISOString(),
      validator: function (value) {
        if (!value) return true;
        const reg = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        return reg.test(value);
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  model: {
    prop: "value",
    event: "timechange",
  },

  data() {
    return {
      menu: false,
      time: "",
    };
  },

  computed: {
    asISODate() {
      const startTime = "00:00";
      const date = this.date
        ? this.date.slice(0, 11)
        : new Date(Date.now()).toISOString().slice(0, 11);
      const [hours, minutes] = this.time
        ? this.time.split(":")
        : startTime.split(":");
      return this.time ? `${date}${hours}:${minutes}:00.000Z` : "";
    },

    currentValue() {
      return this.value;
    },

    currentDate() {
      return this.date;
    },
  },

  watch: {
    asISODate(newVal) {
      this.$emit("timechange", newVal);
    },

    currentValue(newVal) {
      if (!newVal) this.time = "";
    },

    currentDate(newVal, oldVal) {
      if (!newVal && oldVal) this.time = "";
    },
  },
};
</script>
