import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import createError from 'http-errors';
import { errorResponse } from '../../config/response';
import User from '../../models/User';

// validation users
export const validationUser = [
  check('username')
    .notEmpty()
    .withMessage('username is required!')
    .isLength({ min: 3 })
    .withMessage('username is minimum 3 character ')
    .custom(async (value) => {
      try {
        const data = await User.findOne({ username: value });
        if (data) {
          throw createError(400, 'username already exist');
        }
      } catch (err) {
        throw createError(err as Error);
      }
    }),
  check('mobile')
    .notEmpty()
    .withMessage('mobile is required!')
    .isMobilePhone('bn-BD', {
      strictMode: true,
    })
    .withMessage('please provide a valid bangladeshi mobile number!')
    .custom(async (value) => {
      try {
        const data = await User.findOne({ mobile: value });
        if (data) {
          throw createError(400, 'mobile number already used!');
        }
      } catch (err) {
        throw createError(err as Error);
      }
    }),
  check('password')
    .notEmpty()
    .withMessage('password is required!')
    .isLength({ min: 4, max: 30 })
    .withMessage('password is minimum 4 character and maximum 30 characters!'),
];

// validate user
export function validateUser(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req).mapped();

  if (Object.keys(errors).length === 0) {
    return next();
  }

  // forward data in ./config/response.ts for errors message
  errorResponse(res, 400, errors);
}
