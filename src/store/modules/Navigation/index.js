import navigationPanelsList from "./constants";

export default {
  name: "navigation",
  namespaced: true,

  state: () => ({
    NAVIGATION_PANELS_LIST: navigationPanelsList,

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

  actions: {},

  getters: {
    GET_NAVIGATION_PANELS_LIST: (state) => state.NAVIGATION_PANELS_LIST,

    GET_NAVIGATION_ACTIVE_PANEL: (state) => state.NAVIGATION_ACTIVE_PANEL,

    GET_NAVIGATION_ACTIVE_JOURNAL: (state) => state.NAVIGATION_ACTIVE_JOURNAL,
  },
};
