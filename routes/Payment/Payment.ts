import { Router } from 'express';
import GetPayments from '../../controllers/Payment/GetPayments';
import GetPayment from '../../controllers/Payment/GetPayment';
import UpdatePayment from '../../controllers/Payment/UpdatePayment';
import DeletePayment from '../../controllers/Payment/DeletePayment';
import CreatePayment from '../../controllers/Payment/CreatePayment';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Payments
router.get('/', GetPayments);

// Get Payment
router.get('/:id', GetPayment);

// Post Payment
router.post('/', IsAuthenticated, CreatePayment);

// Put Payment
router.put('/:id',IsAuthenticated, UpdatePayment);

// Delete Payment
router.delete('/:id',IsAuthenticated, DeletePayment);

export default router;
