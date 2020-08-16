export class DuplicateRessourceError extends Error {
  public status: number;

  constructor(message = '') {
    super(message);
    this.message = message;
    this.name = 'DuplicateRessourceError';
    this.status = 409;
  }
}
