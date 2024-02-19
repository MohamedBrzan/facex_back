import { Router } from 'express';
import GetPosts from '../../controllers/Post/GetPosts';
import GetPost from '../../controllers/Post/GetPost';
import CreatePost from '../../controllers/Post/CreatePost';
import AddAndRemoveExpression from '../../controllers/Post/AddAndRemoveExpression';
import UpdatePost from '../../controllers/Post/UpdatePost';
import DeletePost from '../../controllers/Post/DeletePost';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import ToggleSharePost from '../../controllers/Post/ToggleSharePost';
import ToggleSavePost from '../../controllers/Post/ToggleSavePost';

const router = Router();

// Get Posts
router.get('/', GetPosts);

// Get Post
router.get('/:id', GetPost);

// Create Post
router.post('/create', IsAuthenticated, CreatePost);

// Add and Delete Expression for Posts
router.patch('/expressions/toggle', IsAuthenticated, AddAndRemoveExpression);

// Toggle Share Post
router.patch('/share', IsAuthenticated, ToggleSharePost);

// Toggle Save Post
router.patch('/save', IsAuthenticated, ToggleSavePost);

// Update Post
router.patch('/update', IsAuthenticated, UpdatePost);

// Delete Post
router.delete('/del', IsAuthenticated, DeletePost);

export default router;
