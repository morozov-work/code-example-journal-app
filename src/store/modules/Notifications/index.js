export default {
  name: "notifications",
  namespaced: true,

  state: () => ({
    NOTIFICATIONS_ITEMS_LIST: [],
  }),

  getters: {
    GET_NOTIFICATIONS_ITEMS_LIST: (state) => state.NOTIFICATIONS_ITEMS_LIST,
  },
};
