import axios from "axios";
// import store from "../store";
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
    }
  },
  actions: {
    fetchServers({ commit }, user) {
      commit("CLEAR_LIST");
      if (user != null) {
        console.log(user.email);
        axios({
          method: "get",
          url: "http://localhost:8082" + "/server/getbyuser",
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
      console.log(sserver);
      axios
        .request({
          method: "POST",
          url: "http://localhost:8082" + "/server/add",
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
          url: "http://localhost:8082" + "/server/leave",
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
          url: "http://localhost:8082" + "/channel/add",
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
    }
  }
};
