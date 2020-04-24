<template>
  <div id="app">
    <NavBar />
    <!-- add the key to reload components when the URL changes, including any query paramters, so pagination works -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
