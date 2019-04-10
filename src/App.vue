<template>
  <div id="app">
    <h1 v-on:click="goHome()" id="title">Our Blog</h1>
    <nav></nav>
    <router-view />
  </div>
</template>

<script>
import router from './router';

export default {
  methods: {
    goHome() {
      router.push({
        name: 'Posts',
      });
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

#title {
  cursor: pointer;
  margin-bottom: 24px;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}
</style>
