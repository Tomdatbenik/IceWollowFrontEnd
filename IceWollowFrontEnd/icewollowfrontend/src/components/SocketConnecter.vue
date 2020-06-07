<template>
  <div>
    <!-- SocketConnector -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    messageReceived: function(data) {
      let Message = JSON.parse(data.data);
      this.$store.dispatch("HandleMessage", Message);
    }
  },
  created: function() {
    const serverSocket = new WebSocket(this.$store.getters.serverSocket);

    serverSocket.onmessage = this.messageReceived;
    this.$store.dispatch("SetServerSocket", serverSocket);
  }
};
</script>
