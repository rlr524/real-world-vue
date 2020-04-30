<template>
  <div>
    <!-- in the literal in this h1, the first "user" is the module and the second is the state inside the module -->
    <h1>Events Listing for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
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
import store from "@/store/index.js";

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1;
  store
    .dispatch("event/fetchEvents", {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage;
      next();
    });
}

export default {
  name: "EventList",
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  // we're getting access to our "events" state (an array) in our store index.js file by using the mapState helper (imported from vuex above) and
  // still displaying one card for each event in the array above in our EventCard for loop
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(["event", "user"])
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
}
</style>
