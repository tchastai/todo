<template>
  <p class="title">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'Title',
};
</script>
<style scoped>
p.title {
  font-weight: 600;
  font-size: 24px;
  color: black;
  margin: 0 0 4px 0;
}
</style>
