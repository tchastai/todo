import ListRepository, { UserLists } from './Repository';
import { Db } from 'mongodb';
import List from '../Entity';

class MongoListRepository implements ListRepository {
  private client: Db;

  constructor(client: Db) {
    this.client = client;
  }

  async upsert(userEmail: string, lists: List[]) {
    await this.client.collection('lists').replaceOne(
      { userEmail },
      {
        $set: { lists },
      },
      { upsert: true },
    );

    return { userEmail, lists };
  }

  async findOne(userEmail: string) {
    const document = await this.client.collection('lists').findOne({ userEmail });

    if (document) {
      return new UserLists(document.userEmail, document.lists);
    }

    return undefined;
  }
}

export default MongoListRepository;
