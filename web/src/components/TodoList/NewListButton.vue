<template>
  <div class="new-list" v-on:click="$emit('newList')">
    <Add />
  </div>
</template>

<script lang="ts">
import Add from '../../assets/icons/Add.vue';

export default {
  name: 'NewListButton',
  components: {
    Add,
  },
};
</script>

<style scoped>
.new-list {
  width: 400px;
  min-width: 400px;
  height: 160px;
  border: 1px dashed #dbe0ed;
  border-radius: 8px;
  margin: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: cubic-bezier(0.4, 0, 0.2, 1) 0.1s;

  filter: saturate(0.7);
}

.new-list:hover {
  background-color: #e8eff3;
  border: 1px solid #e8eff3;
  filter: none;
}
</style>
