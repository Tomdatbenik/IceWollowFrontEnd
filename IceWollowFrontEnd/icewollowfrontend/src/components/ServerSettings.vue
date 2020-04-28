<template>
  <div class="iw-modal" v-if="toggle">
    <div class="container">
      <div class="row mt-5">
        <div class="col-8 offset-2">
          <div class="card bg-dark">
            <div class="card-header text-light">
              <h4>{{ selectedServer.name }}</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <button
                    class="btn"
                    v-bind:class="{
                      'btn-primary': !addChannel,
                      'btn-secondary': addChannel
                    }"
                    @click="toggleAddChannel()"
                  >
                    Add channel
                  </button>
                </div>
              </div>
              <div v-if="this.addChannel" class="border border-rounded mt-2">
                <div class="row mt-2">
                  <div class="col">
                    <h5 class="text-light">Channel Type: {{ channel.type }}</h5>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-6">
                    <button
                      class="btn btn-primary float-right"
                      @click="setChannelType('Text')"
                    >
                      Text
                    </button>
                  </div>
                  <div class="col-6">
                    <button
                      class="btn btn-primary float-left"
                      @click="setChannelType('Voice')"
                    >
                      Voice
                    </button>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col">
                    <h5 class="text-light">
                      Channel name:
                    </h5>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col">
                    <input
                      type="text"
                      class="fancy-input-bar p-2"
                      placeholder="Channel name"
                      v-model="channel.name"
                    />
                  </div>
                </div>
                <div class="row mt-2 mb-2">
                  <div class="col">
                    <button class="btn btn-success" @click="saveChannel">
                      Save channel
                    </button>
                  </div>
                </div>
              </div>

              <div class="row mt-2">
                <div class="col-1 offset-8">
                  <button class="btn btn-danger" @click="close">
                    Close
                  </button>
                </div>
                <div class="col-2">
                  <button class="btn btn-danger" @click="leave">
                    Leave
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
      channel: {
        name: null,
        type: "Text"
      },
      addChannel: false
    };
  },
  computed: {
    ...mapGetters({
      selectedServer: "selectedServer"
    }),
    ...mapGetters({
      toggle: "ServerSettingsToggle"
    })
  },
  methods: {
    close() {
      this.$store.dispatch("toggleServerSettingsModal", false);
    },
    leave() {
      this.$store.dispatch("leaveServer", {
        user: this.$store.getters.user,
        server: this.$store.getters.selectedServer
      });
      this.$store.dispatch("toggleServerSettingsModal", false);
      this.$router.replace("dashboard");
    },
    setChannelType(type) {
      this.channel.type = type;
    },
    toggleAddChannel() {
      this.addChannel = !this.addChannel;
    },
    saveChannel() {
      if (this.channel.name.length > 0) {
        this.$store.dispatch("createChannel", {
          channel: this.channel,
          server: this.selectedServer
        });
      }
    }
  }
};
</script>
