import axios, { AxiosResponse } from 'axios';
import { redisClient } from '../libs/redisClient';
import { Photo } from '../types';

/**
 * Stores a JSON list of objects represeting photoes and thumbnails into Redis.
 */
export async function loadData(): Promise<void> {
  const client = await redisClient();
  const response: AxiosResponse<Photo[]> = await axios.get('https://jsonplaceholder.typicode.com/photos');

  const promises: Promise<unknown>[] = [];
  response.data.forEach((photo) => {
    const { albumId, id } = photo;
    promises.push(
      client.set(`${id}_${albumId}`, JSON.stringify(photo)),
    );
  });

  const res = await Promise.all(promises);
  console.log(`Loaded ${res.length} photoes`);
}
