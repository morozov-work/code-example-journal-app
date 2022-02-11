import Vue from "vue";
import VueRouter from "vue-router";

import { auth } from "@/util/auth";

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Resetting from "@/views/Resetting.vue";
import PageNotFound from "@/views/PageNotFound/PageNotFound.vue";

import MainLayout from "@/layouts/MainLayout/MainLayout.vue";
import Home from "@/views/Home/Home.vue";
import Journals from "@/views/Journals/Journals.vue";
import Organizations from "@/views/Organizations/Organizations.vue";
import Users from "@/views/Users/Users.vue";
import Notifications from "@/views/Notifications/Notifications.vue";
import Debugging from "@/views/Debugging/Debugging.vue";

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
    path: "/404",
    name: "404",
    component: PageNotFound,
  },
  {
    path: "*",
    redirect: "404",
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: "/home",
        redirect: "/",
      },
      {
        path: "/journals",
        name: "Journals",
        component: Journals,
        meta: { requiresAuth: true },
      },
      {
        path: "/organizations",
        name: "Organizations",
        component: Organizations,
        meta: { requiresAuth: true },
      },
      {
        path: "/users",
        name: "Users",
        component: Users,
        meta: { requiresAuth: true },
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
        meta: { requiresAuth: true },
      },
      {
        path: "/debugging",
        name: "Debugging",
        component: Debugging,
        meta: { requiresAuth: true },
      },
      {
        name: "Journal",
        path: "/log-bactericidallog",
        component: BactericidalLog,
        meta: { requiresAuth: true },
      },
    ],
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
