import { Router } from 'express';
import GetImages from '../../controllers/Image/GetImages';
import GetImage from '../../controllers/Image/GetImage';
import UpdateImage from '../../controllers/Image/UpdateImage';
import DeleteImage from '../../controllers/Image/DeleteImage';
import UploadImage from '../../controllers/Image/UploadImage';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Images
router.get('/', GetImages);

// Get Image
router.get('/:id', GetImage);

// Post Image
router.post('/', IsAuthenticated, UploadImage);

// Put Image
router.put('/:id',IsAuthenticated, UpdateImage);

// Delete Image
router.delete('/:id',IsAuthenticated, DeleteImage);

export default router;
