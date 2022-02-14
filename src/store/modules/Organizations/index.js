export default {
  name: "organizations",
  namespaced: true,

  state: () => ({
    ORGANIZATIONS_ITEMS_LIST: [],
  }),

  getters: {
    GET_ORGANIZATIONS_ITEMS_LIST: (state) => state.ORGANIZATIONS_ITEMS_LIST,
  },
};
