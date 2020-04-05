//import axios from "axios";
//import * as firebase from "firebase";

export default {
  state: {
    servers: [],
    selectedServer: null
  },
  getters: {
    servers(state) {
      return state.servers;
    },
    selectedServer(state) {
      return state.selectedServer;
    }
  },
  mutations: {
    ADD_SERVER(state, value) {
      state.servers.push(value);
    },
    SELLECT_SERVER(state, server) {
      state.selectedServer = server;
    }
  },
  actions: {
    fetchServers({ commit }) {
      commit("ADD_SERVER", {
        id: 0,
        name: "Ice Wollow",
        src: "",
        channels: [
          { id: 1, name: "general", type: "text", users: [] },
          {
            id: 2,
            name: "general",
            type: "voice",
            users: [
              {
                id: 0,
                displayName: "Tomdatbenik",
                email: "tomvankaathoven@gmail.com"
              }
            ]
          }
        ]
        //require("../assets/logo.png")
      });
    },
    selectServer({ commit }, server) {
      commit("SELLECT_SERVER", server);
    },

    createServer({ commit }, serverName) {
      commit("ADD_SERVER", {
        id: 0,
        name: serverName,
        src: "",
        channels: [
          { id: 1, name: "general", type: "text", users: [] },
          {
            id: 2,
            name: "general",
            type: "voice",
            users: []
          }
        ]
        //require("../assets/logo.png")
      });
    }
  }
};
