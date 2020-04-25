<template>
  <div id="app">
    <NavBar />
    <NotificationContainer />
    <!-- add the key to reload components when the URL changes, including any query paramters, so pagination works -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";

export default {
  components: {
    NavBar,
    NotificationContainer
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
