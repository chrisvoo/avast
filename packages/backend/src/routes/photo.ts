import {
  Router, Response, Request, NextFunction,
} from 'express';
import { redisClient } from '../libs/redisClient';
import { PhotoRequest, PhotoesParams } from '../types';
import { listItems, recursiveScan } from '../utils/redisUtils';

const router = Router();

/*
 * The following route supports the pagination, whose parameters can be specified
 * in the query string.
 * The photoes keys are stored as <PHOTOID_ALBUMID>
 */
router.get('/photoes', async (
  req: PhotoRequest,
  res: Response,
  next: NextFunction,
) => {
  const result = await listItems(req, '[0-9]*_[0-9]*');
  res.json(result);
});

/*
 * Here we immediately return all the photoes of a specific album. We do not support pagination,
 * just for simplicity. Pagination could be manually implemented making use of slice and 1-based
 * pages, something like: data.slice((page_number - 1) * page_size, page_number * page_size).
 * The photoes keys are stored as <PHOTOID_ALBUMID>
 */
router.get('/photoes/album/:id', async (
  req: Request<PhotoesParams, {}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const client = await redisClient();

  if (!id) {
    res.json({
      error: true,
      description: 'Missing ID parameter',
    });
    return;
  }

  const photoKeys = await recursiveScan(`[0-9]*_${id}`);

  const promises: Promise<string | null>[] = [];

  photoKeys.forEach((key) => {
    promises.push(client.get(key));
  });

  const result = await Promise.all(promises);
  res.json(result.map((i) => (i ? JSON.parse(i) : null)));
});

/*
 * Just returns a specific object by its key.
 * The photoes keys are stored as <PHOTOID_ALBUMID>
 */
router.get('/photo/:id', async (
  req: Request<PhotoesParams, {}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const client = await redisClient();

  if (!id) {
    res.json({
      error: true,
      description: 'Missing ID parameter',
    });
    return;
  }

  const photo = await client.get(id) as string;
  res.json(JSON.parse(photo));
});

export default router;
