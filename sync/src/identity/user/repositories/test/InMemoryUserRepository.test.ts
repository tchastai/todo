import InMemoryUserRepository from '../InMemoryRepository';
import { DuplicateRessourceError } from '../../../../helpers/errors';

describe('InMemoryUserRepository class', () => {
  const sampleUser = { email: 'user@example.com', password: 'secret' };

  test('It should create an user', async () => {
    const storageObject = { users: [] };
    const userRepository = new InMemoryUserRepository(storageObject);

    await userRepository.create(sampleUser.email, sampleUser.password);
    expect(storageObject).toEqual({ users: [sampleUser] });
  });

  test('It should find a user given its email', async () => {
    const storageObject = { users: [sampleUser] };
    const userRepository = new InMemoryUserRepository(storageObject);

    expect(await userRepository.findOne(sampleUser.email)).toBe(sampleUser);
  });

  test('It should throw if a user with the same email already exists', async () => {
    const storageObject = { users: [sampleUser] };
    const userRepository = new InMemoryUserRepository(storageObject);

    async function createUserWrapper() {
      await userRepository.create(sampleUser.email, sampleUser.password);
    }

    expect(createUserWrapper()).rejects.toThrowError(DuplicateRessourceError);
  });
});
