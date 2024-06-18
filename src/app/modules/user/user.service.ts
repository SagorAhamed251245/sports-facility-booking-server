/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';
import { createToken } from '../../utils/createToken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  try {
    const user = await User.create(payload);

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
};

const loginAsPreUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User not found using this email',
    );
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid  password');
  }

  const token = createToken(
    { ...user, _id: JSON.stringify(user._id) },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token,
    data: user,
  };
};
export const UserServices = {
  createUserIntoDB,
  loginAsPreUser,
};
