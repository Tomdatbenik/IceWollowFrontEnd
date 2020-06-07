<template>
  <div class="text-white user" v-if="user.loggedIn" >
    <img
      src="@/assets/logo.png"
      alt="logo"
      class="small-rounded-icon user-icon float-left unselectable"
    />
    <div class="user-name">{{ user.data.displayName }}</div>
    <div class="user-status unselectable">online</div>
    <div class="user-settings unselectable" @click="ToggleSettings">
      <font-awesome-icon icon="cog" />
    </div>
    <div class="user-setting-tab" v-if="setting">
      <div class="container-fluid">
        <div class="row mt-2">
          <div class="col-6">
            <button class="btn btn-dark" @click="signOut">logout</button>
          </div>
          <div class="col-6">
            <button class="btn btn-dark">Edit account</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-setting-tab {
  border-left: 1px groove #a6a6a6;
  width: 300px;
  right: -300px;
  height: 60px;
  position: absolute;
  background-color: #333333;
}

.user-settings {
  cursor: pointer;
  font-size: 30px;
  bottom: 7px;
  right: 10px;
  position: absolute;
  transition: transform 1s;
}

.user-settings:hover {
  transform: rotate(60deg);
}

.user {
  height: 60px;
  width: 300px;
  border-top: groove 1px #a6a6a6;
  color: white;
}

.user-icon {
  left: 10px;
  bottom: 10px;
  position: absolute;
}

.user-name {
  bottom: 20px;
  left: 60px;
  position: absolute;
  font-weight: bold;
}

.user-status {
  font-size: 13px;
  bottom: 7px;
  left: 60px;
  position: absolute;
}
</style>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      setting: false
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    },
    ToggleSettings() {
      this.setting = !this.setting;
    }
  }
};
</script>
