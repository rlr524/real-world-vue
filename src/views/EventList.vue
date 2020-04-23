<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  /* eslint-disable */
  name: "EventList",
  components: {
    EventCard
  },
  // call the action inside the created() lifecycle hook (the action is fetchEvents and we defined it in our store index.js file)
  created() {
    this.$store.dispatch("fetchEvents");
  },
  // we're getting access to our "events" state (an array) in our store index.js file by using the mapState helper (imported from vuex above) and
  // still displaying one card for each event in the array above in our EventCard for loop
  computed: mapState(["events"])
};
</script>

<style lang="scss" scoped></style>
