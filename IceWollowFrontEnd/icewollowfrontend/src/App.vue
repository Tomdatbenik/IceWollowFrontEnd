<template>
  <div id="app" class="bg-dark h-100 w-100 ">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <navbar class="left-nav-bar"></navbar>

    <div class="profile"><profile v-bind:user="user"></profile></div>

    <div class="fill">
      <router-view />
    </div>
  </div>
</template>

<style>
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.form-control {
  background-color: black !important;
  color: white !important;
}

#app {
  height: 100vh !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.left-nav-bar {
  float: left;
  width: 65px;
  min-width: 65px;
  max-width: 65px;
}

.fancy-input-bar {
  border: 0;
  color: white;
  background-color: #4e4e4e;
  border-radius: 4px;
}

.rounded-icon {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0px;
}

.small-rounded-icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.profile {
  float: left;
  bottom: 0px;
  left: 65px;

  position: fixed;
}
</style>

<script>
import navbar from "./components/Navbar";
import profile from "./components/User";
import { mapGetters } from "vuex";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  components: {
    navbar,
    profile
  }
};
</script>
