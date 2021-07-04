import redis, { ClientOpts, RedisClient } from 'redis';
import { promisify } from 'util';

export interface RedisWrapper {
    get: (key: string) => Promise<string | null>
    set: (key: string, value: string) => Promise<unknown>
    keys: (pattern: string) => Promise<string[] | undefined>
    scan: (cursor: string, pattern: string, limit: number) => Promise<[string, string[]]>,
    end: (flush: boolean) => void,
    quit: () => Promise<'OK'>
}

/**
 * Creates a client for Redis. Here we use the anti-pattern of serializing the JSON.
 * In a real world scenario, it'd be better using RedisJSON module.
 * @see https://redislabs.com/redis-best-practices/data-storage-patterns/json-storage/
 * @param {ClientOpts} options Optiosn for creating a client with node-redis
 * @returns {RedisWrapper}
 */
export function redisClient(options?: ClientOpts): Promise<RedisWrapper> {
  return new Promise((resolve, reject) => {
    const client: RedisClient = redis.createClient({
      url: options?.url ?? process.env.REDIS_URL,
    });

    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    const keysAsync = promisify(client.keys).bind(client);
    const scanAsync = promisify(client.scan).bind(client);
    const quitAsync = promisify(client.quit).bind(client);

    const wrapper: RedisWrapper = {
      get: (key: string) => getAsync(key),
      set: (key: string, value: string) => setAsync(key, value),
      keys: (pattern: string) => keysAsync(pattern),
      // @ts-ignore
      scan: (cursor: string, pattern: string, limit: number) => scanAsync(cursor, 'MATCH', pattern, 'COUNT', limit),
      end: (flush: boolean) => client.end(flush),
      quit: () => quitAsync(),
    };

    client.on('ready', () => resolve(wrapper));
    client.on('error', (e) => reject(e.message));
  });
}
