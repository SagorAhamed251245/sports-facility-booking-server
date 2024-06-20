/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../modules/user/user.model';
import { TUser } from '../modules/user/user.interface';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.header('Authorization');
    if (!headers) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'No Headers found'));
    }
    const token = headers.replace('Bearer ', '');
    if (!token) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'No token provided'));
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded._id).exec();

    if (!user) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'Invalid token'));
    }

    req.user = user.toObject() as TUser;
    next();
  } catch (error) {
    next(new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
  }
};

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError(httpStatus.FORBIDDEN, 'Access denied'));
  }
  next();
};

const userOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'user') {
    return next(new AppError(httpStatus.FORBIDDEN, 'Access denied'));
  }
  next();
};

export const IsAuthenticate = {
  auth,
  adminOnly,
  userOnly,
};
