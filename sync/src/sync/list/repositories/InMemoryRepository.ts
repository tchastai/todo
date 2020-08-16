import List from '../Entity';
import ListRepository, { UserLists } from './Repository';

interface StorageObject {
  lists: UserLists[];
}

class InMemoryListRepository implements ListRepository {
  private storageObject: StorageObject;

  constructor(storageObject: StorageObject) {
    this.storageObject = storageObject;
  }

  private async create(userEmail: string, lists: List[]): Promise<UserLists> {
    this.storageObject.lists = [{ userEmail, lists }, ...this.storageObject.lists];
    return { userEmail, lists };
  }

  async upsert(userEmail: string, lists: List[]) {
    const documentIndex = this.storageObject.lists.findIndex((item) => {
      return item.userEmail === userEmail;
    });

    const upsert = documentIndex != -1;

    if (upsert) {
      this.storageObject.lists[documentIndex].lists = lists;
    } else {
      this.create(userEmail, lists);
    }

    return { userEmail, lists };
  }

  async findOne(userEmail: string) {
    return this.storageObject.lists.find((item) => item.userEmail === userEmail);
  }
}

export default InMemoryListRepository;
