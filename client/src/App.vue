<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import {jwtDecode} from 'jwt-decode';

export default {
  name: 'App',
  components: {},
  created() {
    if(localStorage.eleToken) {
      const decoded = jwtDecode(localStorage.eleToken);
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  },
  methods: {
      isEmpty(value) {
        return (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) || 
            (typeof value === 'string' && value.trim().length === 0)
         )
      }
    }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
