import { v4 as uuid } from 'uuid';

import { connect } from './helpers/connect';

export interface ListItem {
  id: string;
  content?: string;
  done: boolean;
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  content?: string;
  done: boolean;
}

export interface List {
  id: string;
  name?: string;
  creationDate: Date;
  items: ListItem[];
}

/**
 * The local repository for the todo-lists data.
 *
 * @remarks
 * This class is under-optimized and could be improved, especially in the way it stores and retrieves data.
 * In the event that we need to display more lists,
 * the rendering will be affected and the editor will be slower.
 * In the current context, it does not cause performance issues.
 *
 * A next step would be to separate lists, tasks and subtasks in separate collections
 *
 * @public
 */
class TodoService {
  private storage = connect();

  /**
   * Returns the input lists with new Ids.
   *
   * @param list - The list to be copied
   * @returns The list with new ids
   */
  private refreshIds(list: List): List {
    const newList = list;
    newList.id = uuid();
    newList.items = newList.items.map(item => {
      item.id = uuid();
      item.subtasks = item.subtasks?.map(subtask => {
        subtask.id = uuid();
        return subtask;
      });
      return item;
    });

    return newList;
  }

  /**
   * Creates a list.
   *
   * @param name - The name of the new list
   * @returns The created list
   */
  createList(name?: string): List {
    const newList = {
      id: uuid(),
      name,
      creationDate: new Date(),
      items: [],
    };

    this.storage.lists = [...this.storage.lists, newList];

    return newList;
  }

  /**
   * Updates all lists at the same time.
   *
   * @param lists - The new lists array
   */
  updateLists(lists: List[]): void {
    this.storage.lists = lists;
  }

  /**
   * Returns a specific list.
   *
   * @param id - The id to search for
   * @returns The list
   */
  getList(id: string): List {
    return this.storage.lists.find((list: List) => list.id === id);
  }

  /**
   * Returns all lists in storage.
   *
   * @returns The lists
   */
  getLists(): List[] {
    return this.storage.lists;
  }

  /**
   * Updates a specific list.
   *
   * @param id - The id to search for
   * @param update - The fields to be updated
   * @returns The updated list
   */
  updateList(id: string, update: Partial<List>): List | undefined {
    let updatedList;

    this.storage.lists = this.storage.lists.map((list: List) => {
      if (list.id === id) {
        updatedList = { ...list, ...update };
        return updatedList;
      }
      return list;
    });

    return updatedList;
  }

  /**
   * Removes a specific list.
   *
   * @param id - The id to search for
   */
  removeList(id: string): void {
    this.storage.lists = this.storage.lists.filter((list: List) => list.id !== id);
  }

  /**
   * Duplicates a specific list.
   *
   * @param id - The id to search for
   * @returns The list
   */
  duplicateList(id: string): List {
    const newList = this.refreshIds(this.getList(id));

    const index = this.storage.lists.findIndex((list: List) => list.id === id);

    this.storage.lists = [
      ...this.storage.lists.slice(0, index),
      newList,
      ...this.storage.lists.slice(index),
    ];

    return newList;
  }

  /**
   * Clears storage.
   *
   * @returns The new storage value
   */
  removeLists(): [] {
    this.storage.lists = [];
    return [];
  }

  /**
   * Creates a new item in a given list
   *
   * @param listId - The list id where the item is added
   * @param item - The item to add to the list.
   * If ommited, an empty item will be created
   * @returns The created item
   */
  createItem(listId: string, item?: ListItem): ListItem {
    const defaultItem = { id: uuid(), done: false };

    const newItem = {
      ...item,
      ...defaultItem,
    };

    const list = this.getList(listId);
    list.items = [...list.items, newItem];
    this.updateList(listId, list);

    return newItem;
  }

  /**
   * Returns a specific list item.
   *
   * @param id - The id to search for
   * @returns The item
   */
  getItem(id: string): ListItem | undefined {
    for (const list of this.storage.lists) {
      const item = list.items?.find((item: ListItem) => item.id === id);
      if (item) {
        return item;
      }
    }
  }

