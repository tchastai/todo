import MongoRepository from './MongoRepository';
import InMemoryRepository from './InMemoryRepository';
import { getDatabase } from '../../../database';
import ListRepository from './Repository';

class ListRepositoryFactory {
  /**
   * Returns a database ListRepository if a database is found,
   * else return an in-memory ListRepository.
   *
   * @privateRemarks this implements the dependency inversion principle, {@link https://martinfowler.com/articles/dipInTheWild.html }
   * @returns A Promise resolved with the appropriate ListRepository
   */
  static async getListRepository(): Promise<ListRepository> {
    try {
      const database = await getDatabase();
      return new MongoRepository(database);
    } catch (error) {
      const storageObject = { lists: [] };
      return new InMemoryRepository(storageObject);
    }
  }
}

export default ListRepositoryFactory;
