<template>
  <div class="new-task" v-on:click="$emit('newTask')">
    <Add />
  </div>
</template>

<script lang="ts">
import Add from '../../assets/icons/Add.vue';

export default {
  name: 'NewTask',
  components: {
    Add,
  },
};
</script>

<style scoped>
.new-task {
  border: 1px dashed #dbe4fd;
  min-height: 40px;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: cubic-bezier(0.4, 0, 0.2, 1) 0.1s;

  filter: saturate(0.7);

  cursor: default;
}

.new-task:hover {
  background-color: #e8eff3;
  border: 1px solid #e8eff3;
  filter: none;
}
</style>
