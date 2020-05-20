<template>
  <form @submit.prevent="submit">
    <p v-if="$v.$anyError" class="error-message">
      Please review the items outlined in red.
    </p>
    <input
      type="email"
      placeholder="What's your email?"
      aria-placeholder="What's your email?"
      v-model="email"
      :class="{ error: $v.email.$error }"
      @blur="$v.email.$touch()"
    />
    <button :disabled="$v.$invalid" type="submit">Submit</button>
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="error-message">
        Please enter a valid email.
      </p>
      <p v-if="!$v.email.required" class="error-message">Email is required.</p>
    </div>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Example",
  data() {
    return {
      email: null
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("Form submitted: ", this.email);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
