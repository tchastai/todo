<template>
  <div
    class="task"
    :class="isDeleting && 'deleting'"
    tabindex="0"
    v-on:keydown.delete="isDeleting = true"
    v-on:keyup.delete="removeTask(task.id)"
    v-on:keydown.stop
    v-on:keyup.stop
  >
    <div class="task-container">
      <Checkbox
        v-on:checkTask="
          checkTask({
            id: task.id,
            done: !task.done,
          })
        "
        :active="task.done"
      />
      <input
        placeholder="New task"
        v-model="content"
        v-on:keydown.stop
        v-on:keyup.stop
        :size="(task.content && task.content.length) || 8"
      />
      <div class="checklist" @click="displaySubtasks">
        <ExpandLess v-if="subtasksEnabled" />
        <Checklist v-else />
      </div>
    </div>
    <div class="subtask-container" v-if="subtasksEnabled">
      <Draggable v-model="subtasks" v-bind="dragOptions">
        <Subtask v-for="subtask in task.subtasks" :key="subtask.id" :subtask="subtask" />
      </Draggable>
      <NewSubtaskButton v-on:newSubtask="createSubtask(task.id)" />
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import { createNamespacedHelpers } from 'vuex';

import Checkbox from './Checkbox.vue';
import Subtask from './Subtask.vue';
import NewSubtaskButton from './NewSubtaskButton.vue';
import Checklist from '../../assets/icons/Checklist.vue';
import ExpandLess from '../../assets/icons/ExpandLess.vue';

const { mapActions } = createNamespacedHelpers('lists');

export default {
  name: 'Task',
  components: {
    Checkbox,
    Checklist,
    ExpandLess,
    Subtask,
    NewSubtaskButton,
    Draggable,
  },
  props: {
    task: Object,
  },
  data: function() {
    return {
      isDeleting: false,
      subtasksEnabled: false,
    };
  },
  methods: {
    ...mapActions(['updateTaskContent', 'updateTask', 'checkTask', 'removeTask', 'createSubtask']),

    displaySubtasks() {
      this.subtasksEnabled = !this.subtasksEnabled;
    },
  },
  computed: {
    subtasks: {
      get() {
        return this.task.subtasks;
      },

      set(subtasks) {
        this.updateTask({
          id: this.task.id,
          update: { subtasks },
        });
      },
    },
    content: {
      get() {
        return this.task.content;
      },
      set(content) {
        this.updateTaskContent({
          id: this.task.id,
          content,
        });
      },
    },
    dragOptions() {
      return {
        animation: 150,
        ghostClass: 'ghost',
      };
    },
  },
};
</script>

<style scoped>
.task {
  background-color: white;
  min-height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 8px;

  outline: none;

  transition: box-shadow cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.task:hover {
  box-shadow: 0px 2px 6px rgba(138, 165, 185, 0.22);
}

.task:active {
  box-shadow: 0px 1px 3px rgba(138, 165, 185, 0.22);
}

.task:focus {
  box-shadow: 0 0 0 3px #57b6f5;
}

.task.deleting {
  transition: none;
  box-shadow: 0 0 0 3px #ff6666;
}

.task.sortable-chosen {
  box-shadow: 0px 1px 3px rgba(138, 165, 185, 0.22);
}

.task-container {
  width: 100%;
  display: flex;
  align-items: center;
  height: 40px;
}

.subtask-container {
  display: flex;
  flex-direction: column;
  margin-left: 32px;
}

input {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  color: #656b75;
  outline: none;
  border: none;
  margin-left: 8px;
}

input::placeholder {
  color: #c8cfda;
}

.checklist {
  margin-left: auto;
  width: 32px;
  height: 32px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: default;

  transition: background-color cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.checklist:hover {
  background-color: #f2f5ff;
}

.checklist > svg {
  opacity: 0.6;
  filter: saturate(0.5);

  transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.checklist:hover > svg {
  opacity: 1;
  filter: none;
}
</style>
