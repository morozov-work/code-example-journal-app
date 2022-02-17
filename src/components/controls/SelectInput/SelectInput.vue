<template>
  <v-select
    :value="value"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    :required="required"
    :menu-props="{ contentClass: 'select-input' }"
    @input="onInput"
  ></v-select>
</template>

<script>
import "./SelectInput.scss";

export default {
  name: "select-input",
  props: {
    label: {
      type: String,
      default: "",
    },

    value: {
      type: [String, Number],
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },

    itemText: {
      type: String,
      default: "",
    },

    itemValue: {
      type: String,
      default: "",
    },

    required: {
      type: Boolean,
      default: false,
    },
  },

  model: {
    prop: "value",
    event: "select",
  },

  methods: {
    onInput(value) {
      this.$emit("select", value);
    },
  },
};
</script>
