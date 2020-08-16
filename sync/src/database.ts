import { MongoClient, Db } from 'mongodb';

export async function getDatabase(name?: string, mongoURL?: string): Promise<Db> {
  const databaseName = name || process.env.MONGODB_DATABASE_NAME;
  const databaseURI = mongoURL || process.env.MONGODB_URL;
  if (!databaseURI || !databaseName) {
    throw new Error('Missing environment variables required for configuring MongoDB');
  }

  const client = new MongoClient(databaseURI);
  const connection = await client.connect();
  return connection.db(databaseName);
}
