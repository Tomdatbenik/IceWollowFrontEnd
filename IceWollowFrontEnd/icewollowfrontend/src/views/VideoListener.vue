<template>
  <div class="home">
    <video id="video"></video>
    <video id="videoFeed"></video>
    <label>Your ID:</label><br />
    <textarea id="yourId"></textarea><br />
    <label>Other ID:</label><br />
    <textarea id="otherId"></textarea>
    <button id="connect" v-on:click="connect">connect</button><br />

    <label>Enter Message:</label><br />
    <textarea id="yourMessage"></textarea>
    <button id="send" v-on:click="send">send</button>
    <pre id="messages"></pre>
  </div>
</template>

<script>
import Peer from "simple-peer";
export default {
  name: "Init",
  components: {},
  data: function() {
    return {
      getUserMedia:
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia,
      peer: null
    };
  },
  computed: {
    camera() {
      if (this.$store.getters.camera) {
        return true;
      }
      return false;
    },
    microphone() {
      if (this.$store.getters.microphone) {
        return true;
      }
      return false;
    }
  },
  methods: {
    connect: function() {
      console.log("Connect");
      const otherId = JSON.parse(document.getElementById("otherId").value);
      this.peer.signal(otherId);
    },
    send: function() {
      console.log("Sending messge");
      const yourMessage = document.getElementById("yourMessage").value;
      this.peer.send(yourMessage);
    }
  },
  mounted: function() {
    this.$store.dispatch("loadData").then(() => {
      console.log("Camera " + this.camera);
    });

    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia.call(
      navigator,
      {
        video: true,
        audio: true
      },
      stream => {
        // this.$store.dispatch("CreatePeerWithStream", {
        //   name: "privateCall",
        //   stream: stream
        // });
        // const connection = this.$store.getters.getConnectionsWithName(
        //   "privateCall"
        // );

        // this.peer = connection.peer;
        this.peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream
        });
        console.log(this.peer);

        this.peer.on("error", err => console.log("error", err));

        this.peer.on("connect", () => {
          console.log(" Peers are connected");
        });

        this.peer.on("signal", function(data) {
          document.getElementById("yourId").value = JSON.stringify(data);
        });

        document.getElementById("send").addEventListener("click", function() {
          console.log("Sending messge");
          const yourMessage = document.getElementById("yourMessage").value;
          this.peer.send(yourMessage);
        });

        this.peer.on("data", function(data) {
          document.getElementById("messages").textContent += data + "\n";
        });

        this.peer.on("stream", function(stream) {
          console.log("strean" + stream);

          const video = document.querySelector("#videoFeed");
          document.body.appendChild(video);

          video.srcObject = stream;
          video.play();
        });
      },
      function(err) {
        console.log(err);
      }
    );
  }
};
</script>
