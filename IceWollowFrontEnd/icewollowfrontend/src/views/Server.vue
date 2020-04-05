<template>
  <div class="fancy-background">
    <div class="channel-list float-left">
      <div class="container mb-2">
        <div class="row">
          <div class="col p-0">
            <h3 class="text-light mt-2 p-0 m-0 pb-2 text-left pl-3">
              {{ server.name }}
            </h3>
          </div>
        </div>
      </div>
      <div>
        <h5
          class="text-light font-weight-bold channel-header text-left pl-3 pb-2 pt-2"
        >
          Text-channels
        </h5>

        <div
          v-for="channel in server.channels"
          v-bind:key="channel.id"
          v-on:click="SetFocus($event)"
          ref="channel-list-item"
          class="col-12 text-light channel-list-item p-0"
        >
          <div v-if="channel.type == 'text'">
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
        <h5
          class="text-light font-weight-bold channel-header text-left pl-3 pb-2 pt-2"
        >
          Voice-channels
        </h5>

        <div
          v-for="channel in server.channels"
          v-bind:key="channel.id"
          v-on:click="SetFocus($event)"
          ref="channel-list-item"
          class="col-12 text-light channel-list-item p-0"
        >
          <div v-if="channel.type == 'voice'">
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
      </div>
    </div>
    <div class="chat text-light">
      Server
      {{ server }}
    </div>
  </div>
</template>

<style scoped>
.channel-header {
  border-bottom: groove 1px white;
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
</style>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["server"],
  computed: {
    ...mapGetters({
      user: "user"
    }),
    ...mapGetters({
      servers: "servers"
    }),
    ...mapGetters({
      server: "selectedServer"
    })
  },
  created: function() {
    if (this.$store.getters.selectedServer == null) {
      this.$router.replace({ name: "dashboard" });
    }
  },
  components: {},
  methods: {
    SetFocus(event) {
      this.$refs["channel-list-item"].forEach(element => {
        element.classList.remove("channel-list-item-active");
      });

      event.currentTarget.classList.add("channel-list-item-active");
    }
  }
};
</script>
