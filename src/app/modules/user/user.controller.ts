import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
