import Vue from "vue";
import Vuex from "vuex";
import { navigation as navigationConstants } from "@/util/constants";
import { calcViewportShift, findDeviceType } from "@/util/utils";

const { expandedWidth: expandedShift, collapsedWidth: collapsedShift } =
  navigationConstants;

Vue.use(Vuex);

const auth = {
  name: auth,
  namespaced: true,

  state: () => ({
    AUTH: false,
  }),

  mutations: {
    SET_AUTHORIZED: (state) => (state.AUTH = true),
    SET_UNAUTHORIZED: (state) => (state.AUTH = false),
  },

  actions: {
    AUTHORIZE: ({ commit }) => commit("SET_AUTHORIZED"),
    UNAUTHORIZE: ({ commit }) => commit("SET_UNAUTHORIZED"),
  },

  getters: {
    GET_AUTH: (state) => state.AUTH,
  },
};

const common = {
  name: common,
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

    SET_VIEWPORT_SHIFT: (state) => {
      if (state.DEVICE_TYPE === "tablet" || state.DEVICE_TYPE === "phone") {
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

const navigation = {
  name: navigation,
  namespaced: true,

  state: () => ({
    NAVIGATION_ACTIVE_PANEL: undefined,
    NAVIGATION_ACTIVE_JOURNAL: undefined,
  }),

  mutations: {
    SET_NAVIGATION_ACTIVE_PANEL: (state, payload) => {
      state.NAVIGATION_ACTIVE_PANEL = payload;
    },

    SET_NAVIGATION_ACTIVE_JOURNAL: (state, payload) => {
      state.NAVIGATION_ACTIVE_JOURNAL = payload;
    },
  },

  actions: {
    SET_NAVIGATION_ACTIVE_PANEL: ({ commit }, payload) => {
      commit("SET_NAVIGATION_ACTIVE_PANEL", payload);
    },

    SET_NAVIGATION_ACTIVE_JOURNAL: ({ commit }, payload) => {
      commit("SET_NAVIGATION_ACTIVE_JOURNAL", payload);
    },
  },

  getters: {
    GET_NAVIGATION_ACTIVE_PANEL: (state) => state.NAVIGATION_ACTIVE_PANEL,

    GET_NAVIGATION_ACTIVE_JOURNAL: (state) => state.NAVIGATION_ACTIVE_JOURNAL,
  },
};

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

export default new Vuex.Store({
  modules: {
    auth,
    common,
    navigation,
  },
});
