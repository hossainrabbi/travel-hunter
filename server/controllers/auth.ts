import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { successResponse } from '../config/response';
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

    // generate token from User models
    const token = newUser.generateToken(newUser._id);

    // forward data in ./config/response.ts for success response
    successResponse(res, 201, {
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        mobile: newUser.mobile,
        avatar: newUser.avatar,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

// login auth
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [
        {
          username,
        },
        { mobile: username },
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
    successResponse(res, 200, {
      token,
      user: {
        _id: user._id,
        username: user.username,
        mobile: user.mobile,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}
