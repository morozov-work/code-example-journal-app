import store from "@/store";
import router from "@/router";
import { login, getUser, refreshToken, logout, registration } from "@/api/auth";
import { setCookie } from "@/util/cookie";
import { AUTH_TOKEN_NAME } from "@/util/constants";

const auth = {
  checkAuth: () => store.getters["auth/GET_AUTH_USER"],

  isFirstLoad: () => !store.getters["auth/GET_IS_TOKEN_CHECKED"],

  login: async (user) => {
    try {
      const response = await login(user);
      if (response.data) {
        setCookie(AUTH_TOKEN_NAME, response.data.token);
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
      setCookie(AUTH_TOKEN_NAME, response.data.token);
      store.commit("auth/SET_AUTH_USER", true);
    } catch (e) {
      console.log("Token verify check failed. Attempting token refresh...");
      try {
        await refreshToken();
        const response = await getUser();
        setCookie(AUTH_TOKEN_NAME, response.data.token);
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
      setCookie(AUTH_TOKEN_NAME, response.data.token);
      store.commit("auth/SET_AUTH_USER", true);
    } catch (e) {
      console.log("Registration attempt failed.");
    }
  },
};

export { auth };
