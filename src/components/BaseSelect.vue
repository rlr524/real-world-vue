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
export default {
  name: "BaseSelect",
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    label: String,
    value: [String, Number]
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
