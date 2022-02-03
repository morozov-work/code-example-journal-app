import store from "@/store";
import router from "@/router";
import { login, getUser, refreshToken, logout, registration } from "@/api/auth";
import { setCookie } from "@/util/cookie";

const auth = {
  checkAuth: () => store.getters["auth/GET_AUTH_USER"],

  login: async (user) => {
    try {
      const response = await login(user);
      if (response.data) {
        setCookie("jr_access_token", response.data.token);
        store.commit("auth/SET_AUTH_USER", true);
        router.push({ name: "Home" });
      }
    } catch (e) {
      console.log("Login attempt failed.");
    }
  },

  // обновление токена - пока нет.
  checkTokens: async () => {
    try {
      const response = await getUser();
      setCookie("jr_access_token", response.data.token);
      store.commit("auth/SET_AUTH_USER", true);
    } catch (e) {
      console.log("Token verify check failed. Attempting token refresh...");
      try {
        await refreshToken();
        const response = await getUser();
        setCookie("jr_access_token", response.data.token);
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
    router.push({ name: "Login" });
  },

  // регистрация - пока нет.
  registration: async (user) => {
    try {
      const response = await registration(user);
      setCookie("jr_access_token", response.data.token);
      store.commit("auth/SET_AUTH_USER", true);
    } catch (e) {
      console.log("Registration attempt failed.");
    }
  },
};

export { auth };
