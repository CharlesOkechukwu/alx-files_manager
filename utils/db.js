import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || '27017';
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
    const CONN = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = new MongoClient(CONN);
    this.isconn = false;
    (async () => {
      try {
        await this.client.connect();
        this.isconn = true;
        this.db = this.client.db(DB_DATABASE);
        await this.db.collection('users').createIndex({ email: 1 }, { unique: true });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  isAlive() {
    return this.isconn;
  }

  async nbUsers(query = {}) {
    return this.db.collection('users').countDocuments(query);
  }

  async nbFiles(query = {}) {
    return this.db.collection('files').countDocuments(query);
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
