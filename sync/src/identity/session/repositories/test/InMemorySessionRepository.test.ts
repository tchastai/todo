import InMemorySessionRepository from '../InMemoryRepository';
import { SessionExpiredError } from '../Repository';
import Session from '../../Entity';

describe('InMemorySessionRepository class', () => {
  const dateMockValue = new Date();

  beforeAll(() => {
    //  Override the generateId function because it is non-deterministic
    jest.spyOn(Session, 'generateId').mockReturnValue('test');
    jest
      .spyOn(InMemorySessionRepository.prototype, 'getCreationDate')
      .mockReturnValue(dateMockValue);
  });

  const sampleSession = {
    id: 'test',
    email: 'user@example.com',
    createdAt: dateMockValue,
  };

  test('It should create a session', async () => {
    const storageObject = { sessions: [] };
    const sessionRepository = new InMemorySessionRepository(storageObject);

    await sessionRepository.create(sampleSession.email);
    expect(storageObject).toMatchObject({
      sessions: [sampleSession],
    });
  });

  test('It should find a session given its id', async () => {
    const storageObject = { sessions: [sampleSession] };
    const sessionRepository = new InMemorySessionRepository(storageObject);

    expect(await sessionRepository.findOne(sampleSession.id)).toBe(sampleSession);
  });

  test('It should throw if the session expired', async () => {
    const expiredSession = new Date(0);

    const storageObject = { sessions: [{ ...sampleSession, createdAt: expiredSession }] };
    const sessionRepository = new InMemorySessionRepository(storageObject);

    async function findSessionWrapper() {
      await sessionRepository.findOne(sampleSession.id);
    }

    expect(findSessionWrapper()).rejects.toThrowError(SessionExpiredError);
  });
});
