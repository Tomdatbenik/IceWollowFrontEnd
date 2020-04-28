import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

const configOptions = {
  apiKey: "AIzaSyASD6mf0BElZTFcQ_36XraTFIgW53Cs1WI",
  authDomain: "icewollow-255ff.firebaseapp.com",
  databaseURL: "https://icewollow-255ff.firebaseio.com",
  projectId: "icewollow-255ff",
  storageBucket: "icewollow-255ff.appspot.com",
  messagingSenderId: "555304343714",
  appId: "1:555304343714:web:0ce9be016b8e387f10dffb",
  measurementId: "G-RPDC0D9E0P"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  store.dispatch("fetchServers", user);
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next("login");
  } else {
    next();
  }
});

library.add(faCog, faPlus);

Vue.component("font-awesome-icon", FontAwesomeIcon);
store.dispatch("fetchFriends");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
