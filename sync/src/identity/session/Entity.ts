import { randomBytes, createHash } from 'crypto';

class Session {
  id: string;
  email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  /**
   * Returns an unpredictable random id to be used for session identifiers.
   *
   * @param email - The user's email
   * @returns A 128 bits random string
   *
   * @beta
   */
  static generateId(email: string): string {
    const randomNumber = randomBytes(16).toString('hex');
    const timestamp = new Date();
    return createHash('sha256')
      .update(JSON.stringify({ email, randomNumber, timestamp }))
      .digest('base64');
  }
}

export default Session;
