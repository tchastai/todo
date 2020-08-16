import ListRepositoryFactory from './list/repositories';
import ListRepository, { UserLists } from './list/repositories/Repository';
import List from './list/Entity';

class SyncService {
  private listRepository: ListRepository;

  constructor(listRepository: ListRepository) {
    this.listRepository = listRepository;
  }

  /**
   * Persists the given lists with the userEmail as ressource author.
   *
   * @param userEmail - The user's email
   * @param lists - The lists to be persisted
   * @returns A Promise resolving with the upserted document
   */
  synchronize(userEmail: string, lists: List[]): Promise<UserLists> {
    return this.listRepository.upsert(userEmail, lists);
  }

  /**
   * Get the lists authored by `userEmail`.
   *
   * @param userEmail - The user's email
   * @returns A Promise resolving with the found lists if it exists
   */
  getLists(userEmail: string): Promise<UserLists | undefined> {
    return this.listRepository.findOne(userEmail);
  }
}

/**
 * Returns a SyncService instance once the repositories
 * it uses are instanciated in their respective factories.
 *
 * @returns A Promise with a SyncService instance
 */
export async function getSyncService(): Promise<SyncService> {
  const repository = await ListRepositoryFactory.getListRepository();
  return new SyncService(repository);
}

export default SyncService;