  /**
   * Returns a all items from a list.
   *
   * @param id - The id to search for
   * @returns The items
   */
  getItems(listId: string): ListItem[] {
    return this.getList(listId).items;
  }

  /**
   * Updates a specific list.
   *
   * @param id - The id to search for
   * @param update - The fields to be updated
   * @returns The updated item
   */
  updateItem(id: string, update: Partial<ListItem>): ListItem | undefined {
    let updatedItem;

    this.storage.lists = this.storage.lists.map((list: List) => {
      const items = list.items.map((item: ListItem) => {
        if (item.id === id) {
          updatedItem = { ...item, ...update };
          return updatedItem;
        }
        return item;
      });
      return { ...list, items };
    });

    return updatedItem;
  }

  /**
   * Removes a specific list.
   *
   * @param id - The id to search for
   * @returns The deleted id
   */
  removeItem(id: string): string {
    this.storage.lists = this.storage.lists.map((list: List) => {
      const items = list.items
        .map(item => {
          if (item.id === id) {
            return undefined;
          }
          return item;
        })
        .filter(item => item !== undefined);

      return { ...list, items };
    });

    return id;
  }

  /**
   * Creates a new subtask in a given item
   *
   * @param itemId - The item id where the subtask is added
   * @param subtask - The subtask to add to the item.
   * If ommited, an empty subtask will be created
   * @returns The created subtask
   */
  createSubtask(itemId: string, subtask?: Subtask): Subtask {
    const defaultSubtask = { id: uuid(), done: false };

    const newSubtask = {
      ...subtask,
      ...defaultSubtask,
    };

    const item = this.getItem(itemId);

    if (!item) throw 'Item not found';

    item.subtasks = [...(item.subtasks ?? []), newSubtask];
    this.updateItem(itemId, item);

    return newSubtask;
  }

  /**
   * Returns a specific subtask
   *
   * @param id - The id to be found
   * @returns A subtask
   */
  getSubtask(id: string): Subtask | undefined {
    for (const list of this.storage.lists) {
      for (const item of list.items) {
        const subtask = item.subtasks?.find((subtask: Subtask) => subtask.id === id);
        if (subtask) {
          return subtask;
        }
      }
    }
  }

  /**
   * Returns all subtasks from an item
   *
   * @param itemId - The item to search for
   * @returns The subtasks
   */
  getSubtasks(itemId: string): Subtask[] | [] {
    const item = this.getItem(itemId);
    return item?.subtasks || [];
  }

  /**
   * Updates a specific subtask.
   *
   * @param id - The id to search for
   * @param update - The fields to be updated
   * @returns The updated subtask
   */
  updateSubtask(id: string, update: Partial<Subtask>): ListItem | undefined {
    let updatedSubtask;

    this.storage.lists = this.storage.lists.map((list: List) => {
      const items = list.items.map((item: ListItem) => {
        const subtasks = item.subtasks?.map((subtask: Subtask) => {
          if (subtask.id === id) {
            updatedSubtask = { ...subtask, ...update };
            return updatedSubtask;
          }
          return subtask;
        });
        return { ...item, subtasks };
      });
      return { ...list, items };
    });

    return updatedSubtask;
  }

  /**
   * Removes a specific list.
   *
   * @param id - The id to search for
   * @returns The deleted id
   */
  removeSubtask(id: string): string {
    this.storage.lists = this.storage.lists.map((list: List) => {
      const items = list.items.map((item: ListItem) => {
        if (item.subtasks) {
          const subtasks: any[] = item.subtasks
            .map(subtask => {
              if (subtask.id === id) {
                return undefined;
              }
              return subtask;
            })
            .filter(subtasks => subtasks !== undefined);

          return { ...item, subtasks };
        }
        return item;
      });

      return { ...list, items };
    });

    return id;
  }
}

export default TodoService;
