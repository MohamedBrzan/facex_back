import { Router } from 'express';
import GetReels from '../../controllers/Reel/GetReels';
import GetReel from '../../controllers/Reel/GetReel';
import UpdateReel from '../../controllers/Reel/UpdateReel';
import DeleteReel from '../../controllers/Reel/DeleteReel';
import CreateReel from '../../controllers/Reel/CreateReel';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import AddAndRemoveExpression from '../../controllers/Reel/AddAndRemoveExpression';
import AddView from '../../controllers/Reel/AddView';
import DeleteView from '../../controllers/Reel/DeleteView';
import ToggleShareReel from '../../controllers/Reel/ToggleShareReel';
import ToggleSaveReel from '../../controllers/Reel/ToggleSaveReel';

const router = Router();

// Get Reels
router.get('/', GetReels);

// Get Reel
router.get('/:id', GetReel);

// Create Reel
router.post('/create', IsAuthenticated, CreateReel);

// Add and Delete Expression for Reels
router.patch('/expressions/toggle', IsAuthenticated, AddAndRemoveExpression);

// Toggle Share Reel
router.patch('/share', IsAuthenticated, ToggleShareReel);

// Toggle Save Reel
router.patch('/save', IsAuthenticated, ToggleSaveReel);

// Update Reel
router.put('/update', IsAuthenticated, UpdateReel);

// Add Reel View
router.patch('/views/add', IsAuthenticated, AddView);

// Delete Reel View
router.patch('/views/del', IsAuthenticated, DeleteView);

// Delete Reel
router.delete('/del', IsAuthenticated, DeleteReel);

export default router;
