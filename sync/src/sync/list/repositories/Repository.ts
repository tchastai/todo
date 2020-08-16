import List from '../Entity';

export class UserLists {
  userEmail: string;
  lists: List[];

  constructor(userEmail: string, lists: List[]) {
    this.userEmail = userEmail;
    this.lists = lists;
  }
}

interface ListRepository {
  /**
   * Upserts a UserList.
   *
   * @param userEmail The user's email
   * @param lists The lists to be upserted
   * @returns A Promise resolved with the upserted UserLists
   */
  upsert(userEmail: string, lists: List[]): Promise<UserLists>;

  /**
   * Returns the user's lists.
   *
   * @param userEmail The user's email
   * @returns A Promise resolved with the found UserLists
   */
  findOne(userEmail: string): Promise<UserLists | undefined>;
}

export default ListRepository;
