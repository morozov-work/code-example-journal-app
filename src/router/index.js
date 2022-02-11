import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/util/auth";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Resetting from "@/views/Resetting.vue";
import Home from "@/views/Home/Home.vue";
import PageNotFound from "@/views/PageNotFound/PageNotFound.vue";
import BactericidalLog from "@/views/BactericidalLog/BactericidalLog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/resetting/request",
    name: "Resetting",
    component: Resetting,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    name: "404",
    path: "/404",
    component: PageNotFound,
  },
  {
    path: "*",
    redirect: "404",
  },
  {
    name: "Journal",
    path: "/log-bactericidallog",
    component: BactericidalLog,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.checkAuth()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
