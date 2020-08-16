import { Db } from 'mongodb';

import MongoListRepository from '../MongoRepository';
import InMemoryDatabase from '../../../../test/InMemoryDatabase';

const inMemoryDatabase = new InMemoryDatabase();
let db: Db;

const sampleDocument = { userEmail: 'user@example.com', lists: [{ tasks: [{}] }] };

describe('MongoListRepository class', () => {
  beforeAll(async () => {
    db = await inMemoryDatabase.setup();
  });

  afterEach(async () => {
    await inMemoryDatabase.cleanCollection('lists');
  });

  afterAll(async () => {
    await inMemoryDatabase.teardown();
  });

  test('It should create a list if it does not exists', async () => {
    const listRepository = new MongoListRepository(db);

    await listRepository.upsert(sampleDocument.userEmail, sampleDocument.lists);

    const dbCheck = await db.collection('lists').findOne({ userEmail: sampleDocument.userEmail });

    expect(dbCheck).toMatchObject(sampleDocument);
  });

  test('It should find a list given its user email', async () => {
    const listRepository = new MongoListRepository(db);

    await listRepository.upsert(sampleDocument.userEmail, sampleDocument.lists);

    expect(await listRepository.findOne(sampleDocument.userEmail)).toMatchObject(sampleDocument);
  });

  test('It should upsert a list if it does exist', async () => {
    const listRepository = new MongoListRepository(db);

    await listRepository.upsert(sampleDocument.userEmail, sampleDocument.lists);
    await listRepository.upsert(sampleDocument.userEmail, sampleDocument.lists);

    const dbCheck = await db.collection('lists').findOne({ userEmail: sampleDocument.userEmail });

    expect(dbCheck).toMatchObject(sampleDocument);
  });
});
