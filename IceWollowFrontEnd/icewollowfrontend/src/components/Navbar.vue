<template>
  <nav class="nav-costum" v-if="user.loggedIn">
    <createServer />

    <router-link to="/dashboard" class="h-100 w-100"
      ><img
        src="@/assets/logo.png"
        alt="logo"
        class="rounded-icon mb-1 nav-icon"
    /></router-link>
    <div class="server-list mt-1">
      <div v-for="server in servers" v-bind:key="server.id">
        <div class="mt-2 text-light" @click="selectServer(server)">
          <!-- <img
            v-if="server.src != '' || server.src != null"
            :src="server.src"
            alt="logo"
            class="rounded-icon mb-1 nav-icon"
          /> -->
          <div
            class="rounded-icon mb-1 ml-2 nav-icon bg-dark text-center unselectable"
          >
            <p class="server-short-name">
              {{ server.name[0].toUpperCase()
              }}{{ server.name[1].toUpperCase() }}
            </p>
          </div>
        </div>
      </div>

      <div class="pt-2 mt-2">
        <div
          class="rounded-icon ml-2 pt-2 btn-add-server"
          @click="toggleCreateServer"
        >
          <font-awesome-icon icon="plus" class="mt-2 text-center" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import createServer from "../components/CreateServer";

export default {
  data() {
    return {
      displayServerCreate: false
    };
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    }),
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      servers: "servers"
    })
  },
  components: {
    createServer
  },
  methods: {
    toggleCreateServer() {
      this.$store.dispatch("toggleServerCreateModal", true);
    },
    selectServer(server) {
      this.$store.dispatch("selectServer", server);

      if (this.$router.currentRoute.name != "server") {
        this.$router.replace({ name: "server" });
      }
    }
  }
};
</script>

<style>
.server-short-name {
  padding-top: 13px;
}

.btn-add-server {
  width: 45px; /* or 100px */
  background-color: #333333;
  border: solid 1px #444444;
}

.btn-add-server:hover {
  background-color: #4e4e4e;
}

.nav-costum {
  height: 100vh !important;
  background-color: #242424;
  color: white;
}

.nav-icon {
  transition: border 0.1s, transform 0.5s;
  margin-left: -1px !important;
}

.nav-icon:hover {
  cursor: pointer;
  border: inset 2px white;
  transform: rotate(360deg);
}

.server-list::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 55px;
  height: 1;
  width: 45px; /* or 100px */
  border-top: solid 1px #a6a6a6;
}
</style>
