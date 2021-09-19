<template>
  <h1
    class="align-center text-lg mb-10 md:text-2xl 2xl:text-5xl uppercase mt-10"
  >
    Search Github User
  </h1>
  <form class="w-full" autocomplete="off">
    <label for="Search__user"></label>
    <i class="fad fa-laugh-wink"></i>

    <div class="w-full flex justify-center">
      <input
        v-model="username"
        class="border p-2 w-1/2 mr-4 rounded mb-5"
        placeholder="username"
        id="Search__user"
        type="text"
      />

      <select
        class="border p-2 w-1/4 rounded cursor-pointer mb-5 text-xs md:text-sm"
        name="Type"
        id="type"
        v-model="type"
      >
        <option value="any">Any</option>
        <option value="User">User</option>
        <option value="organization">Organization</option>
      </select>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      type: "any",
      debounce: null,
    };
  },
  methods: {
    ...mapActions(["fetchUser"]),
    ...mapMutations(["filterUsers", "setSpinner", "clearUserList"]),
    erorrHandler() {
      if (this.getError && this.username != "") {
        this.$toast.error("sorry cant find user/organization");
      }
    },
    fetchData(value) {
      this.setSpinner(true);
      this.clearUserList();
      if (this.username != "") {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          this.fetchUser({ username: value, type: this.type }).catch(() => {
            this.erorrHandler();
          });
        }, 1000);
      }
    },
  },
  computed: {
    ...mapGetters(["getError"]),
  },

  watch: {
    username: function (value) {
      this.fetchData(value);
    },
    type: function () {
      this.fetchData(this.username);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #271842;
  font-family: "Raleway", sans-serif;
}
button {
  transition: 0.3s ease-in;
}
button:hover {
  opacity: 0.6;
}
</style>