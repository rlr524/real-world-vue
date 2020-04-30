<template>
  <div>
    <img
      src="@/assets/droids.jpg"
      alt="Obi-Wan...these are not the droids you were looking for."
    />
    <h1>
      There seems to be some interference, they may be jamming our signal.
    </h1>
    <h6>We've felt a great disturbance in the force and have logged it.</h6>
    <router-link :to="{ name: 'event-list' }">
      Back to the home page?
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NetworkIssue"
};
</script>

<style lang="scss" scoped>
h1 {
  line-height: 1.2;
}
</style>
