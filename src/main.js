import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { registerGlobalComponents } from "./global";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import { auth } from "@/util/auth";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

Vue.prototype.$auth = auth;

registerGlobalComponents();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
