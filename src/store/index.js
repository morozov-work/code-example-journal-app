import Vue from "vue";
import Vuex from "vuex";
import { navigation } from "@/util/constants";

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
    NAVIGATION_EXPANDED: navigation.defaultState,
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
        navigation;
      return state.NAVIGATION_EXPANDED ? expandedShift : collapsedShift;
    },
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
  },
});
