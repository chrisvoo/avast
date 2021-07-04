import compression from 'compression';
import { Request, Response } from 'express';

/**
 * A middleware to apply compression on client's demand
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {boolean} if false, compression won't be applied to this request
 */
export default function shouldCompress(req: Request, res: Response) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
