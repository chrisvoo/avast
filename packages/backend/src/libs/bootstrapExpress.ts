import express, {
  Request, Response, NextFunction,
} from 'express';
import cors from 'cors';
import { Server } from 'http';
import compression from 'compression';
import { ExpressApp } from '../types';
import shouldCompress from '../utils/shouldCompress';
import monitoring from '../routes/monitoring';
import notFound from '../routes/notFound';
import photo from '../routes/photo';

/**
   * It sets up the express server with all the required middlewares.
   * @returns {Promise<ExpressApp>}
   */
export default function bootstrapExpress(): Promise<ExpressApp> {
  return new Promise<ExpressApp>((resolve, _reject) => {
    const app = express();
    const port = process.env.PORT ?? 3001;

    app.disable('x-powered-by');
    app.use(compression({ filter: shouldCompress }));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());

    app.use('/monitoring', monitoring);
    app.use('/', photo);
    app.use(notFound);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(`Error middleware: ${err.message}`);
      const statusCode = res.statusCode || 500;
      res.status(statusCode).json({
        error: true,
        description: 'An unexpected error happened!',
      });
    });

    const server: Server = app.listen(port, () => {
      console.log(`server is running in http://localhost:${port}`);
      resolve({ server, app });
    });
  });
}
