import axios from "axios";
import store from "../index";

//import * as firebase from "firebase";

export default {
  state: {
    servers: [],
    selectedServer: null,
    lastJoinedServerCode: "",
    lastLeftServer: null
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
    SELECT_SERVER(state, server) {
      state.selectedServer = server;
    },
    CLEAR_LIST(state) {
      state.servers = [];
    },
    REMOVE_SERVER(state, server) {
      axios
        .request({
          method: "PUT",
          url: store.getters.serverApp + "/server/leave",
          // headers: {
          //     authorization: `Bearer ${this.getters.Token}`,
          //     "Content-Type": "application/json"
          // },
          data: {
            user: store.getters.user.data,
            server_id: server.id
          }
        })
        .then(() => {
          state.lastLeftServer = server;
          store.dispatch("fetchServers", store.getters.user.data);
        });
    },
    SAVE_SERVERS(state, servers) {
      state.servers = servers;
    },
    JOIN_SERVER(state, code) {
      state.lastJoinedServerCode = code;

      console.log(store.getters.user.data);

      const user = {
        id: store.getters.user.data.id,
        displayName: store.getters.user.data.displayName,
        email: store.getters.user.data.email
      };

      const joinServer = {
        user: user,
        code: code
      };

      const jsonJoinServer = JSON.stringify(joinServer);

      axios
        .put(store.getters.serverApp + "/server/join", jsonJoinServer, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(() => {
          store.dispatch("fetchServers", user);
          console.log("Succesfully join server");
        })
        .catch(error => {
          switch (error.response.status) {
            case 422:
              console.log("User already joined the server");
              break;
            case 404:
              console.log("User or server doesn't exist");
              break;
          }
        });
    }
  },
  actions: {
    fetchServers({ commit }, user) {
      console.log("Fetching servers");

      commit("CLEAR_LIST");
      if (user != null) {
        axios({
          method: "get",
          url: store.getters.serverApp + "/server/getbyuser",
          params: {
            email: user.email
          }
        }).then(function(response) {
          response.data.forEach(server => {
            commit("ADD_SERVER", server);
          });
        });
      }
    },
    selectServer({ commit }, server) {
      commit("SELECT_SERVER", server);
    },
    createServer({ commit }, server) {
      axios
        .request({
          method: "POST",
          url: store.getters.serverApp + "/server/add",
          data: {
            name: server.name,
            owner: store.getters.user.data
          }
        })
        .then(res => {
          if (res.data != null) {
            commit("ADD_SERVER", res.data);
          }
        })
        .catch(error => {
          switch (error.response.status) {
            case 400:
              console.log("Name is to short or user doesn't exist");
              break;
          }
        });
    },
    leaveServer({ commit }, { server }) {
      commit("REMOVE_SERVER", server);
    },
    createChannel({ commit }, { channel, server }) {
      channel.type = channel.type.toUpperCase();
      axios
        .request({
          method: "POST",
          url: store.getters.serverApp + "/channel/add",
          // headers: {
          //     authorization: `Bearer ${this.getters.Token}`,
          //     "Content-Type": "application/json"
          // },
          params: {
            server_id: server.id,
            channel: channel
          }
        })
        .then(res => {
          if (res.data == true) {
            console.log(commit);
          }
        });
    },
    saveServers({ commit }, servers) {
      commit("SAVE_SERVERS", servers);
    },
    joinServer({ commit }, code) {
      commit("JOIN_SERVER", code);
    }
  }
};
