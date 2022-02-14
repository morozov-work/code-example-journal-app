export default {
  name: "debugging",
  namespaced: true,

  state: () => ({
    DEBUGGING_ITEMS_LIST: [],
  }),

  getters: {
    GET_DEBUGGING_ITEMS_LIST: (state) => state.DEBUGGING_ITEMS_LIST,
  },
};
