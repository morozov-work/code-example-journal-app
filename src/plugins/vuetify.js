import Vue from "vue";
import Vuetify, { VBtn, VCheckbox } from "vuetify/lib";

Vue.use(Vuetify);

VBtn.options.props.ripple.default = false;
VCheckbox.options.props.ripple.default = false;

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      options: { variations: false },
      light: {
        primary: "#F45A0C", // default value: "#1976D2"
        primaryHover: "#EA5409", // custom
        secondary: "#2A486E", // default value: "#424242"
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
  global: {
    ripple: false,
  },
});
