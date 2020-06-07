export default {
  state: {
    serverApp: "http://localhost:8081",
    serverSocket: "ws://localhost:8082/ws/server",
    userApp: "http://localhost:8081"
  },
  getters: {
    serverApp(state) {
      return state.serverApp;
    },
    serverSocket(state) {
      return state.serverSocket;
    },
    userApp(state) {
      return state.userApp;
    }
  },
  mutations: {},
  actions: {}
};
