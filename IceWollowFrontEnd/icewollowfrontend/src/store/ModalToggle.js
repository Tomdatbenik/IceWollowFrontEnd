//import axios from "axios";
//import * as firebase from "firebase";

export default {
  state: {
    ServerCreateToggle: false,
    ServerSettingsToggle: false
  },
  getters: {
    ServerCreateToggle(state) {
      return state.ServerCreateToggle;
    },
    ServerSettingsToggle(state) {
      return state.ServerSettingsToggle;
    }
  },
  mutations: {
    TOGGLE_CREATE_SERVER(state, value) {
      state.ServerCreateToggle = value;
    },
    TOGGLE_SETTINGS(state, value) {
      state.ServerSettingsToggle = value;
    }
  },
  actions: {
    toggleServerCreateModal({ commit }, toggle) {
      commit("TOGGLE_CREATE_SERVER", toggle);
    },
    toggleServerSettingsModal({ commit }, toggle) {
      commit("TOGGLE_SETTINGS", toggle);
    }
  }
};
