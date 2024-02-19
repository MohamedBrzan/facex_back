import { Router } from 'express';
import GetAds from '../../controllers/Ad/GetAds';
import GetAd from '../../controllers/Ad/GetAd';
import UpdateAd from '../../controllers/Ad/UpdateAd';
import DeleteAd from '../../controllers/Ad/DeleteAd';
import CreateAd from '../../controllers/Ad/CreateAd';
import IsAuthenticated from '../../middleware/IsAuthenticated';

const router = Router();

// Get Ads
router.get('/', GetAds);

// Get Ad
router.get('/:id', GetAd);

// Post Ad
router.post('/', IsAuthenticated, CreateAd);

// Put Ad
router.put('/:id', IsAuthenticated, UpdateAd);

// Delete Ad
router.delete('/:id', IsAuthenticated, DeleteAd);

export default router;
