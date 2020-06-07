/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";
import MediaDevices from "./CallStores/MediaDevices";
import Connections from "./CallStores/Connection";
import Auth from "./UserStores/Auth";
import Servers from "./ServerStores/Server";
import Users from "./UserStores/Users";
import Toggles from "./FrontEndStores/ModalToggle";
import Sockets from "./SocketStores/Sockets";
import AppLocation from "./AppLocation";
import WebsocketServerStore from "./SocketStores/WebSocketServerStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    MediaDevices,
    Connections,
    Auth,
    Servers,
    Users,
    Toggles,
    Sockets,
    AppLocation,
    WebsocketServerStore
  }
});
