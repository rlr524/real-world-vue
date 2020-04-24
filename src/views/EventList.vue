<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <!-- only show the previous link if we're not on the first page -->
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Previous Page
      </router-link>
      <span v-if="hasNextPage">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
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
    // setting perPage value here and not in data means it won't be reactive but we don't need it to be reactive and this way our component still has access to it
    this.perPage = 3;
    this.$store.dispatch("fetchEvents", {
      perPage: this.perPage,
      page: this.page
    });
  },
  // we're getting access to our "events" state (an array) in our store index.js file by using the mapState helper (imported from vuex above) and
  // still displaying one card for each event in the array above in our EventCard for loop
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.eventsTotal > this.page * this.perPage;
    },
    ...mapState(["events", "eventsTotal"])
  }
};
</script>

<style lang="scss" scoped></style>
