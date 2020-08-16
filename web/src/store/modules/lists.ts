import { ActionContext } from 'vuex';
import { debounce } from 'lodash';

import TodoService, { List } from '../../services/Todo';
import SDK, { Client } from '@/api/SDK';

const todoStorage = new TodoService();

interface TodoListState {
  lists: List[];
  isSynchronizing?: boolean;
}

const syncClient = SDK.getClient();

const state: TodoListState = {
  lists: todoStorage.getLists(),
  isSynchronizing: undefined,
};

const mutations = {
  saveListsToStore(state: TodoListState) {
    state.lists = todoStorage.getLists();
  },

  toggleIsSynchronizing(state: TodoListState) {
    state.isSynchronizing = !state.isSynchronizing;
  },
};

const actions = {
  debounceSynchronizeLists: debounce(async (context: ActionContext<any, any>) => {
    try {
      await syncClient.synchronizeLists(state.lists);
    } catch (error) {
      context.dispatch('authentication/logOut', {}, { root: true });
    }
    context.commit('toggleIsSynchronizing');
  }, 2000),

  async persistLists(context: ActionContext<any, any>) {
    context.commit('saveListsToStore');
    if (Client.hasCredentials()) {
      context.commit('toggleIsSynchronizing');
      context.dispatch('debounceSynchronizeLists');
    }
  },

  async syncListsOnSignIn(context: ActionContext<any, any>) {
    const userLists = await syncClient.getLists();

    if (userLists) {
      context.dispatch('updateLists', userLists);
    } else {
      context.dispatch('persistLists');
    }
  },

  async emptyLists(context: ActionContext<any, any>) {
    todoStorage.removeLists();
    context.dispatch('persistLists');
  },

  createList(context: ActionContext<any, any>) {
    todoStorage.createList();
    context.dispatch('persistLists');
  },

  updateLists(context: ActionContext<any, any>, updatedLists: List[]) {
    todoStorage.updateLists(updatedLists);
    context.dispatch('persistLists');
  },

  updateListName(context: ActionContext<any, any>, { id, name }: any) {
    todoStorage.updateList(id, { name });
    context.dispatch('persistLists');
  },

  updateListItems(context: ActionContext<any, any>, { id, items }: any) {
    todoStorage.updateList(id, { items });
    context.dispatch('persistLists');
  },

  removeList(context: ActionContext<any, any>, id: string) {
    todoStorage.removeList(id);
    context.dispatch('persistLists');
  },

  duplicateList(context: ActionContext<any, any>, id: string) {
    todoStorage.duplicateList(id);
    context.dispatch('persistLists');
  },

  createTask(context: ActionContext<any, any>, listId: string) {
    todoStorage.createItem(listId);
    context.dispatch('persistLists');
  },

  updateTaskContent(context: ActionContext<any, any>, { id, content }: any) {
    todoStorage.updateItem(id, { content });
    context.dispatch('persistLists');
  },

  updateTask(context: ActionContext<any, any>, { id, update }: any) {
    todoStorage.updateItem(id, update);
    context.dispatch('persistLists');
  },

  checkTask(context: ActionContext<any, any>, { id, done }: any) {
    todoStorage.updateItem(id, { done });
    context.dispatch('persistLists');
  },

  removeTask(context: ActionContext<any, any>, id: any) {
    todoStorage.removeItem(id);
    context.dispatch('persistLists');
  },

  createSubtask(context: ActionContext<any, any>, taskId: any) {
    todoStorage.createSubtask(taskId);
    context.dispatch('persistLists');
  },

  updateSubtaskContent(context: ActionContext<any, any>, { id, content }: any) {
    todoStorage.updateSubtask(id, { content });
    context.dispatch('persistLists');
  },

  removeSubtask(context: ActionContext<any, any>, id: string) {
    todoStorage.removeSubtask(id);
    context.dispatch('persistLists');
  },

  checkSubtask(context: ActionContext<any, any>, subtaskId: string) {
    const isChecked = todoStorage.getSubtask(subtaskId)?.done;
    todoStorage.updateSubtask(subtaskId, { done: !isChecked });
    context.dispatch('persistLists');
  },
};

const getters = {
  lists: (state: TodoListState) => state.lists,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
