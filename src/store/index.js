import Vue from "vue";
import Vuex from "vuex";

import { navigation as navigationConstants } from "@/util/constants";
import { calcViewportShift, findDeviceType } from "@/util/utils";

const { expandedWidth: expandedShift, collapsedWidth: collapsedShift } =
  navigationConstants;

Vue.use(Vuex);

const auth = {
  name: auth,
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

const common = {
  name: common,
  namespaced: true,

  state: () => ({
    DEVICE_TYPE: findDeviceType(),

    NAVIGATION_EXPANDED: navigationConstants.defaultState,

    VIEWPORT_SHIFT: calcViewportShift(),
  }),

  mutations: {
    SET_DEVICE_TYPE: (state, payload) => {
      state.DEVICE_TYPE = payload;
    },

    SET_NAVIGATION_EXPANDED: (state) => {
      state.NAVIGATION_EXPANDED = true;
    },

    SET_NAVIGATION_COLLAPSED: (state) => {
      state.NAVIGATION_EXPANDED = false;
    },

    TOGGLE_NAVIGATION: (state) => {
      state.NAVIGATION_EXPANDED = !state.NAVIGATION_EXPANDED;
    },

    SET_VIEWPORT_SHIFT: (state) => {
      if (state.DEVICE_TYPE === "phone") {
        state.VIEWPORT_SHIFT = 0;
      } else {
        state.VIEWPORT_SHIFT = state.NAVIGATION_EXPANDED
          ? expandedShift
          : collapsedShift;
      }
    },
  },

  actions: {},

  getters: {
    GET_DEVICE_TYPE: (state) => state.DEVICE_TYPE,

    GET_NAVIGATION_EXPANDED: (state) => state.NAVIGATION_EXPANDED,

    GET_VIEWPORT_SHIFT: (state) => state.VIEWPORT_SHIFT,
  },
};

const navigation = {
  name: navigation,
  namespaced: true,

  state: () => ({
    NAVIGATION_PANELS_LIST: [
      {
        name: "Home",
        title: "Главная",
        icon: "HomeIcon",
      },
      {
        name: "Journals",
        title: "Журналы",
        icon: "JournalsIcon",
      },
      {
        name: "Organizations",
        title: "Организации",
        icon: "OrganizationsIcon",
      },
      {
        name: "Users",
        title: "Пользователи",
        icon: "UsersIcon",
      },
      {
        name: "Notifications",
        title: "Оповещения",
        icon: "NotificationsIcon",
      },
      {
        name: "Debugging",
        title: "Отладка",
        icon: "DebuggingIcon",
      },
    ],

    NAVIGATION_ACTIVE_PANEL: undefined,
    NAVIGATION_ACTIVE_JOURNAL: undefined,
  }),

  mutations: {
    SET_NAVIGATION_ACTIVE_PANEL: (state, payload) => {
      state.NAVIGATION_ACTIVE_PANEL = payload;
    },

    SET_NAVIGATION_ACTIVE_JOURNAL: (state, payload) => {
      state.NAVIGATION_ACTIVE_JOURNAL = payload;
    },
  },

  actions: {
    SET_NAVIGATION_ACTIVE_PANEL: ({ commit }, payload) => {
      commit("SET_NAVIGATION_ACTIVE_PANEL", payload);
    },

    SET_NAVIGATION_ACTIVE_JOURNAL: ({ commit }, payload) => {
      commit("SET_NAVIGATION_ACTIVE_JOURNAL", payload);
    },
  },

  getters: {
    GET_NAVIGATION_PANELS_LIST: (state) => state.NAVIGATION_PANELS_LIST,

    GET_NAVIGATION_ACTIVE_PANEL: (state) => state.NAVIGATION_ACTIVE_PANEL,

    GET_NAVIGATION_ACTIVE_JOURNAL: (state) => state.NAVIGATION_ACTIVE_JOURNAL,
  },
};

const home = {
  name: home,
  namespaced: true,

  state: () => ({
    HOME_ITEMS_LIST: [],
  }),

  getters: {
    GET_HOME_ITEMS_LIST: (state) => state.HOME_ITEMS_LIST,
  },
};

const journals = {
  name: journals,
  namespaced: true,

  state: () => ({
    JOURNALS_ITEMS_LIST: [
      {
        name: "BactericidalLog",
        value: "Бактерицидная установка",
        route: "/log-bactericidallog",
      },
    ],
  }),

  getters: {
    GET_JOURNALS_ITEMS_LIST: (state) => state.JOURNALS_ITEMS_LIST,
  },
};

const organizations = {
  name: organizations,
  namespaced: true,

  state: () => ({
    ORGANIZATIONS_ITEMS_LIST: [],
  }),

  getters: {
    GET_ORGANIZATIONS_ITEMS_LIST: (state) => state.ORGANIZATIONS_ITEMS_LIST,
  },
};

const users = {
  name: users,
  namespaced: true,

  state: () => ({
    USERS_ITEMS_LIST: [],
  }),

  getters: {
    GET_USERS_ITEMS_LIST: (state) => state.USERS_ITEMS_LIST,
  },
};

const notifications = {
  name: notifications,
  namespaced: true,

  state: () => ({
    NOTIFICATIONS_ITEMS_LIST: [],
  }),

  getters: {
    GET_NOTIFICATIONS_ITEMS_LIST: (state) => state.NOTIFICATIONS_ITEMS_LIST,
  },
};

const debugging = {
  name: debugging,
  namespaced: true,

  state: () => ({
    DEBUGGING_ITEMS_LIST: [],
  }),

  getters: {
    GET_DEBUGGING_ITEMS_LIST: (state) => state.DEBUGGING_ITEMS_LIST,
  },
};

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

export default new Vuex.Store({
  modules: {
    auth,
    common,
    navigation,
    home,
    journals,
    organizations,
    users,
    notifications,
    debugging,
  },
});
