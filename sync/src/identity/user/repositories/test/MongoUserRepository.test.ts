import { Db } from 'mongodb';

import MongoUserRepository from '../MongoRepository';
import InMemoryDatabase from '../../../../test/InMemoryDatabase';
import { DuplicateRessourceError } from '../../../../helpers/errors';

const inMemoryDatabase = new InMemoryDatabase();
let db: Db;

const sampleUser = { email: 'user@example.com', password: 'secret' };

describe('MongoUserRepository class', () => {
  beforeAll(async () => {
    db = await inMemoryDatabase.setup();
  });

  afterEach(async () => {
    await inMemoryDatabase.cleanCollection('users');
  });

  afterAll(async () => {
    await inMemoryDatabase.teardown();
  });

  test('It should create an user', async () => {
    const userRepository = new MongoUserRepository(db);

    await userRepository.create(sampleUser.email, sampleUser.password);

    const dbCheck = await db.collection('users').findOne({ email: sampleUser.email });

    expect(dbCheck).toMatchObject(sampleUser);
  });

  test('It should find a user given its email', async () => {
    const userRepository = new MongoUserRepository(db);

    await userRepository.create(sampleUser.email, sampleUser.password);

    expect(await userRepository.findOne(sampleUser.email)).toEqual(sampleUser);
  });

  test('It should throw if a user with the same email already exists', async () => {
    const userRepository = new MongoUserRepository(db);

    async function createUserWrapper() {
      await userRepository.create(sampleUser.email, sampleUser.password);
      await userRepository.create(sampleUser.email, sampleUser.password);
    }

    expect(createUserWrapper()).rejects.toThrowError(DuplicateRessourceError);
  });
});
