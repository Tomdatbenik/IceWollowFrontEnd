import axios from "axios";
import store from "../index";

//import * as firebase from "firebase";

export default {
  state: {
    servers: [],
    selectedServer: null,
    lastJoinedServerCode: ""
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
      for (let i = 0; i < state.servers.length; i++) {
        if (state.servers[i].id == server.id) {
          state.servers.splice(i);
        }
      }
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
      commit("CLEAR_LIST");
      if (user != null) {
        console.log(user.email);
        axios({
          method: "get",
          url: store.getters.serverApp + "/server/getbyuser",
          params: {
            email: user.email
          }
        }).then(function(response) {
          console.log(commit);
          console.log(response);

          response.data.forEach(server => {
            console.log(server);
            commit("ADD_SERVER", server);
          });
        });
      }
    },
    selectServer({ commit }, server) {
      commit("SELECT_SERVER", server);
    },
    createServer({ commit }, server) {
      const sserver = JSON.stringify(server);

      axios
        .request({
          method: "POST",
          url: store.getters.serverApp + "/server/add",
          // headers: {
          //     authorization: `Bearer ${this.getters.Token}`,
          //     "Content-Type": "application/json"
          // },
          params: {
            server: sserver
          }
        })
        .then(res => {
          if (res.data != null) {
            commit("ADD_SERVER", res.data);
          }
        });
    },
    leaveServer({ commit }, { user, server }) {
      console.log(server);
      axios
        .request({
          method: "POST",
          url: store.getters.serverApp + "/server/leave",
          // headers: {
          //     authorization: `Bearer ${this.getters.Token}`,
          //     "Content-Type": "application/json"
          // },
          params: {
            email: user.data.email,
            serverid: server.id
          }
        })
        .then(res => {
          if (res.data == true) {
            commit("REMOVE_SERVER", server);
          }
        });
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
