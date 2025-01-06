import { Router } from 'express';
import routeController from '../controllers/routeController';

const router = Router();

router.post('/optimize', routeController.optimizeRoute);

router.post('/cost', routeController.calculateFuelCost);

router.post('/traffic', routeController.getTrafficConditions);

export default router;
