import { Router } from 'express';
import GetAlbums from '../../controllers/Album/GetAlbums';
import GetAlbum from '../../controllers/Album/GetAlbum';
import UpdateAlbum from '../../controllers/Album/UpdateAlbum';
import CreateAlbum from '../../controllers/Album/CreateAlbum';
import DeleteAlbum from '../../controllers/Album/DeleteAlbum';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Albums
router.get('/', GetAlbums);

// Get Album
router.get('/:id', GetAlbum);

// Post Album
router.post('/', IsAuthenticated, CreateAlbum);

// Put Album
router.put('/:id', IsAuthenticated, UpdateAlbum);

// Delete Album
router.delete('/:id', IsAuthenticated, DeleteAlbum);

export default router;
