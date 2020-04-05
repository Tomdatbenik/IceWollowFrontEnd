<template>
  <div class="fancy-background">
    <div class="user-list float-left">
      <div class="container mb-2">
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="fancy-input-bar w-100 mt-2 p-2"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="friend in friends"
          v-bind:key="friend.email"
          v-on:click="SetFocus($event)"
          ref="user-list-item"
        >
          <profile v-bind:user="friend" class="user-list-item"></profile>
        </div>
      </div>
    </div>
    <div class="chat text-light">
      test
    </div>
  </div>
</template>

<style scoped>
.user-list-item {
  cursor: pointer;
}

.user-list-item:hover {
  background-color: #4e4e4e;
}

.user-list-item-active {
  background-color: #444444;
}

.fancy-background {
  background-color: #242424;
}

.user-list {
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
import profile from "../components/Profile";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    }),
    ...mapGetters({
      friends: "users"
    })
  },
  components: {
    profile
  },
  methods: {
    SetFocus(event) {
      this.$refs["user-list-item"].forEach(element => {
        element.classList.remove("user-list-item-active");
      });

      event.currentTarget.classList.add("user-list-item-active");
    }
  }
};
</script>
