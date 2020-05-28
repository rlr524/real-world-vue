<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      v-on="listeners"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin.js";

export default {
  name: "BaseSelect",
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
