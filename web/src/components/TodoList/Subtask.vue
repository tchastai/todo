<template>
  <div
    class="subtask"
    :class="isDeleting && 'deleting'"
    v-on:keydown.delete="isDeleting = true"
    tabindex="0"
    v-on:keyup.delete="removeSubtask(subtask.id)"
    v-on:keydown.stop
    v-on:keyup.stop
  >
    <div
      class="circle"
      v-on:click="checkSubtask(subtask.id)"
      :class="subtask.done && 'checked'"
    ></div>
    <input
      placeholder="New Subtask"
      :size="(subtask.content && subtask.content.length) || 11"
      v-model="content"
      v-on:keydown.stop
      v-on:keyup.stop
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('lists');

export default {
  name: 'Subtask',
  props: {
    subtask: Object,
  },
  data: function() {
    return {
      isDeleting: false,
    };
  },
  methods: {
    ...mapActions(['updateSubtaskContent', 'removeSubtask', 'checkSubtask']),
  },
  computed: {
    content: {
      get() {
        return this.subtask.content;
      },

      set() {
        this.updateSubtaskContent({
          id: this.subtask.id,
          content: event.target.value,
        });
      },
    },
  },
};
</script>

<style scoped>
.subtask {
  min-height: 40px;
  border-left: 16px;
  border-right: 16px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;

  outline: none;
}

.subtask > * {
  transition: cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.subtask + .subtask {
  border-top: 1px solid #ebeffc;
}

.subtask:focus {
  background-color: #f7f9ff;
}

.subtask.deleting {
  opacity: 0.5;
  background-color: #fff2f2;
  transition: none;
}

.subtask.deleting > .circle {
  border-color: #ff6666;
  background-color: #ff6666;
  transition: none;
}

input {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  color: #656b75;
  outline: none;
  border: none;
  margin-left: 8px;
  border-radius: 10px;
  background: transparent;
}

input::placeholder {
  color: #c8cfda;
}

.circle {
  background: transparent;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  border: 1.5px solid #a2c0fd;
  cursor: default;
}

.circle:hover {
  background-color: #e7efff;
}

.circle.checked {
  background-color: #a2c0fd;
}
</style>
