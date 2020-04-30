<template>
  <div>
    <img
      src="@/assets/droids.jpg"
      alt="These are not the events you were looking for."
    />
    <h1>These are not the {{ resource }}s you are looking for.</h1>
    <h6>We've felt a great disturbance in the force and have logged it.</h6>
    <router-link :to="{ name: 'event-list' }">
      Back to the home page?
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  line-height: 1.2;
}
</style>
