import ListRepositoryFactory from '..';

import InMemoryListRepository from '../InMemoryRepository';
import MongoListRepository from '../MongoRepository';

import * as DatabaseHelpers from '../../../../database';

import { Db } from 'mongodb';

describe('ListRepositoryFactory class', () => {
  test('It should create a InMemoryListRepository if no Mongo database is available', async () => {
    const userRepository = await ListRepositoryFactory.getListRepository();
    expect(userRepository instanceof InMemoryListRepository).toBe(true);
  });

  test('It should create a MongoListRepository if a Mongo database is available', async () => {
    jest
      .spyOn(DatabaseHelpers, 'getDatabase')
      .mockImplementation(() => Promise.resolve((true as unknown) as Db));
    const userRepository = await ListRepositoryFactory.getListRepository();
    expect(userRepository instanceof MongoListRepository).toBe(true);
  });
});
