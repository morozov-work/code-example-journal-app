export default {
  name: "auth",
  namespaced: true,

  state: () => ({
    AUTH_USER: false,
  }),

  mutations: {
    SET_AUTH_USER: (state, auth) => (state.AUTH_USER = auth),
  },

  actions: {},

  getters: {
    GET_AUTH_USER: (state) => state.AUTH_USER,
  },
};
