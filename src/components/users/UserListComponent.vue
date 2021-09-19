
<template>
  <div class="w-full h-full flex justify-center">
    <div
      class="users__list"
      v-for="(user, index) in getUserList"
      :key="index"
      @click="repos(user.login)"
    >
      <img
        class="w-1/4 md:w-1/6 rounded-l p-1 md:mb-0"
        :src="user.avatar_url"
        alt=""
      />

      <div class="user-list__image rounded-r w-full p-2 md:p-0">
        <h2 class="text-sm ml-6 mt-2 text-white uppercase">
          name: {{ user.name || "NOT SELECTED" }}
        </h2>
        <h2 class="text-sm ml-6 text-white uppercase">TYPE: {{ user.type }}</h2>
      </div>
    </div>
    <BaseSpinner v-if="getSpinner" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseSpinner from "../base/BaseSpinner.vue";
export default {
  components: {
    BaseSpinner,
  },
  computed: {
    ...mapGetters(["getUserList", "getError", "getSpinner"]),
  },
  methods: {
    repos(username) {
      this.$router.push({ name: "repos", params: { username: username } });
    },
  },
};
</script>

<style scoped>
.users__list {
  width: 77%;
}

.user-list__image {
  background-image: url("https://camo.githubusercontent.com/8bb37a4e6370c9360e9d28c0ee2a741737f9ade649380473446dea380b65ee01/687474703a2f2f692e696d6775722e636f6d2f545269454863332e706e67");
}

@media (min-width: 1300px) {
  .users__list:hover {
    transition: 0.4s ease-in-out;
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .users__list {
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRkbHJD4CWkW4_kFDYDRIuP7TJ3774e6zmnQ&usqp=CAU");
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>