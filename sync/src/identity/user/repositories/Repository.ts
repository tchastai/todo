import User from '../Entity';

export interface UserRepository {
  /**
   * Creates a user if not exists.
   *
   * @param email The user email
   * @param password The user password
   * @returns The inserted user
   */
  create(email: string, password: string): Promise<User>;

  /**
   * Finds a user.
   *
   * @param email The user email
   * @returns The user or undefined
   */
  findOne(email: string): Promise<User | undefined>;
}
