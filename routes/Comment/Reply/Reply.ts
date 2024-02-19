import { Router } from 'express';
import IsAuthenticated from '../../../middleware/IsAuthenticated';
import GetReplies from '../../../controllers/Comment/Reply/GetReplies';
import CreateReply from '../../../controllers/Comment/Reply/CreateReply';
import UpdateReply from '../../../controllers/Comment/Reply/UpdateReply';
import DeleteReply from '../../../controllers/Comment/Reply/DeleteReply';
import GetReply from '../../../controllers/Comment/Reply/GetReply';
import AddAndRemoveExpression from '../../../controllers/Comment/Reply/AddAndRemoveExpression';
const router = Router();

// Get Replies
router.get('/', GetReplies);

// Get Reply
router.get('/:id', GetReply);

// Post Reply
router.post('/create', IsAuthenticated, CreateReply);

// Put Reply
router.patch('/update', IsAuthenticated, UpdateReply);

// Add and Delete Reply Expression
router.patch('/expressions/toggle', IsAuthenticated, AddAndRemoveExpression);

// Delete Reply
router.delete('/del', IsAuthenticated, DeleteReply);

export default router;
