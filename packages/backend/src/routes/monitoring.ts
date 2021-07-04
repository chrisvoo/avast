import {
  Router, Response, Request, NextFunction,
} from 'express';
import { waitForPromise } from '../utils/waitForPromise';
import { redisClient } from '../libs/redisClient';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const client = await redisClient();

  waitForPromise(client.get('1_1'), 2000)
    .then(() => res.json({ status: 'OK' }))
    .catch((e: Error) => res.json({ error: true, description: e.message }));
});

export default router;
