import { Router } from 'express';
import GetVideos from '../../controllers/Video/GetVideos';
import GetVideo from '../../controllers/Video/GetVideo';
import UpdateVideo from '../../controllers/Video/UpdateVideo';
import DeleteVideo from '../../controllers/Video/DeleteVideo';
import UploadVideo from '../../controllers/Video/UploadVideo';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import ToggleShareVideo from '../../controllers/Video/ToggleShareVideo';
import ToggleSaveVideo from '../../controllers/Video/ToggleSaveVideo';

const router = Router();

// Get Videos
router.get('/', GetVideos);

// Get Video
router.get('/:id', GetVideo);

// Post Video
router.post('/', IsAuthenticated, UploadVideo);

// Toggle Share Video
router.patch('/share', IsAuthenticated, ToggleShareVideo);

// Toggle Save Video
router.patch('/save', IsAuthenticated, ToggleSaveVideo);

// Put Video
router.put('/update', IsAuthenticated, UpdateVideo);

// Delete Video
router.delete('/del', IsAuthenticated, DeleteVideo);

export default router;
