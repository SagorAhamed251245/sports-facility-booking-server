import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { facilityValidations } from './facility.validation';
import { FacilityControllers } from './facility.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(facilityValidations.createFacilityValidationSchema),
  FacilityControllers.createFacility,
);

export const facilityRoutes = router;
