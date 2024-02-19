import { Router } from 'express';
import GetComments from '../../controllers/Comment/GetComments';
import CreateComment from '../../controllers/Comment/CreateComment';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import DeleteComment from '../../controllers/Comment/DeleteComment';
import UpdateComment from '../../controllers/Comment/UpdateComment';
import GetComment from '../../controllers/Comment/GetComment';
import AddAndRemoveExpression from '../../controllers/Comment/AddAndRemoveExpression';
const router = Router();

// Get Comments
router.get('/', GetComments);

// Post Comment
router.post('/create', IsAuthenticated, CreateComment);

// Put Comment
router.patch('/update', IsAuthenticated, UpdateComment);

// Add and Delete Comment Expression
router.patch('/expressions/toggle', IsAuthenticated, AddAndRemoveExpression);

// Delete Comment
router.delete('/del', IsAuthenticated, DeleteComment);
// Get Comment
router.get('/:id', GetComment);

export default router;
