<template>
  <span class="body-text">
    <slot></slot>
  </span>
</template>

<script lang="ts">
export default {
  name: 'BodyText',
};
</script>
<style scoped>
.body-text {
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #404040;
  padding-right: 4px;
}
</style>
