<template>
  <div class="fancy-background" v-if="selectedServer">
    <ServerSettings />
    <div class="channel-list float-left">
      <div class="container mb-2">
        <div class="row">
          <div class="col p-0">
            <h3 class="text-light mt-2 p-0 m-0 pb-2 text-left pl-3">
              {{ selectedServer.name }}
              <div
                class="unselectable float-right mr-2 server-settings-btn"
                @click="ToggleServerSettings"
              >
                <font-awesome-icon icon="cog" />
              </div>
            </h3>
          </div>
        </div>
      </div>
      <div v-if="selectedServer.textChannels && selectedServer.voiceChannels">
        <h5
          class="text-light font-weight-bold channel-header text-left pl-3 pb-2 pt-2"
        >
          Text-channels
        </h5>
        <div
          v-for="channel in selectedServer.textChannels"
          v-bind:key="channel.id"
          v-on:click="SetFocus($event)"
          ref="channel-list-item"
          class="col-12 text-light channel-list-item p-0"
        >
          <h5 class="p-2 pl-4 unselectable text-left">
            {{ channel.name }}
          </h5>
          <div
            v-for="user in channel.users"
            v-bind:key="user.id"
            class="bg-dark w-100"
          >
            <p class="p-2 text-left pl-5">
              {{ user.displayName }}
            </p>
          </div>
        </div>
        <h5
          class="text-light font-weight-bold channel-header text-left pl-3 pb-2 pt-2"
        >
          Voice-channels
        </h5>
        <div v-if="connectedToChannel">
          <button v-on:click="UnSubscribeToChannel()">Leave</button>
        </div>
        <div
          v-for="channel in selectedServer.voiceChannels"
          v-bind:key="channel.id"
          v-on:click="SetFocus($event), SubscribeToChannel(channel)"
          ref="channel-list-item"
          class="col-12 text-light channel-list-item p-0"
        >
          <h5 class="p-2 pl-4 unselectable text-left">
            {{ channel.name }}
          </h5>
          <div
            v-for="user in channel.users"
            v-bind:key="user.id"
            class="bg-dark w-100"
          >
            <p class="p-2 text-left pl-5">
              {{ user.displayName }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        Test
      </div>
    </div>
    <div class="chat text-light">
      <div id="videos"></div>
    </div>
  </div>
</template>

<style>
.channel-header {
  border-bottom: groove 1px white;
}

.user_video {
  float: left;
  margin: 10px;

  /* mirror */
  /* -moz-transform: scale(-1, 1);
  -webkit-transform: scale(-1, 1);
  -o-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1); */
}

.channel-list-item {
  cursor: pointer;
  min-width: 300px;
  width: 300px;
}

.channel-list-item:hover {
  cursor: pointer;
  background-color: #4e4e4e;
}

.channel-list-item-active {
  background-color: #444444;
}

.fancy-background {
  background-color: #242424;
}

.channel-list {
  background-color: #333333;
  width: 300px;
  height: 100vh;
  min-width: 300px;
}

.chat {
  background-color: #4e4e4e;
  width: 100%;
  height: 100vh;
}

.server-settings-btn {
  cursor: pointer;
}
</style>

<script>
import { mapGetters } from "vuex";
import ServerSettings from "../components/ServerSettings";

export default {
  data: function() {
    return {
      connectedToChannel: false,
      subscribedChannel: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    ...mapGetters({
      servers: "servers"
    }),
    ...mapGetters({
      selectedServer: "selectedServer"
    })
  },
  created: function() {
    if (this.$store.getters.selectedServer == null) {
      this.$router.replace({ name: "dashboard" });
    }
  },
  mounted: function() {
    const videos = document.getElementById("videos");

    this.$store.dispatch("setVideoParent", videos);
  },
  methods: {
    ToggleServerSettings() {
      this.$store.dispatch("toggleServerSettingsModal", true);
    },
    SetFocus(event) {
      this.$refs["channel-list-item"].forEach(element => {
        element.classList.remove("channel-list-item-active");
      });

      event.currentTarget.classList.add("channel-list-item-active");
    },
    SubscribeToChannel(channel) {
      this.subscribedChannel = channel;
      this.$store.dispatch("disconnect_connections");
      this.connectedToChannel = true;
      this.$store.dispatch("SendSubscribeToChannelMessage", channel.id);
    },
    UnSubscribeToChannel() {
      this.$store.dispatch("disconnect_connections");
      this.connectedToChannel = false;
      this.$store.dispatch(
        "SendUnSubscribeToChannelMessage",
        this.subscribedChannel.id
      );
    }
  },
  components: {
    ServerSettings
  }
};
</script>
