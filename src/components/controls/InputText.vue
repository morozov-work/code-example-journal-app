<template>
  <v-text-field
    outlined
    dense
    :append-icon="icon"
    :type="type"
    :label="label"
    :rules="rules"
    :hint="hint"
    @click:append="show = !show"
  />
</template>

<script>
export default {
  name: "input-text",
  props: {
    label: String,
    /**
     * Валидация
     */
    rules: {
      type: Object,
      default: () => {},
    },
    /**
     * Подсказка под инпутом
     */
    hint: {
      type: String,
      default: undefined,
    },
    /**
     * нужно ли скрывать вводимые символы
     */
    password: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    type() {
      return this.password && !this.show ? "password" : "text";
    },
    icon() {
      if (this.password) return this.show ? "mdi-eye" : "mdi-eye-off";
      return undefined;
    },
  },
};
</script>
