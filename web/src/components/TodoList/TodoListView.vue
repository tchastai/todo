<template>
  <div class="todo-list-view">
    <Draggable v-model="lists" v-bind="dragOptions" class="lists-drag-container">
      <List v-for="list in lists" :key="list.id" :list="list" />
    </Draggable>
    <NewListButton v-on:newList="this.createList" />
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import { createNamespacedHelpers } from 'vuex';

import List from './List.vue';
import NewListButton from './NewListButton.vue';

const { mapActions, mapGetters } = createNamespacedHelpers('lists');

export default {
  name: 'TodoListView',
  components: {
    Draggable,
    List,
    NewListButton,
  },
  methods: {
    ...mapActions(['updateLists', 'createList']),
  },
  computed: {
    lists: {
      get() {
        return this.$store.getters['lists/lists'];
      },
      set(value) {
        this.updateLists(value);
      },
    },
    dragOptions() {
      return {
        animation: 300,
        ghostClass: 'ghost',
      };
    },
  },
};
</script>

<style>
.todo-list-view {
  display: flex;
}

.lists-drag-container {
  display: contents;
}

.ghost {
  opacity: 0.5;
}
</style>
