<template>
  <div class="new-subtask" v-on:click="$emit('newSubtask')">
    <Add />
  </div>
</template>

<script>
import Add from '../../assets/icons/Add.vue';

export default {
  name: 'NewSubtaskButton',
  components: {
    Add,
  },
};
</script>

<style scoped>
.new-subtask {
  border: 1px dashed #e3e8f8;
  min-height: 32px;
  border-radius: 8px;
  margin-top: 4px;
  margin-bottom: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: default;

  transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.new-subtask:hover {
  background-color: #f6f8ff;
}
</style>
