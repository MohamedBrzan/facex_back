import { Router } from 'express';
import GetNotifications from '../../controllers/Notification/GetNotifications';
import GetNotification from '../../controllers/Notification/GetNotification';
import UpdateNotification from '../../controllers/Notification/UpdateNotification';
import CreateNotification from '../../controllers/Notification/CreateNotification';
import DeleteNotification from '../../controllers/Notification/DeleteNotification';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Notifications
router.get('/', GetNotifications);

// Get Notification
router.get('/:id', GetNotification);

// Post Notification
router.post('/', IsAuthenticated, CreateNotification);

// Put Notification
router.put('/:id', IsAuthenticated,UpdateNotification);

// Delete Notification
router.delete('/:id', IsAuthenticated,DeleteNotification);

export default router;
