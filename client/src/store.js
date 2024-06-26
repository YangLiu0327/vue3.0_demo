import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: false,
    user: {},
  },
  types: {
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',
    SET_USER: "SET_USER"
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user || {};
    },
  },
  actions: {
    setAuthenticated({ commit }, isAuthenticated) {
      commit('SET_AUTHENTICATED', isAuthenticated);
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    clearCurrentState({commit}){
        commit('SET_AUTHENTICATED', false);
        commit('SET_USER', {});
    }
  },
});

export default store;