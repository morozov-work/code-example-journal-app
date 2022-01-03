import Vue from "vue";
import Vuex from "vuex";
import { navigation as navigationConstants } from "@/util/constants";

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

const layout = {
  name: layout,
  namespaced: true,

  state: () => ({
    NAVIGATION_EXPANDED: navigationConstants.defaultState,
  }),

  mutations: {
    SET_NAVIGATION_EXPANDED: (state) => {
      state.NAVIGATION_EXPANDED = !state.NAVIGATION_EXPANDED;
    },
  },

  actions: {
    TOGGLE_NAVIGATION_EXPANDED({ commit }) {
      commit("SET_NAVIGATION_EXPANDED");
    },
  },

  getters: {
    GET_NAVIGATION_EXPANDED: (state) => state.NAVIGATION_EXPANDED,

    GET_VIEWPORT_SHIFT: (state) => {
      const { expandedWidth: expandedShift, collapsedWidth: collapsedShift } =
        navigationConstants;
      return state.NAVIGATION_EXPANDED ? expandedShift : collapsedShift;
    },
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
    SET_NAVIGATION_ACTIVE_PANEL: (state) => state.NAVIGATION_ACTIVE_PANEL,

    SET_NAVIGATION_ACTIVE_JOURNAL: (state) => state.NAVIGATION_ACTIVE_JOURNAL,
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
    layout,
    navigation,
  },
});
