import store from "../index";

export default {
  state: {
    LastReceivedMessage: null,
    LastSendMessage: null
  },
  getters: {},
  mutations: {
    HANDLE_MESSAGE(state, Message) {
      state.LastReceivedMessage = Message;

      switch (Message.handler) {
        case "ServerUpdateHandler":
          var servers = store.getters.servers;
          var server = JSON.parse(Message.content);

          for (let i = 0; i < servers.length; i++) {
            if (servers[i].id == server.id) {
              servers[i] = server;
            }
          }

          store.dispatch("saveServers", servers);
          store.dispatch("selectServer", server);
          break;
        case "CreatePeerHandlerWithInitiator":
          store.dispatch("CreateInitiatorPeer");
          break;
        case "InitIdHandler":
          store.dispatch("CreateListenerPeer", Message.content);
          break;
      }
    },
    SEND_SUBSCRIBE_TO_SERVER_MESSAGE(state, server_id) {
      const message = {
        server_id: server_id,
        user_id: store.getters.user.data.id,
        handler: "SubscribeServerHandler"
      };

      state.LastSendMessage = message;

      store.dispatch("SendMessageToServerSocket", message);
    },
    SEND_SUBSCRIBE_TO_CHANNEL_MESSAGE(state, channel_id) {
      const message = {
        user_id: store.getters.user.data.id,
        channel_id: channel_id,
        handler: "SubscribeChannelHandler"
      };

      state.LastSendMessage = message;

      store.dispatch("SendMessageToServerSocket", message);
    },
    SEND_UNSUBSCRIBE_TO_CHANNEL_MESSAGE(state, channel_id) {
      const message = {
        user_id: store.getters.user.data.id,
        channel_id: channel_id,
        handler: "UnSubscribeChannelHandler"
      };

      state.LastSendMessage = message;

      store.dispatch("SendMessageToServerSocket", message);
    },
    SEND_INIT_WEB_RTC_ID_TO_CHANNEL(state, id) {
      const message = {
        user_id: store.getters.user.data.id,
        rtc_id: id,
        handler: "rtcIdHandler"
      };

      state.LastSendMessage = message;

      store.dispatch("SendMessageToServerSocket", message);
    }
  },
  actions: {
    HandleMessage({ commit }, Message) {
      commit("HANDLE_MESSAGE", Message);
    },
    SendSubscribeToServerMessage({ commit }, server_id) {
      commit("SEND_SUBSCRIBE_TO_SERVER_MESSAGE", server_id);
    },
    SendSubscribeToChannelMessage({ commit }, channel_id) {
      commit("SEND_SUBSCRIBE_TO_CHANNEL_MESSAGE", channel_id);
    },
    SendUnSubscribeToChannelMessage({ commit }, channel_id) {
      commit("SEND_UNSUBSCRIBE_TO_CHANNEL_MESSAGE", channel_id);
    },
    Send_init_web_rtc_id({ commit }, rtc_id) {
      commit("SEND_INIT_WEB_RTC_ID_TO_CHANNEL", rtc_id);
    }
  }
};
