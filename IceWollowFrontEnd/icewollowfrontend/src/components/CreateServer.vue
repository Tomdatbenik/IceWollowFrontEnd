<template>
  <div class="iw-modal" v-if="toggle">
    <div class="container">
      <div class="row mt-5">
        <div class="col-8 offset-2">
          <div class="card bg-dark">
            <div class="card-header">
              <h4>Create server</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <p>
                    Create a server to chat,call and share lots of content with
                    friends :D
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <input
                    type="text"
                    class="fancy-input-bar p-2 mt-5 float-right"
                    placeholder="Server name"
                    v-model="serverName"
                  />
                </div>
                <div class="col-2 offset-2">
                  <div
                    class="rounded-icon server-icon-preview"
                    v-if="this.serverName.length > 1"
                  >
                    <p class="pt-5">
                      {{ this.serverName[0].toUpperCase()
                      }}{{ this.serverName[1].toUpperCase() }}
                    </p>
                  </div>
                  <p v-else>
                    <img
                      src="@/assets/logo.png"
                      alt="logo"
                      class="rounded-icon server-icon-preview"
                    />
                  </p>
                </div>
              </div>

              <div class="row mt-2">
                <div class="col-1 offset-8">
                  <button class="btn btn-danger" @click="close">
                    Close
                  </button>
                </div>
                <div class="col-2">
                  <button class="btn btn-success" @click="addServer">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.server-icon-preview {
  width: 125px !important;
  height: 125px !important;
  background-color: #4e4e4e !important;
  font-size: 20px;
}

.iw-modal {
  position: fixed;
  z-index: 999999;

  background-color: rgb(0, 0, 0, 0.5);

  height: 100vh;
  width: 100vw;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      serverName: ""
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      toggle: "ServerCreateToggle"
    })
  },
  methods: {
    close() {
      this.$store.dispatch("toggleServerCreateModal", false);
    },
    addServer() {
      this.$store.dispatch("createServer", this.serverName);
      this.serverName = "";
      this.close();
    }
  }
};
</script>
