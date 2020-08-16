import Redis from 'ioredis';

import SessionRepository from './Repository';
import RedisSessionRepository from './RedisRepository';
import InMemorySessionRepository from './InMemoryRepository';
import IORedis from 'ioredis';

class SessionRepositoryFactory {
  /**
   * Returns a Redis SessionRepository if a Redis instance is found,
   * else return an in-memory SessionRepository.
   *
   * @privateRemarks this implements the dependency inversion principle, {@link https://martinfowler.com/articles/dipInTheWild.html }
   * @returns A Promise resolved with the appropriate SessionRepository
   */
  static async getSessionRepository(): Promise<SessionRepository> {
    const redisURL = process.env.REDIS_URL;
    try {
      const redisClientOptions: IORedis.RedisOptions = {
        retryStrategy: () => null,
      };
      const redisClient = new Redis(redisURL, redisClientOptions);
      redisClient.on('error', function () {});
      await redisClient.connect();
      return new RedisSessionRepository(redisClient);
    } catch (error) {
      const storageObject = { sessions: [] };
      return new InMemorySessionRepository(storageObject);
    }
  }
}

export default SessionRepositoryFactory;
