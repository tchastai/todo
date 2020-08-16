<template>
  <input :type="type" :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script lang="ts">
export default {
  name: 'TextInput',
  props: ['type', 'value'],
};
</script>
<style scoped>
input {
  height: 40px;
  box-sizing: border-box;
  border-radius: 8px;
  outline: none;
  padding-left: 10px;
  color: #495057;
  border: 1px solid #ced4da;
  font-size: 12px;
  color: #000000;
  transition: 0.2s;
  width: 100%;
}

input:focus {
  color: #495057;
  border-color: #57b6f5;
  box-shadow: 0 0 0 0.2rem #bce2fb;
}
</style>
