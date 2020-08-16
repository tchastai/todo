import InMemoryListRepository from '../InMemoryRepository';

describe('InMemoryListRepository class', () => {
  const sampleDocument = { userEmail: 'user@example.com', lists: [{ tasks: [{}] }] };

  it("It should create a user's lists if it doesn't exist", async () => {
    const storageObject = { lists: [] };
    const listRepository = new InMemoryListRepository(storageObject);

    await listRepository.upsert(sampleDocument.userEmail, sampleDocument.lists);
    expect(storageObject).toEqual({ lists: [sampleDocument] });
  });

  it("It should upsert a user's lists if it exists", async () => {
    const storageObject = { lists: [] };
    const listRepository = new InMemoryListRepository(storageObject);

    const update = { userEmail: 'user@example.com', lists: [{ tasks: [{}, {}] }] };

    const expectedResult = {
      lists: [{ userEmail: 'user@example.com', lists: [{ tasks: [{}, {}] }] }],
    };

    await listRepository.upsert(update.userEmail, update.lists);
    expect(storageObject).toEqual(expectedResult);
  });

  it("It should find a user's lists given its email", async () => {
    const storageObject = { lists: [sampleDocument] };
    const listRepository = new InMemoryListRepository(storageObject);

    async function getUserLists() {
      return await listRepository.findOne(sampleDocument.userEmail);
    }

    expect(getUserLists()).resolves.toEqual(sampleDocument);
  });
});
