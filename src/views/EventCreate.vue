<template>
  <div class="event-create">
    <h1>Create Event, {{ user.name }}</h1>
    <p>{{ getEventById(1) }}</p>
    <p>This event was created by {{ user.id }} - {{ user.name }}</p>
    <p>There are {{ catLength }} categories</p>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    catLength() {
      return this.$store.getters.catLength;
    },
    // getEvent() {
    //   return this.$store.getters.getEventById;
    // },
    ...mapGetters(["getEventById"]),
    // use a spread operator here to use multiple state computed values
    ...mapState({
      // userName: (state) => state.user.name,
      // userID: (state) => state.user.id,
      // categories: (state) => state.categories
      // can also use a shortcut syntax and use dot notation above to get the specific fields which is how we're doing it below
      // can also just use the field names from state in an array e.g. ...mapState(["user", "categories"]) and use the same dot notation above
      user: "user",
      categories: "categories"
    })
  }
};
</script>

<style></style>
