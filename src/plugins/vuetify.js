import Vue from "vue";
import Vuetify, { VBtn } from "vuetify/lib";

Vue.use(Vuetify);

VBtn.options.props.ripple.default = false;

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      options: { variations: false },
      light: {
        primary: "#F45A0C",
        secondary: "#424242",
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

/**
 * colors
 *
 * white   #FFFFFF
 * black   #2B2B2B
 * gray    #6F6E6E
 * gray100 #F4F4F4
 * color   #2A486E
 * color2  #F45A0C
 * hover2  #EA5409
 *
 * shadow
 *
 * background: #C4C4C4; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
 */
