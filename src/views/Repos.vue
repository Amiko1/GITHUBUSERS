<template>
  <div>
    <ReposListComponent />
  </div>
</template>

<script>
import ReposListComponent from "../components/repos/ReposListComponent.vue";
import { mapMutations } from "vuex";
export default {
  components: { ReposListComponent },
  methods: {
    ...mapMutations(["clearRepos"]),
  },
  beforeMount() {
    this.clearRepos();
  },
};
</script>

<style>
</style>