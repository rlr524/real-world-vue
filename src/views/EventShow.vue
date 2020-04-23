<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>
        Organized by {{ event.organizer ? event.organizer.name : "None" }}
      </h5>
      <h5>Category: {{ event.category ? event.category : "None" }}</h5>
    </div>
    <BaseIcon name="map"><h3>Location</h3></BaseIcon>
    <address>{{ event.location ? event.location : "None" }}</address>
    <h3 class="-text-lightgray">Event Details</h3>
    <p>{{ event.description ? event.description : "None" }}</p>
    <h3 class="-text-lightgray">
      Attendees
      <span class="badge -fill-gradient">
        {{ event.attendees ? event.attendees.length : 0 }}
      </span>
    </h3>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ event.attendees ? attendee.name : " " }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  props: ["id"],
  data() {
    return {
      event: {}
    };
  },
  created() {
    EventService.getEvent(this.id)
      // eslint-disable-next-line
      .then((res) => {
        this.event = res.data;
      })
      // eslint-disable-next-line
      .catch((error) => {
        console.log("There was an error:" + error);
      });
  }
};
</script>

<style lang="scss" scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
