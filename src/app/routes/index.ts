import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { facilityRoutes } from '../modules/facility/facility.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/facility',
    route: facilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
