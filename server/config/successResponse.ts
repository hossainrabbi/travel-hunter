import { Response } from 'express';

// success response message
export function successResponse(res: Response, status: number, data: any) {
  res.status(status).json({
    status: {
      code: status,
      message: 'ok',
    },
    data: data,
  });
}
