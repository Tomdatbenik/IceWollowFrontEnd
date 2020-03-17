<template>
  <div class="init">
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

    <button v-on:click="call">Call</button>

    <button v-if="this.microphone" v-on:click="AudioChat">Audio</button>
    <button v-if="this.camera" v-on:click="CameraChat">Video</button>
  </div>
</template>

<script>
export default {
  name: "Init",
  components: {},
  data: function() {
    return {
      getUserMedia:
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia,
      peer: null,
      stream: null,
      otherId: null
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
  created: function() {
    this.$store.dispatch("loadData").then(() => {
      console.log("Camera " + this.camera);
    });

    // const video = document.getElementById("video");

    // // Get access to the camera!
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   // Not adding `{ audio: true }` since we only want video now
    //   navigator.mediaDevices
    //     .getUserMedia({ video: true })
    //     .then(function(stream) {
    //       //video.src = window.URL.createObjectURL(stream);
    //       video.srcObject = stream;
    //       video.play();
    //     });
    // }
  },
  methods: {
    connect: function() {
      console.log("Connect button pressed");
      this.otherId = JSON.parse(document.getElementById("otherId").value);
      this.peer.signal(this.otherId);
    },
    send: function() {
      console.log("Sending messge");
      const yourMessage = document.getElementById("yourMessage").value;
      this.peer.send(yourMessage);
    },
    call: function() {
      if (this.peer === null) {
        this.$store.dispatch("CreateInitiatorPeer", "privateCall");
        const connection = this.$store.getters.getConnectionsWithName(
          "privateCall"
        );
        this.peer = connection.peer;
      }

      this.peer.on("error", err => console.log("error", err));

      this.peer.on("signal", function(data) {
        document.getElementById("yourId").value = JSON.stringify(data);
      });

      this.peer.on("data", function(data) {
        document.getElementById("messages").textContent += data + "\n";
      });

      this.peer.on("connect", () => {
        console.log(" Peers are connected");
      });

      this.peer.on("stream", function(stream) {
        console.log("strean" + stream);

        const video = document.querySelector("#videoFeed");
        document.body.appendChild(video);

        video.srcObject = stream;
        video.play();
      });
    },
    addMedia(stream) {
      const connection = this.$store.getters.getConnectionsWithName(
        "privateCall"
      );
      if (connection != null) {
        console.log(stream);
        this.peer = connection.peer;
        this.peer.addStream(stream);
        this.peer.signal(this.otherId);
      }
    },
    AudioChat: function() {
      //Create peer and connect with other peer by audio
      this.getUserMedia.call(
        navigator,
        {
          video: false,
          audio: true
        },
        this.addMedia,
        function(err) {
          console.log(err);
        }
      );
    },
    CameraChat: function() {
      if (this.camera) {
        this.getUserMedia.call(
          navigator,
          {
            video: true,
            audio: true
          },
          stream => {
            if (this.peer === null) {
              this.$store.dispatch("CreateInitiatorPeer", "privateCall");
              const connection = this.$store.getters.getConnectionsWithName(
                "privateCall"
              );
              this.peer = connection.peer;
              if (this.stream != null) {
                this.peer.removeStream(this.stream);
              }
            }
            this.stream = stream;

            console.log(" Start camera");
            console.log(stream);
            this.peer.addStream(stream);
          },
          function(err) {
            console.log(err);
          }
        );
      }
    }
  }
};
</script>
