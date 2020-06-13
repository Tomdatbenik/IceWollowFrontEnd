import { shallowMount, createLocalVue } from "@vue/test-utils";
import ServerSettings from "@/components/ServerSettings.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const routes = [
  {
    path: "/server",
    name: "server",
    component: null,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const store = new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    selectedServer: null,
    ServerCreateToggle: false,
    ServerSettingsToggle: false
  },
  getters: {
    user(state) {
      return state.user;
    },
    selectedServer(state) {
      return state.selectedServer;
    },
    ServerCreateToggle(state) {
      return state.ServerCreateToggle;
    },
    ServerSettingsToggle(state) {
      return state.ServerSettingsToggle;
    }
  },
  mutations: {
    SELECT_SERVER(state, server) {
      state.selectedServer = server;
    },
    TOGGLE_CREATE_SERVER(state, value) {
      state.ServerCreateToggle = value;
    },
    TOGGLE_SETTINGS(state, value) {
      state.ServerSettingsToggle = value;
    }
  },
  actions: {
    leaveServer() {},
    createChannel() {},
    toggleServerCreateModal({ commit }, toggle) {
      commit("TOGGLE_CREATE_SERVER", toggle);
    },
    toggleServerSettingsModal({ commit }, toggle) {
      commit("TOGGLE_SETTINGS", toggle);
    },
    selectServer({ commit }, server) {
      commit("SELECT_SERVER", server);
    }
  }
});

describe("ServerSettings.vue", () => {
  it("sets data in the data", () => {
    const wrapper = shallowMount(ServerSettings, {
      mocks: { $store: store, $router: router }
    });
    expect(wrapper.vm.$data.channel).toStrictEqual({
      name: null,
      type: "Text"
    });
    expect(wrapper.vm.$data.addChannel).toBe(false);
  });
  it("calls close action", () => {
    const wrapper = shallowMount(ServerSettings, {
      mocks: { $store: store, $router: router }
    });

    wrapper.vm.close;
    expect(store.getters.ServerSettingsToggle).toBe(false);
  });
  it("Sets channel type to voice", () => {
    const wrapper = shallowMount(ServerSettings, {
      mocks: { $store: store, $router: router }
    });

    wrapper.vm.setChannelType("voice");
    expect(wrapper.vm.$data.channel.type).toBe("voice");
  });
  it("runs leave server action", () => {
    const wrapper = shallowMount(ServerSettings, {
      mocks: { $store: store, $router: router }
    });

    wrapper.vm.leave();
    expect(store.getters.ServerSettingsToggle).toBe(false);
    expect(router.currentRoute.fullPath).toBe("/dashboard");
  });
  it("Togles add channel", () => {
    const wrapper = shallowMount(ServerSettings, {
      mocks: { $store: store, $router: router }
    });

    wrapper.vm.toggleAddChannel();
    expect(wrapper.vm.$data.addChannel).toBe(true);
  });
  it("runs save channel action", () => {
    const wrapper = shallowMount(ServerSettings, {
      mocks: { $store: store, $router: router }
    });

    wrapper.vm.$data.channel = { name: "Test1234" };
    wrapper.vm.saveChannel();
    expect(store.getters.ServerSettingsToggle).toBe(false);
  });
});
