import {
  Router, Response, Request, NextFunction,
} from 'express';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: true,
    description: 'Route not found',
  });
});

export default router;
