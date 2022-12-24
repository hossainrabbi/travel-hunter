import { Response } from 'express';

// success response message
export function successResponse(res: Response, status: number, data: any) {
  res.status(status).json({
    status: {
      code: status,
      message: 'ok',
    },
    data,
  });
}

// error response message
export function errorResponse(res: Response, status: number, errors: any) {
  res.status(status).json({
    status: {
      code: status,
      message: 'error occurred',
    },
    errors,
  });
}
