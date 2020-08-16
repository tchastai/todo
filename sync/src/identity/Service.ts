import bcrypt from 'bcrypt';

import { UserRepository } from './user/repositories/Repository';
import UserRepositoryFactory from './user/repositories';
import SessionRepositoryFactory from './session/repositories';
import SessionRepository from './session/repositories/Repository';
import Session from './session/Entity';
import User from './user/Entity';
import Joi from '@hapi/joi';

class InvalidCredentialsError extends Error {
  public status?: number;

  constructor(message = '') {
    super(message);
    this.message = message;
    this.name = 'InvalidCredentialsError';
    this.status = 401;
  }
}

class UserNotFoundError extends Error {
  public status?: number;

  constructor(message = '') {
    super(message);
    this.message = message;
    this.name = 'UserNotFoundError';
    this.status = 404;
  }
}

class IdentityService {
  private user: UserRepository;
  private session: SessionRepository;

  constructor(userRepository: UserRepository, sessionRepository: SessionRepository) {
    this.user = userRepository;
    this.session = sessionRepository;
  }

  /**
   * Returns a boolean indicating whether the given credentials
   * are valid.
   *
   * @param email - The user's email
   * @param password - The user's password
   * @returns A Promise with a boolean set to true if the credentials are valid.
   */
  private async areCredentialsValid(email: string, password: string): Promise<boolean> {
    const user = await this.user.findOne(email);

    if (!user) {
      throw new UserNotFoundError(`User ${email} was not found`);
    }

    return bcrypt.compare(password, user.password);
  }

  /**
   * Creates a User if not exists.
   *
   * @param email - The user's email
   * @param password - The user's password
   * @returns A Promise with the created User
   */
  async createUser(email: string, password: string): Promise<User> {
    const validEmailSchema = Joi.string().email().required();
    await validEmailSchema.validateAsync(email);
    const encryptedPassword = await bcrypt.hash(password, 10);
    return this.user.create(email, encryptedPassword);
  }

  /**
   * Creates a Session if the given credentials are valid.
   *
   * @param email - The user's email
   * @param password - The user's password
   * @returns A Promise with the created Session
   */
  async authenticate(email: string, password: string): Promise<Session> {
    const areCredentialsValid = await this.areCredentialsValid(email, password);
    if (areCredentialsValid) {
      return this.session.create(email);
    }
    throw new InvalidCredentialsError('Authentication credentials are invalid');
  }

  /**
   * Returns the Session identified by the sessionId parameter
   * if it exists.
   *
   * @param sessionId - The session Id
   * @returns A Promise with the Session if it exists
   */
  async authorize(sessionId: string): Promise<Session | undefined> {
    return this.session.findOne(sessionId);
  }
}

/**
 * Returns an IdentityService instance once the repositories
 * it uses are instanciated in their respective factories.
 *
 * @returns A Promise with an IdentityService instance
 */
export async function getIdentityService(): Promise<IdentityService> {
  const userRepository = await UserRepositoryFactory.getUserRepository();
  const sessionRepository = await SessionRepositoryFactory.getSessionRepository();
  return new IdentityService(userRepository, sessionRepository);
}

export default IdentityService;
