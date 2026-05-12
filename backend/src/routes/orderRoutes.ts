import { Router } from 'express';
import { createOrder, getMyOrders, updateOrderStatus } from '../controllers/orderController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createOrder);
router.get('/my-orders', authenticate, getMyOrders);
router.patch('/:id/status', authenticate, updateOrderStatus);

export default router;