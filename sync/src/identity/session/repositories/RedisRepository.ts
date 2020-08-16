import { Redis as IORedisClient } from 'ioredis';

import SessionRepository from './Repository';
import Session from '../Entity';

class RedisSessionRepository implements SessionRepository {
  private client: IORedisClient;

  constructor(client: IORedisClient) {
    this.client = client;
  }

  async create(email: string) {
    const id = Session.generateId(email);

    // Expires after 43200 seconds, that is, 12 hours
    await this.client.set(id, email, 'EX', 43200);

    return new Session(id, email);
  }

  async findOne(id: string) {
    const email = await this.client.get(id);

    if (!email) return;

    return new Session(id, email) || undefined;
  }
}

export default RedisSessionRepository;
