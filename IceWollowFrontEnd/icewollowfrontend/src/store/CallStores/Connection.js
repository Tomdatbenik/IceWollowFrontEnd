import Peer from "simple-peer";

export default {
  state: {
    enumeration: 0,
    connections: [],
    initPeerConnection: null,
    parent: null
  },
  mutations: {
    ENUMERATE(state, enumeration) {
      state.enumeration = enumeration;
    },
    SET_VIDEOS_PARENT(state, parent) {
      state.parent = parent;
    },
    SET_INIT_PEER_CONNECTION(state, connection) {
      state.initPeerConnection = connection;
    }
  },
  actions: {
    disconnect_connections(context) {
      context.getters.videosParent
        .querySelectorAll("*")
        .forEach(n => n.remove());

      context.getters.getConnections.forEach(connection => {
        console.log(connection);

        connection.peer.destroy();
      });

      if (context.getters.initPeerConnection != null) {
        context.getters.initPeerConnection.peer.destroy();
        context.commit("SET_INIT_PEER_CONNECTION", null);
      }
    },
    setVideoParent(context, parent) {
      context.commit("SET_VIDEOS_PARENT", parent);
    },
    CreateInitiatorPeer(context) {
      // get video/voice stream
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: { width: { max: 620 }, height: { max: 360 } }
        })
        .then(media => {
          const peer = new Peer({
            initiator: true,
            stream: media,
            trickle: false
          });
          const connection = {
            id: context.getters.ConnectionEnumeration,
            peer: peer
          };

          peer.on("error", err => peerOnError(err));
          peer.on("connect", () => {
            console.log("CONNECTED");
          });

          peer.on("signal", data => {
            console.log("init Peer got signal");
            peerInitOnSignal(data);
          });

          peer.on("stream", stream =>
            peerOnStream(stream, context.getters.videosParent)
          );

          peer.on("close", () => {
            removeAllChildren(context.getters.videosParent);
          });

          context.commit("SET_INIT_PEER_CONNECTION", connection);

          context.commit(
            "ENUMERATE",
            context.getters.ConnectionEnumeration + 1
          );
        })
        .catch(() => {});
    },
    CreateListenerPeer(context, rtc_id) {
      if (context.getters.initPeerConnection == null) {
        context.commit("ENUMERATE", context.getters.ConnectionEnumeration + 1);
        navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: { width: { max: 620 }, height: { max: 360 } }
          })
          .then(media => {
            const peer = new Peer({
              stream: media,
              initiator: false,
              trickle: false
            });

            const connection = {
              id: context.getters.ConnectionEnumeration,
              peer: peer
            };

            rtc_id = JSON.parse(rtc_id);

            peer.signal(rtc_id);

            peer.on("signal", data => {
              console.log("Listener peer got signal");
              peerInitOnSignal(data);
            });

            peer.on("stream", data =>
              peerOnStream(data, context.getters.videosParent)
            );

            peer.on("close", () => {
              removeAllChildren(context.getters.videosParent);
            });

            peer.on("connect", () => {
              console.log("CONNECTED");
            });

            context.getters.getConnections.push(connection);
          })
          .catch(() => {});
      } else {
        context.getters.initPeerConnection.peer.signal(rtc_id);
      }
    }
  },
  getters: {
    ConnectionEnumeration: state => {
      return state.enumeration;
    },
    getConnectionsWithId: state => id => {
      return state.connections.find(connection => connection.id === id);
    },
    getConnections: state => {
      return state.connections;
    },
    videosParent: state => {
      return state.parent;
    },
    initPeerConnection: state => {
      return state.initPeerConnection;
    }
  },
  modules: {}
};

import store from "../index";

function peerOnError(error) {
  console.log(error);
}

function peerOnStream(stream, videosParent) {
  const video = document.createElement("video");
  videosParent.appendChild(video);

  video.srcObject = stream;
  video.classList.add("user_video");
  video.play();
}

function peerInitOnSignal(data) {
  console.log("sending web rtc data");

  store.dispatch("Send_init_web_rtc_id", data);
}

function removeAllChildren(node) {
  node.querySelectorAll("*").forEach(n => n.remove());
}
