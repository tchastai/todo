import UserRepositoryFactory from '..';

import InMemoryUserRepository from '../InMemoryRepository';
import MongoUserRepository from '../MongoRepository';

import * as DatabaseHelpers from '../../../../database';

import { Db } from 'mongodb';

describe('UserRepositoryFactory class', () => {
  test('It should create a InMemoryUserRepository if no Mongo database is available', async () => {
    const userRepository = await UserRepositoryFactory.getUserRepository();
    expect(userRepository instanceof InMemoryUserRepository).toBe(true);
  });

  test('It should create a MongoUserRepository if a Mongo database is available', async () => {
    jest
      .spyOn(DatabaseHelpers, 'getDatabase')
      .mockImplementation(() => Promise.resolve((true as unknown) as Db));
    const userRepository = await UserRepositoryFactory.getUserRepository();
    expect(userRepository instanceof MongoUserRepository).toBe(true);
  });
});
