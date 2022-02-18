import journalsList from "./constants";

export default {
  name: "journals",
  namespaced: true,

  state: () => ({
    JOURNALS_ITEMS_LIST: journalsList,
  }),

  getters: {
    GET_JOURNALS_ITEMS_LIST: (state) => state.JOURNALS_ITEMS_LIST,
  },
};
