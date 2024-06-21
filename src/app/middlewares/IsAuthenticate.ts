/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../modules/user/user.model';
import { TUser } from '../modules/user/user.interface';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import config from '../config';
import sendResponse from '../utils/sendResponse';

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
    // console.log('🚀 ~ auth ~ headers:', headers);
    if (!headers) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'No Headers found'));
    }
    const token = headers.replace('Bearer ', '');
    // console.log('🚀 ~ auth ~ token:', token);

    if (!token) {
      return next(new AppError(httpStatus.BAD_REQUEST, 'No token provided'));
    }

    const decoded: any = jwt.verify(token, config.jwt_access_secret!);

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
    sendResponse(res, {
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }
  next();
};

const userOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'user') {
    sendResponse(res, {
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }
  next();
};

export const IsAuthenticate = {
  auth,
  adminOnly,
  userOnly,
};
