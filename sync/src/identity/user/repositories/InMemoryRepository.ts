import { UserRepository } from './Repository';
import User from '../Entity';
import { DuplicateRessourceError } from '../../../helpers/errors';

interface StorageObject {
  users: User[];
}

class InMemoryUserRepository implements UserRepository {
  private storageObject: StorageObject;

  constructor(storageObject: StorageObject) {
    this.storageObject = storageObject;
  }

  async create(email: string, password: string) {
    const user = { email, password };

    const duplicate = await this.findOne(email);
    if (duplicate) {
      throw new DuplicateRessourceError(`A user with email: ${email} already exists`);
    }

    this.storageObject.users = [user, ...this.storageObject.users];
    return user;
  }

  async findOne(email: string) {
    const result = this.storageObject.users.find((user) => user.email === email);
    return result;
  }
}

export default InMemoryUserRepository;
