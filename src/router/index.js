import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Layout",
    component: () => import("@/views/Layout/Layout.vue"),
    children: [
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/About/About.vue"),
      },
      {
        path: "/auth",
        name: "Auth",
        component: () => import("@/views/Auth/Auth.vue"),
      },
    ],
  },

  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/404/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
