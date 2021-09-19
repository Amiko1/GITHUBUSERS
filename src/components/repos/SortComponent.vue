<template>
  <div class="w-11/12 md:w-4/5 m-auto sort">
    <p class="text-xs md:text-sm inline ml-4">SORT BY</p>
    <select class="w-1/4 sort__select" name="Type" id="type" v-model="type">
      <option value="" disabled selected>Select</option>
      <option value="stargazers_count">stars</option>
      <option value="forks">forks</option>
      <option value="updated_at">update</option>
    </select>
    <button class="sort__button" @click="sortRepository">SORT</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      type: "",
    };
  },
  methods: {
    ...mapMutations(["sortRepos"]),
    sortRepository() {
      this.sortRepos(this.type);
    },
  },
};
</script>

<style>
.sort {
  min-width: 320px;
}
</style>