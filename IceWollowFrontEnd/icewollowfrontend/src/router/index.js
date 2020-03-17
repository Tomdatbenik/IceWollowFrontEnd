import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Init from "../views/VideoInit";
import Listen from "../views/VideoListener.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/init",
    name: "Listen",
    component: Init
  },
  {
    path: "/listen",
    name: "Init",
    component: Listen
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
