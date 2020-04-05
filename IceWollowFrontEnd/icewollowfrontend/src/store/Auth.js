import axios from "axios";
//import * as firebase from "firebase";

export default {
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });

        //Get token from firebase
        // firebase
        //   .auth()
        //   .currentUser.getIdToken(/* forceRefresh */ true)
        //   .then(function(idToken) {
        //     // Send token to your backend via HTTPS
        //     // ...
        //     console.log(idToken);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //     // Handle error
        //   });

        //Check if user exists

        //localhost:8081/user/getUserByEmail/?email=tomtrolt@gmail.com
        axios({
          method: "get",
          url: "http://localhost:8081/user/getUserByEmail",
          params: {
            email: user.email
          }
        }).then(function(response) {
          if (response.data == null) {
            axios
              .post("http://localhost:8081/user/add", {
                email: user.email,
                displayName: user.displayName
              })
              .then(function(response) {
                console.log(response);
              });
          } else {
            commit("SET_USER", {
              id: response.data.id,
              displayName: response.data.displayName,
              email: response.data.email
            });
          }
        });

        //Register user

        ///Axios login on the server
      } else {
        commit("SET_USER", null);
      }
    }
  }
};
