import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false,
    user: {},
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setAuthenticated({ commit }, isAuthenticated) {
      commit('SET_AUTHENTICATED', isAuthenticated);
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
  },
});

export default store;