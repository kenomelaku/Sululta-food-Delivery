import { Router } from 'express';
import { getAllRestaurants, getRestaurantDetails, createRestaurant } from '../controllers/restaurantController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantDetails);
router.post('/', authenticate, authorize(['ADMIN', 'RESTAURANT']), createRestaurant);

export default router;