import httpStatus from 'http-status';
import Facility from './facility.model';
import AppError from '../../errors/AppError';
import { TFacility } from './facility.interface';

const createFacilityIntoDB = async (payload: TFacility) => {
  const user = await Facility.create(payload);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  return user;
};
export const FacilityServices = {
  createFacilityIntoDB,
};
