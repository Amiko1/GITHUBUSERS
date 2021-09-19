<template>
  <div class="justify-center flex items-start min-h-screen">
    <div class="min-w-1/3 w-4/5 min-h-1/4 md:w-1/2 lg:w-1/3 users">
      <SearchComponent />
      <UserListComponent />
    </div>
  </div>
</template>

<script>
import SearchComponent from "../components/users/SearchComponent.vue";
import UserListComponent from "../components/users/UserListComponent.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    SearchComponent,
    UserListComponent,
  },
  methods: {
    ...mapMutations(["clearUserList"]),
  },

  // beforeMount() {
  //   this.clearUserList();
  // },
};
</script>

<style>
</style>