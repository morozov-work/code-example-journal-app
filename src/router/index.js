import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Resetting from "@/views/Resetting.vue";
import Home from "@/views/Home/Home.vue";
import PageNotFound from "@/views/PageNotFound/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/admin",
  //   name: "Layout",
  //   component: () => import("@/views/Layout/Layout.vue"),
  //   children: [
  //     {
  //       path: "/about",
  //       name: "About",
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () =>
  //         import(/* webpackChunkName: "about" */ "@/views/About/About.vue"),
  //     },
  //     {
  //       path: "/auth",
  //       name: "Auth",
  //       component: () => import("@/views/Auth/Auth.vue"),
  //     },
  //   ],
  // },
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
];

const router = new VueRouter({
  routes,
});

export default router;
