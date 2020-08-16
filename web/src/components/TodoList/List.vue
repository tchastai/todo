<template>
  <div
    class="list"
    :class="`${isDeleting && 'deleting'} ${isDuplicating && 'duplicating'}`"
    tabindex="0"
    v-on:keydown.delete="isDeleting = true"
    v-on:keyup.delete="removeList(list.id)"
    v-on:keydown.ctrl.68="isDuplicating = true"
    v-on:keyup.ctrl.68="duplicateList(list.id) && (isDuplicating = false)"
  >
    <input
      placeholder="New List"
      :size="(list.name && list.name.length) || 8"
      v-model="name"
      v-on:keydown.stop
      v-on:keyup.stop
    />
    <Draggable v-model="items" v-bind="dragOptions">
      <Task v-for="item in items" :key="item.id" :task="item" />
    </Draggable>
    <NewTaskButton v-on:newTask="createTask(list.id)" />
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import { createNamespacedHelpers } from 'vuex';

import Task from './Task.vue';
import NewTaskButton from './NewTaskButton.vue';

const { mapActions } = createNamespacedHelpers('lists');

export default {
  name: 'List',
  props: {
    list: Object,
  },
  data: function() {
    return {
      isDeleting: false,
      isDuplicating: false,
    };
  },
  methods: {
    ...mapActions([
      'updateListItems',
      'createTask',
      'updateListName',
      'removeList',
      'duplicateList',
    ]),
  },
  computed: {
    items: {
      get() {
        return this.list.items;
      },

      set(items) {
        this.updateListItems({ id: this.list.id, items });
      },
    },
    name: {
      get() {
        return this.list.name;
      },

      set(name) {
        this.updateListName({ id: this.list.id, name });
      },
    },
    dragOptions() {
      return {
        animation: 300,
        ghostClass: 'ghost',
      };
    },
  },
  components: {
    Task,
    NewTaskButton,
    Draggable,
  },
};
</script>

<style scoped>
.list {
  width: 400px;
  min-width: 400px;
  height: fit-content;
  background-color: #f4f8fb;
  border-radius: 8px;
  padding-top: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  margin: 8px;
  box-sizing: border-box;
  transition: box-shadow cubic-bezier(0.4, 0, 0.2, 1) 0.1s;

  cursor: pointer;
  outline: none;
}

.list:hover {
  box-shadow: 0px 6px 24px rgba(138, 165, 185, 0.32), 0 0 0 1px #e3e6f0;
}

.list:active {
  box-shadow: 0px 0px 6px rgba(138, 165, 185, 0.32);
}

.list:focus {
  box-shadow: 0 0 0 3px #57b6f5;
}

.list.deleting {
  box-shadow: 0 0 0 3px #ff6666;
}

.list.duplicating {
  box-shadow: 0 0 0 3px #16cea7;
}

.list.sortable-chosen {
  box-shadow: 0px 0px 6px rgba(138, 165, 185, 0.32);
}

input {
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-top: 0px;
  margin-bottom: 16px;
  outline: none;
  border: none;
  background: none;
}

input::placeholder {
  color: #c8cfda;
}
</style>
