import Peer from "simple-peer";

export default {
  state: {
    enumeration: 0,
    connections: []
  },
  mutations: {
    ENUMERATE(state, enumeration) {
      state.enumeration = enumeration;
    }
  },
  actions: {
    CreateInitiatorPeer(context, name) {
      console.log(" Createing init peer ");
      context.commit("ENUMERATE", context.getters.ConnectionEnumeration + 1);

      const peer = new Peer({
        initiator: true,
        trickle: false
      });

      const connection = {
        name: name,
        id: context.getters.ConnectionEnumeration,
        peer: peer
      };

      context.getters.getConnections.push(connection);
    },
    CreatePeer(context, name) {
      context.commit("ENUMERATE", context.getters.ConnectionEnumeration + 1);

      const peer = new Peer({
        initiator: false,
        trickle: false
      });

      const connection = {
        name: name,
        id: context.getters.ConnectionEnumeration,
        peer: peer
      };

      context.getters.getConnections.push(connection);
    },
    CreatePeerWithStream(context, { name, stream }) {
      context.commit("ENUMERATE", context.getters.ConnectionEnumeration + 1);
      console.log(stream);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
      });

      const connection = {
        name: name,
        id: context.getters.ConnectionEnumeration,
        peer: peer
      };

      context.getters.getConnections.push(connection);
    }
  },
  getters: {
    ConnectionEnumeration: state => {
      return state.enumeration;
    },
    getConnectionsWithName: state => name => {
      return state.connections.find(connection => connection.name === name);
    },
    getConnectionsWithId: state => id => {
      return state.connections.find(connection => connection.id === id);
    },
    getConnections: state => {
      return state.connections;
    }
  },
  modules: {}
};
