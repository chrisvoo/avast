import { redisClient } from '../libs/redisClient';
import {
  PhotoRequest, PhotoList,
} from '../types';

/**
 * Recursively calls the SCAN function until there are no more data to scan
 * @param {string} pattern Regexp pattern for SCAN
 * @param {string} cursor Redis cursor for SCAN
 * @param {number} count Limits the SCAN result at every iteration
 * @param {string[]} storeResults The array that stores our results
 * @returns {string[]} A list with all the keys matching the specified pattern
 */
export const recursiveScan = async (
  pattern: string,
  cursor: string = '0',
  count: number = 100,
  storeResults: string[] = [],
): Promise<string[]> => {
  const client = await redisClient();
  const [nextCursor, records] = await client.scan(cursor, pattern, count);

  storeResults.push(...records);

  if (nextCursor === '0') {
    return storeResults;
  }

  return recursiveScan(pattern, nextCursor, count, storeResults);
};

/**
   * Shared function for listing items as response.
   * @param {Request} req Express request.
   * @param {string} pattern A regexp pattern accepted by SCAN
   * @returns {Promise<PhotoList>}
   */
export async function listItems(req: PhotoRequest, pattern: string): Promise<PhotoList> {
  const { cursor = '0', limit = 10 } = req.query;
  const client = await redisClient();

  const [nextCursor, records] = await client.scan(cursor, pattern, limit);

  const promises: Promise<string | null>[] = [];

  records.forEach((key) => {
    promises.push(client.get(key));
  });

  const result = await Promise.all(promises);
  return {
    cursor: nextCursor,
    data: result.map((i) => (i ? JSON.parse(i) : null)),
  };
}
