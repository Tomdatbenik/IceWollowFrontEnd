import Vue from "vue";
import Vuex from "vuex";
import MediaDevices from "./MediaDevices";
import Connections from "./Connection";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { MediaDevices, Connections }
});
