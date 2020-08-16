import Redis from 'ioredis';

import SessionRepositoryFactory from '..';

import InMemorySessionRepository from '../InMemoryRepository';
import RedisSessionRepository from '../RedisRepository';

describe('SessionRepositoryFactory class', () => {
  test('It should create a InMemorySessionRepository if no Redis server is available', async () => {
    const sessionRepository = await SessionRepositoryFactory.getSessionRepository();
    expect(sessionRepository instanceof InMemorySessionRepository).toBe(true);
  });

  test('It should create a RedisSessionRepository if a Redis server is available', async () => {
    jest.spyOn(Redis.prototype, 'connect').mockImplementation(() => Promise.resolve(true));
    const sessionRepository = await SessionRepositoryFactory.getSessionRepository();
    expect(sessionRepository instanceof RedisSessionRepository).toBe(true);
  });
});
