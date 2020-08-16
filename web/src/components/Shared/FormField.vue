<template>
  <div class="field">
    <label>{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    label: String,
  },
};
</script>
<style scoped>
label {
  font-size: 13px;
  color: #c7c5c5;
  line-height: 2.3;
  text-transform: capitalize;
}

.field {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
