import { Db } from 'mongodb';

import { UserRepository } from './Repository';
import User from '../Entity';
import { DuplicateRessourceError } from '../../../helpers/errors';

class MongoUserRepository implements UserRepository {
  private client: Db;

  constructor(client: Db) {
    this.client = client;
  }

  async create(email: string, password: string) {
    const user = { email, password };

    const duplicate = await this.findOne(email);
    if (duplicate) {
      throw new DuplicateRessourceError(`A user with email: ${email} already exists`);
    }

    await this.client.collection('users').insertOne(user);
    return new User(email, password);
  }

  async findOne(email: string) {
    const user = await this.client.collection('users').findOne({ email });

    if (user) {
      return new User(user.email, user.password);
    }
    return undefined;
  }
}

export default MongoUserRepository;
