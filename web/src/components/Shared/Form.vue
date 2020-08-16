<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
};
</script>
<style scoped>
form {
  display: block;
}
</style>
