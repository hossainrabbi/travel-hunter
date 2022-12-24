import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../config/response';
import User from '../models/User';
import createError from 'http-errors';

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

    // generate token from User models
    const token = newUser.generateToken(newUser._id);

    // forward data in ./config/response.ts for success response
    successResponse(res, 201, { token });
  } catch (err) {
    next(err);
  }
}

// login auth
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, mobile, password } = req.body;

    const user = await User.findOne({
      $or: [
        {
          username,
        },
        { mobile },
      ],
    });

    if (!user) {
      throw createError(404, 'invalid credentials');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw createError(404, 'invalid credentials');
    }

    // generate token from User models
    const token = user.generateToken(user._id);

    // forward data in ./config/response.ts for success response
    successResponse(res, 200, { token });
  } catch (err) {
    next(err);
  }
}
