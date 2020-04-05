//import axios from "axios";
//import * as firebase from "firebase";

export default {
  state: {
    ServerCreateToggle: false
  },
  getters: {
    ServerCreateToggle(state) {
      return state.ServerCreateToggle;
    }
  },
  mutations: {
    TOGGLE_CREATE_SERVER(state, value) {
      state.ServerCreateToggle = value;
    }
  },
  actions: {
    toggleServerCreateModal({ commit }, toggle) {
      commit("TOGGLE_CREATE_SERVER", toggle);
    }
  }
};
