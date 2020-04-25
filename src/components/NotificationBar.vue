<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NotificationBar",
  data: function() {
    return {
      timeout: null
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  // add this to future-proof; for example, if we add an ability to x out the notification before the 5000 ms are up, it could create a memory-leak
  // so we add this clearTimeout method to clear the timeout even if it hasn't reached 5000
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  // (module name, [array of actions, in this case only one])
  methods: mapActions("notification", ["remove"])
};
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
