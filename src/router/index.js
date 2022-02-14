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

import Journal from "@/components/Journal/Journal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/resetting/request",
    name: "resetting",
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
        name: "home",
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: "/home",
        redirect: "/",
      },
      {
        path: "/journals",
        name: "journals",
        component: Journals,
        meta: { requiresAuth: true },
      },
      {
        path: "/journals/:route",
        name: "journal",
        component: Journal,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/organizations",
        name: "organizations",
        component: Organizations,
        meta: { requiresAuth: true },
      },
      {
        path: "/users",
        name: "users",
        component: Users,
        meta: { requiresAuth: true },
      },
      {
        path: "/notifications",
        name: "notifications",
        component: Notifications,
        meta: { requiresAuth: true },
      },
      {
        path: "/debugging",
        name: "debugging",
        component: Debugging,
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
