import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export function isAuth(req: Request, _res: Response, next: NextFunction) {
  let token = req.headers.authorization;
  try {
    if (!token?.startsWith('Bearer')) {
      throw createError('invalid token');
    }

    token = token.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      throw createError('invalid token');
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
}
