<template>
  <div class="event-create">
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        class="field"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="error-message">
          Category is required.
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        type="text"
        placeholder="Title"
        class="field"
        aria-placeholder="Title"
        label="Title"
        v-model="event.title"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="error-message">
          Title is required.
        </p>
      </template>
      <BaseInput
        type="text"
        placeholder="Description"
        class="field"
        aria-placeholder="Description"
        label="Description"
        v-model="event.description"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="error-message">
          Description is required.
        </p>
      </template>
      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        placeholder="Add a location"
        class="field"
        aria-placeholder="Add a location"
        label="Location"
        v-model="event.location"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="error-message">
          Location is required.
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <!-- TODO: [VET-1] Validation not working correctly here -->
        <Datepicker
          v-model="event.date"
          placeholder="Select a date"
          aria-placeholder="Select a date"
          class="field"
          :input-class="{ error: $v.event.date.$error }"
          @closed="$v.event.date.$touch()"
        />
        <template v-if="$v.event.date.$error">
          <p v-if="!$v.event.date.required" class="error-message">
            Date is required.
          </p>
        </template>
      </div>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
        class="field"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="error-message">
          Time is required.
        </p>
      </template>
      <BaseButton
        :disabled="$v.$anyError"
        type="submit"
        buttonClass="-fill-gradient"
      >
        Submit
      </BaseButton>
      <p v-if="$v.$anyError" class="error-message">
        Please review the items outlined in red.
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            this.$router.push({
              name: "event-show",
              params: { id: this.event.id }
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id: id,
        user: user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 1.5rem;
}
</style>
