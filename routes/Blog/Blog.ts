import { Router } from 'express';
import GetBlogs from '../../controllers/Blog/GetBlogs';
import GetBlog from '../../controllers/Blog/GetBlog';
import UpdateBlog from '../../controllers/Blog/UpdateBlog';
import DeleteBlog from '../../controllers/Blog/DeleteBlog';
import CreateBlog from '../../controllers/Blog/CreateBlog';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import AddAndRemoveExpression from '../../controllers/Blog/AddAndRemoveExpression';
import AddView from '../../controllers/Blog/AddView';
import DeleteView from '../../controllers/Blog/DeleteView';
import ToggleShareBlog from '../../controllers/Blog/ToggleShareBlog';
import ToggleSaveBlog from '../../controllers/Blog/ToggleSaveBlog';

const router = Router();

// Get Blogs
router.get('/', GetBlogs);

// Get Blog
router.get('/:id', GetBlog);

// Create Blog
router.post('/create', IsAuthenticated, CreateBlog);

// Add and Delete Expression for Blogs
router.patch('/expressions/toggle', IsAuthenticated, AddAndRemoveExpression);

// Toggle Share Blog
router.patch('/share', IsAuthenticated, ToggleShareBlog);

// Toggle Save Blog
router.patch('/save', IsAuthenticated, ToggleSaveBlog);

// Update Blog
router.put('/update', IsAuthenticated, UpdateBlog);

// Add Blog View
router.patch('/views/add', IsAuthenticated, AddView);

// Delete Blog View
router.patch('/views/del', IsAuthenticated, DeleteView);

// Delete Blog
router.delete('/del', IsAuthenticated, DeleteBlog);

export default router;
