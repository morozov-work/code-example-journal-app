export default {
  name: "home",
  namespaced: true,

  state: () => ({
    HOME_ITEMS_LIST: [],
  }),

  getters: {
    GET_HOME_ITEMS_LIST: (state) => state.HOME_ITEMS_LIST,
  },
};
