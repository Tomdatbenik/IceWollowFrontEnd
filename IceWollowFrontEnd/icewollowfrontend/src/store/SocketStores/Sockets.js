export default {
  state: {
    ServerSocket: null
  },
  getters: {},
  mutations: {
    SAVE_SERVER_SOCKET(state, value) {
      state.ServerSocket = value;
    },
    SEND_MESSAGE_TO_SERVER(state, message) {
      state.ServerSocket.send(JSON.stringify(message));
    }
  },
  actions: {
    SetServerSocket({ commit }, ServerSocket) {
      commit("SAVE_SERVER_SOCKET", ServerSocket);
    },
    SendMessageToServerSocket({ commit }, message) {
      commit("SEND_MESSAGE_TO_SERVER", message);
    }
  }
};
