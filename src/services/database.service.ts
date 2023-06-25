// External Dependencies
import * as mongoDB from "mongodb";
import config from "../config/config";
// Global Variables
export const collections: { users?: mongoDB.Collection } = {}
// Initialize Connection
export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.ATLAS_URI);

    await client.connect();

    const db: mongoDB.Db = client.db(config.DB_NAME);

    const usersCollection: mongoDB.Collection = db.collection(config.USERS_COLLECTION_NAME);

    collections.users = usersCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}