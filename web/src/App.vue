<template>
  <div id="app">
    <TodoListView />
    <SyncBar />
    <AuthenticationView />
  </div>
</template>

<script>
import TodoListView from './components/TodoList/TodoListView.vue';
import SyncBar from './components/Authentication/SyncBar';
import AuthenticationView from './components/Authentication/AuthenticationView';

export default {
  name: 'App',
  components: {
    TodoListView,
    SyncBar,
    AuthenticationView,
  },
  created() {
    this.$store.dispatch('server/checkHealth');
  },
};
</script>

<style>
body {
  background-color: #fbfdff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    'Helvetica Neue', sans-serif;
  padding: 24px;
  margin: 0;
}
</style>
