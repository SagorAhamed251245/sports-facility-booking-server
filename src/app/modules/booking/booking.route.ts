import { Router } from 'express';

import { IsAuthenticate } from '../../middlewares/IsAuthenticate';
import validateRequest from '../../middlewares/validateRequest';
import createBookingValidationSchema from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = Router();

router.post(
  '/',
  IsAuthenticate.auth,
  IsAuthenticate.userOnly,
  validateRequest(createBookingValidationSchema),
  BookingControllers.createBooking,
);

export const BookingRoutes = router;
