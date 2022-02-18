import { navigation as navigationConstants } from "@/util/constants";
import { calcViewportShift, findDeviceType } from "@/util/utils";

const { expandedWidth: expandedShift, collapsedWidth: collapsedShift } =
  navigationConstants;

export default {
  name: "common",
  namespaced: true,

  state: () => ({
    DEVICE_TYPE: findDeviceType(),

    NAVIGATION_EXPANDED: navigationConstants.defaultState,

    VIEWPORT_SHIFT: calcViewportShift(),
  }),

  mutations: {
    SET_DEVICE_TYPE: (state, payload) => {
      state.DEVICE_TYPE = payload;
    },

    SET_NAVIGATION_EXPANDED: (state) => {
      state.NAVIGATION_EXPANDED = true;
    },

    SET_NAVIGATION_COLLAPSED: (state) => {
      state.NAVIGATION_EXPANDED = false;
    },

    TOGGLE_NAVIGATION: (state) => {
      state.NAVIGATION_EXPANDED = !state.NAVIGATION_EXPANDED;
    },

    SET_VIEWPORT_SHIFT: (state) => {
      if (state.DEVICE_TYPE === "phone") {
        state.VIEWPORT_SHIFT = 0;
      } else {
        state.VIEWPORT_SHIFT = state.NAVIGATION_EXPANDED
          ? expandedShift
          : collapsedShift;
      }
    },
  },

  actions: {},

  getters: {
    GET_DEVICE_TYPE: (state) => state.DEVICE_TYPE,

    GET_NAVIGATION_EXPANDED: (state) => state.NAVIGATION_EXPANDED,

    GET_VIEWPORT_SHIFT: (state) => state.VIEWPORT_SHIFT,
  },
};
