import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { FacilityServices } from './facility.service';

export const createFacility = catchAsync(async (req, res) => {
  const facilityData = req.body;
  console.log('🚀 ~ createFacility ~ facilityData:', facilityData);

  const result = await FacilityServices.createFacilityIntoDB(facilityData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});
export const FacilityControllers = {
  createFacility,
};
