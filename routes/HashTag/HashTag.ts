import { Router } from 'express';
import GetHashTags from '../../controllers/Hashtag/GetHashtags';
import GetHashTag from '../../controllers/Hashtag/GetHashtag';
import UpdateHashTag from '../../controllers/Hashtag/UpdateHashtag';
import CreateHashTag from '../../controllers/Hashtag/CreateHashtag';
import IsAuthenticated from '../../middleware/IsAuthenticated';
import FollowHashTag from '../../controllers/Hashtag/FollowHashtag';
import DeleteCreatedHashTag from '../../controllers/Hashtag/DeleteCreatedHashtag';
import DeleteFollowedHashTag from '../../controllers/Hashtag/DeleteFollowedHashtag';

const router = Router();

// Get HashTags
router.get('/', GetHashTags);

// Get HashTag
router.get('/:id', GetHashTag);

// Post HashTag
router.post('/', IsAuthenticated, CreateHashTag);

// Follow HashTag
router.put('/follow', IsAuthenticated, FollowHashTag);

// Put HashTag
router.put('/update', IsAuthenticated, UpdateHashTag);

// Delete Created HashTag
router.delete('/del/created', IsAuthenticated, DeleteCreatedHashTag);

// Delete Followed HashTag
router.delete('/del/followed', IsAuthenticated, DeleteFollowedHashTag);

export default router;
