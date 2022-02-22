import store from "@/store";
import router from "@/router";
import { login, getUser, refreshToken, logout, registration } from "@/api/auth";
import { setCookie, getCookie } from "@/utils/cookie";
import { AUTH_TOKEN_NAME } from "@/utils/constants";

const auth = {
  checkAuth: () => store.getters["auth/GET_AUTH_USER"],

  isFirstLoad: () => !store.getters["auth/GET_IS_TOKEN_CHECKED"],

  getToken: () => getCookie(AUTH_TOKEN_NAME),

  setToken: (token) => setCookie(AUTH_TOKEN_NAME, token),

  login: async (user) => {
    try {
      const response = await login(user);
      if (response.data) {
        auth.setToken(response.data.token);
        store.commit("auth/SET_AUTH_USER", true);
        router.push({ name: "home" });
      }
    } catch (e) {
      console.log("Login attempt failed.");
    }
  },

  // обновление токена - пока нет.
  checkTokens: async () => {
    try {
      const response = await getUser();
      auth.setToken(response.data.token);
      store.commit("auth/SET_AUTH_USER", true);
    } catch (e) {
      console.log("Token verify check failed. Attempting token refresh...");
      try {
        await refreshToken();
        const response = await getUser();
        auth.setToken(response.data.token);
        store.commit("auth/SET_AUTH_USER", true);
      } catch (e) {
        console.log("Token refresh attempt failed.");
      }
    }
  },

  // выйти - пока нет.
  logout: async () => {
    await logout();
    store.commit("auth/SET_AUTH_USER", false);
    router.push({ name: "login" });
  },

  // регистрация - пока нет.
  registration: async (user) => {
    try {
      const response = await registration(user);
      auth.setToken(response.data.token);
      store.commit("auth/SET_AUTH_USER", true);
    } catch (e) {
      console.log("Registration attempt failed.");
    }
  },
};

export { auth };
