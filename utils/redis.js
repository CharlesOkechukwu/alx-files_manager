import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this._client = createClient();
    this.conn = true;
    this._client.on('error', (error) => {
      console.log('Connection Failed:', error.message || error.toString());
      this.conn = false;
    });
  }

  isAlive() {
    return this.conn;
  }

  async get(key) {
    const GET = promisify(this._client.GET);
    return GET.call(this._client, key);
  }

  async set(key, value, duration) {
    const SETEX = promisify(this._client.SETEX);
    await SETEX.call(this._client, key, duration, value);
  }

  async del(key) {
    const DEL = promisify(this._client.DEL);
    return DEL.call(this._client, key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
