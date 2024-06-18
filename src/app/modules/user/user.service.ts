/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  try {
    // create a user (transaction-1)
    const user = await User.create(payload); // array

    //create a student
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const UserServices = {
  createUserIntoDB,
};
