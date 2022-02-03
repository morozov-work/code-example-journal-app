import store from "@/store";
import router from "@/router";
import { login, getUser, refreshToken, logout, registration } from "@/api/auth";

const auth = {
  checkAuth: () => store.getters["auth/GET_AUTH_USER"],

  login: async (user) => {
    try {
      const response = await login(user);
      if (response.data) {
        store.commit("auth/SET_AUTH_USER", response.data.token);
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
      store.commit("auth/SET_AUTH_USER", response.data.token);
    } catch (e) {
      console.log("Token verify check failed. Attempting token refresh...");
      try {
        await refreshToken();
        const response = await getUser();
        store.commit("auth/SET_AUTH_USER", response.data.token);
      } catch (e) {
        console.log("Token refresh attempt failed.");
      }
    }
  },

  // выйти - пока нет.
  logout: async () => {
    await logout();
    store.commit("auth/SET_AUTH_USER", null);
    router.push({ name: "Login" });
  },

  // регистрация - пока нет.
  registration: async (user) => {
    try {
      const response = await registration(user);
      store.commit("auth/SET_AUTH_USER", response.data.token);
    } catch (e) {
      console.log("Registration attempt failed.");
    }
  },
};

export { auth };
