import Session from '../Entity';

import SessionRepository, { SessionExpiredError } from './Repository';

interface InMemorySession extends Session {
  createdAt: Date;
}

interface StorageObject {
  sessions: InMemorySession[];
}

class InMemorySessionRepository implements SessionRepository {
  private storageObject: StorageObject;

  constructor(storageObject: StorageObject) {
    this.storageObject = storageObject;
  }

  getCreationDate() {
    return new Date();
  }

  async create(email: string) {
    const id = Session.generateId(email);
    const session = { id, email, createdAt: this.getCreationDate() };

    this.storageObject.sessions = [session, ...this.storageObject.sessions];
    return new Session(id, email);
  }

  async findOne(id: string) {
    const result = this.storageObject.sessions.find((session) => session.id === id);

    const maxAge = new Date(new Date().getTime() - 12 * 60 * 60 * 1000);

    if (result && result.createdAt < maxAge) {
      throw new SessionExpiredError();
    }
    return result;
  }
}

export default InMemorySessionRepository;
