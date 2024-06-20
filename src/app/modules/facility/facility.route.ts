import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { facilityValidations } from './facility.validation';
import { FacilityControllers } from './facility.controller';
import { IsAuthenticate } from '../../middlewares/IsAuthenticate';

const router = express.Router();

router.post(
  '/',
  IsAuthenticate.auth,
  IsAuthenticate.adminOnly,
  validateRequest(facilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

export const facilityRoutes = router;
