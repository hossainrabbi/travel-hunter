import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { errorResponse } from '../../config/response';

// not found handler
export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404, 'Your requested content was not found!'));
}

// global error handler
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // forward data in ./config/response.ts for errors message
  errorResponse(res, err.status || 500, {
    message: err.message || 'Internal Server Error!',
  });
};
