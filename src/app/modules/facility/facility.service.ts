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

const UpdateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const facility = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log('🚀 ~ facility:', facility);

  if (!facility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Updated facility');
  }
  return facility;
};
export const FacilityServices = {
  createFacilityIntoDB,
  UpdateFacilityIntoDB,
};
