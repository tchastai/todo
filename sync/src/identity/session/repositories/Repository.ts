import Session from '../Entity';

export class SessionExpiredError extends Error {
  public status: number;

  constructor(message = '') {
    super(message);
    this.message = message;
    this.name = 'SessionExpiredError';
    this.status = 401;
  }
}

interface SessionRepository {
  /**
   * Creates a session with a randomly generated ID.
   *
   * @param email - The session owner's email
   * @returns The created session
   */
  create(email: string): Promise<Session>;

  /**
   * Finds a session given an id.
   *
   * @param email - The session id
   * @returns The session
   */
  findOne(id: string): Promise<Session | undefined>;
}

export default SessionRepository;
