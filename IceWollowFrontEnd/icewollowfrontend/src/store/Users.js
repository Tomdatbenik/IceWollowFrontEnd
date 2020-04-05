//import axios from "axios";
//import * as firebase from "firebase";

export default {
  state: {
    friends: []
  },
  getters: {
    users(state) {
      return state.friends;
    }
  },
  mutations: {
    ADD_FRIEND(state, value) {
      state.friends.push(value);
    }
  },
  actions: {
    fetchFriends({ commit }) {
      commit("ADD_FRIEND", {
        id: 0,
        displayName: "Tomdatbenik",
        email: "tomvankaathoven@gmail.com"
      });
      commit("ADD_FRIEND", {
        id: 0,
        displayName: "Tomdatbenikniet",
        email: "tomdatbeniksteam@gmail.com"
      });
    }
  }
};
