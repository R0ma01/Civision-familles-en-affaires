import { MongoClient, Db } from 'mongodb';

// Connection URI
const { MONGO_DB_URI, MONGO_DB_NAME } = process.env;

// Singleton MongoClient
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = new MongoClient(MONGO_DB_URI || '');

    await client.connect();
    const db = client.db(MONGO_DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}
