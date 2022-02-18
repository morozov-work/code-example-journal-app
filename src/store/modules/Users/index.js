export default {
  name: "users",
  namespaced: true,

  state: () => ({
    USERS_ITEMS_LIST: [],
  }),

  getters: {
    GET_USERS_ITEMS_LIST: (state) => state.USERS_ITEMS_LIST,
  },
};
