import MongoUserRepository from './MongoRepository';
import InMemoryUserRepository from './InMemoryRepository';
import { getDatabase } from '../../../database';
import { UserRepository } from './Repository';

class UserRepositoryFactory {
  /**
   * Returns a database UserRepository if a database is found,
   * else return an in-memory UserRepository.
   *
   * @privateRemarks this implements the dependency inversion principle, {@link https://martinfowler.com/articles/dipInTheWild.html }
   * @returns A Promise resolved with the appropriate UserRepository
   */
  static async getUserRepository(): Promise<UserRepository> {
    try {
      const database = await getDatabase();
      return new MongoUserRepository(database);
    } catch (error) {
      const storageObject = { users: [] };
      return new InMemoryUserRepository(storageObject);
    }
  }
}

export default UserRepositoryFactory;
