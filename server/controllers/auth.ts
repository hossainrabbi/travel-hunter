import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../config/successResponse';
import User from '../models/User';

// register auth
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.find();

    let newUser = new User({
      ...req.body,
    });

    // if user not exist then first user is admin
    if (user.length === 0) {
      newUser.role = 'admin';
    }

    newUser = await newUser.save();

    // forward data in ./config/successResponse.ts
    successResponse(res, 201, newUser);
  } catch (err) {
    next(err);
  }
}

// login auth
export function login(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({
      message: 'll',
    });
  } catch (err) {
    next(err);
  }
}
