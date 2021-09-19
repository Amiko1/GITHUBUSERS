import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    userList: [],
    repositories: [],
    error: null,
    spinner: false,
  },
  mutations: {
    saveUserList(state, { data }) {

      state.userList = [];
      if (data) {
        state.userList.push(data);
      }
    },
    clearUserList(state) {
      state.userList = []
    },

    saveRepos(state, repos) {

      state.repositories = repos;
    },
    clearRepos(state) {
      state.repositories = [];
    },

    changeError(state, value) {
      state.error = value;
    },
    setSpinner(state, boolean) {
      state.spinner = boolean;
    },
    sortRepos(state, type) {
      if (type == "forks") {
        state.repositories.sort((a, b) => {
          return a[type] - b[type];
        })
      } else if (type == 'updated_at') {
        state.repositories.sort((a, b) => {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a[type]) - new Date(b[type]);
        });
      } else if (type == 'stargazers_count') {
        state.repositories.sort((a, b) => {
          return a[type] - b[type];
        });
      }
    }
  },
  actions: {
    fetchUser({ commit }, { username, type }) {
      let orgs = 'https://api.github.com/orgs/';
      let any = 'https://api.github.com/users/';
      let user = 'https://api.github.com/users/';

      let url;
      if (type == 'organization') {
        url = orgs;
      } else if (type == 'any') {
        url = any;
      } else if (type == 'User') {
        url = user;
      }
      return new Promise((resolve, reject) => {
        axios.get(url + username)
          .then(response => {
            commit('setSpinner', false);
            if (type == 'User' && response.data.type != 'User') {
              commit('saveUserList', { data: null });
            } else {
              commit('saveUserList', { data: response.data, type: type })
            }
          })
          .catch((err) => {
            commit('changeError', err);
            commit('saveUserList', { data: null });
            reject();
          })
      })
    },

    fetchRepos({ commit }, { username, page, per_page }) {
      axios.get(`https://api.github.com/users/${username}/repos?per_page=${per_page}&page=${page}`)
        .then(response => {
          commit('saveRepos', response.data)
          commit('setSpinner', false)
        })
        .catch((err) => {
          commit('changeError', err);
        })
    }
  },
  getters: {
    getUserList: (state) => {
      return state.userList;
    },
    getRepositiries: (state) => {
      return state.repositories;
    },
    getError: (state) => {
      return state.error;
    },
    getSpinner: (state) => {
      return state.spinner
    }
  }
})
