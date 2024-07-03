import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || '27017';
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
    const CONN = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = new MongoClient(CONN);
    this.isconn = async () => {
      try {
        await this.client.connect();
        this.db = this.client.db(DB_DATABASE);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
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
