import { Types } from 'mongoose';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import Facility from '../facility/facility.model';
import httpStatus from 'http-status';
import { TBooking } from './booking.interface';

const createNewBookingIntoDB = async (
  userId: string | Types.ObjectId,
  payload: TBooking,
) => {
  const { date, startTime, endTime, facility } = payload;

  const ExistedFacility = await Facility.findById(facility);

  if (!ExistedFacility || ExistedFacility.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }
  const pricePerHour = ExistedFacility.pricePerHour;
  const startDate = new Date(date + 'T' + startTime);
  const endDate = new Date(date + 'T' + endTime);
  const durationInHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationInHours * pricePerHour;

  const conflictingBooking = await Booking.findOne({
    facility: new Types.ObjectId(facility),
    date,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  if (conflictingBooking) {
    throw new Error(
      'The facility is unavailable during the requested time slot.',
    );
  }

  const result = await Booking.create({
    facility,
    date,
    startTime,
    endTime,
    user: userId,
    payableAmount,
  });

  return result;
};

export const BookingServices = {
  createNewBookingIntoDB,
};
