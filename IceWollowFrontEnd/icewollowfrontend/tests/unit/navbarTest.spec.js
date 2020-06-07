import { shallowMount, createLocalVue } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
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

describe("toggleCreateServer sets createservertoggle to true", () => {
  it("is toggled to true", async () => {
    const wrapper = shallowMount(Navbar, {
      mocks: { $store: store }
    });
    expect(store.getters.ServerCreateToggle).toBe(false);
    wrapper.vm.toggleCreateServer();
    expect(store.getters.ServerCreateToggle).toBe(true);
  }),
    it("is selecting a new server", async () => {
      const wrapper = shallowMount(Navbar, {
        mocks: { $store: store, $router: router }
      });
      const server = { name: "test" };
      expect(store.getters.selectedServer).toBe(null);
      wrapper.vm.selectServer(server);
      expect(store.getters.selectedServer).toBe(server);
    });
});
