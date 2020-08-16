<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Card',
};
</script>
<style scoped>
.card {
  background: #ffffff;
  box-shadow: 0px 6px 16px rgba(138, 165, 185, 0.24);
  border-radius: 8px;
  padding: 40px;
  box-sizing: border-box;
}
</style>
