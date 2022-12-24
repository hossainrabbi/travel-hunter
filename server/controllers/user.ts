import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { successResponse } from '../config/response';
import User from '../models/User';

// get all users
export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find();

    // forward data in ./config/response.ts for success response
    successResponse(res, 200, { users });
  } catch (err) {
    next(err);
  }
}

// get single user
export async function getSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      throw createError(404, 'user not found');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw createError(404, 'user not found');
    }

    // forward data in ./config/response.ts for success response
    successResponse(res, 200, { user });
  } catch (err) {
    next(err);
  }
}
