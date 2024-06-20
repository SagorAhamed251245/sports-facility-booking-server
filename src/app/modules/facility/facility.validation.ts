import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    pricePerHour: z.number().positive(),
    location: z.string().min(1),
  }),
});
export const facilityValidations = {
  createFacilityValidationSchema,
};
