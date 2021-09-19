<template>
  <div v-if="getRepositiries.length != 0" class="m-full">
    <h1 class="text-3xl mt-16 text-center">USER REPOSITORIES</h1>
    <sortComponent />
    <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        class="w-4/5 repos__list"
        v-for="(repo, index) in getRepositiries"
        :key="index"
      >
        <div class="p-4"></div>
        <span class="text-sm">REPO NAME</span>
        <h2 class="border-b mb-4">{{ repo.name }}</h2>
        <span class="text-sm">NUMBER OF</span>
        <div class="text-sm border-b mb-4">
          watchers: {{ repo.watchers }} forks: {{ repo.forks }} issues:
          {{ repo.open_issues }}
        </div>
        <span class="text-sm">LANGUAGE</span>
        <div class="text-sm border-b mb-4">
          {{ repo.language || "NOT SELECTED" }}
        </div>
        <span class="text-sm">LAST UPDATE</span>
        <div class="text-sm border-b mb-4">
          {{ formattedDate(repo.updated_at) }}
        </div>
        <span class="text-sm">LICENSE</span>
        <div class="text-sm border-b mb-4">
          {{ repo.license ? repo.license.name : "NOT SELECTED" }}
        </div>
      </div>
    </div>
    <div class="mt-16"></div>
  </div>
  <VueTailwindPagination
    class="fixed bottom-0 left-0 right-0"
    :current="currentPage"
    :total="total"
    :per-page="perPage"
    @page-changed="onPageClick($event)"
  />
  <div
    v-if="getRepositiries.length == 0 && !getSpinner"
    class="text-3xl text-red-500 text-center mt-20"
  >
    NO MORE REPOSITORIES FOR THIS USER
  </div>
  <BaseSpinner v-if="getSpinner" />
  <svg
    class="w-6 h-6 fixed top-4 left-4 cursor-pointer"
    @click="back"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
    ></path>
  </svg>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import formatDateMixin from "../../mixins/formatDateMixin";
import sortComponent from "./SortComponent.vue";
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import BaseSpinner from "../base/BaseSpinner.vue";
export default {
  mixins: [formatDateMixin],
  components: { sortComponent, VueTailwindPagination, BaseSpinner },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      total: 100,
    };
  },
  methods: {
    ...mapActions(["fetchRepos"]),
    ...mapMutations(["setSpinner"]),
    formattedDate(updateData) {
      return this.formatDate(updateData);
    },
    onPageClick(event) {
      this.currentPage = event;
      this.fetchRepos({
        username: this.$route.params.username,
        page: this.currentPage,
        per_page: this.perPage,
      });
      window.scrollTo(0, 0);
    },
    back() {
      this.$router.push("/users");
    },
  },

  computed: {
    ...mapGetters(["getRepositiries", "getSpinner"]),
  },
  created() {
    this.currentPage = 1;
    this.setSpinner(true);
    this.fetchRepos({
      username: this.$route.params.username,
      page: this.currentPage,
      per_page: this.perPage,
    });
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mukta:wght@600&display=swap");

* {
  font-family: "Mukta", sans-serif;
  color: #535758;
}

span {
  color: #a9a9a9;
}

.repos__list {
  max-width: 300px;
}
</style>