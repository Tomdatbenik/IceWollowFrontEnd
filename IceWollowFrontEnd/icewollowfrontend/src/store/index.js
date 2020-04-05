import Vue from "vue";
import Vuex from "vuex";
import MediaDevices from "./MediaDevices";
import Connections from "./Connection";
import Auth from "./Auth";
import Servers from "./Server";
import Users from "./Users";
import Toggles from "./ModalToggle";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { MediaDevices, Connections, Auth, Servers, Users, Toggles }
});
