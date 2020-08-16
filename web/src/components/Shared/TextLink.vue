<template>
  <span class="text-link">
    <slot></slot>
  </span>
</template>

<script lang="ts">
export default {
  name: 'TextLink',
};
</script>
<style scoped>
.text-link {
  font-size: 14px;
  line-height: 17px;
  color: #0054ff;
  cursor: pointer;
  transition: 0.1s;
  padding-left: 4px;
  padding-right: 4px;
}

.text-link:hover {
  text-decoration: underline;
  filter: brightness(0.7);
}
</style>
