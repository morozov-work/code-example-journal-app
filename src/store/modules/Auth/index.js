export default {
  name: "auth",
  namespaced: true,

  state: () => ({
    AUTH_USER: false,
    IS_TOKEN_CHECKED: false,
  }),

  mutations: {
    SET_AUTH_USER: (state, auth) => (state.AUTH_USER = auth),
    SET_IS_TOKEN_CHECKED: (state) => (state.IS_TOKEN_CHECKED = true),
  },

  actions: {},

  getters: {
    GET_AUTH_USER: (state) => state.AUTH_USER,
    GET_IS_TOKEN_CHECKED: (state) => state.IS_TOKEN_CHECKED,
  },
};
