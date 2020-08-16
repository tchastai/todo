import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';

class InMemoryDatabase {
  server: MongoMemoryServer;
  connection: MongoClient;
  db: Db;

  async setup(): Promise<Db> {
    this.server = new MongoMemoryServer();
    const uri = await this.server.getConnectionString();

    const client = new MongoClient(uri, { useNewUrlParser: true });
    this.connection = await client.connect();
    this.db = this.connection.db();
    return this.db;
  }

  async cleanCollection(collection) {
    await this.db.collection(collection).deleteMany({});
  }

  async teardown() {
    await this.db.dropDatabase();
    await this.connection.close(true);
    return this.server.stop();
  }
}

export default InMemoryDatabase;
