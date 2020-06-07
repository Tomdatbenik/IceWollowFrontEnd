import { shallowMount, createLocalVue } from "@vue/test-utils";
import ServerAddOptions from "@/components/ServerAddOptions.vue";
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

describe("ServerAddOptions.vue", () => {
  it("sets data in the data", () => {
    const wrapper = shallowMount(ServerAddOptions, {
      mocks: { $store: store, $router: router }
    });
    expect(wrapper.vm.$data.serverName).toBe("");
    expect(wrapper.vm.$data.serverCode).toBe("");

    wrapper.vm.$data.serverName = "Test";
    expect(wrapper.vm.$data.serverName).toBe("Test");
  });
});
