import Vue from "vue";
import Vuex from "vuex";

import common from "./modules/Common";
import auth from "./modules/Auth";
import navigation from "./modules/Navigation";
import home from "./modules/Home";
import journals from "./modules/Journals";
import organizations from "./modules/Organizations";
import users from "./modules/Users";
import notifications from "./modules/Notifications";
import debugging from "./modules/Debugging";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    auth,
    navigation,
    home,
    journals,
    organizations,
    users,
    notifications,
    debugging,
  },
});
