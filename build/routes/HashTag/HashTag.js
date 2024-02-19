"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetHashtags_1 = __importDefault(require("../../controllers/Hashtag/GetHashtags"));
const GetHashtag_1 = __importDefault(require("../../controllers/Hashtag/GetHashtag"));
const UpdateHashtag_1 = __importDefault(require("../../controllers/Hashtag/UpdateHashtag"));
const CreateHashtag_1 = __importDefault(require("../../controllers/Hashtag/CreateHashtag"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const FollowHashtag_1 = __importDefault(require("../../controllers/Hashtag/FollowHashtag"));
const DeleteCreatedHashtag_1 = __importDefault(require("../../controllers/Hashtag/DeleteCreatedHashtag"));
const DeleteFollowedHashtag_1 = __importDefault(require("../../controllers/Hashtag/DeleteFollowedHashtag"));
const router = (0, express_1.Router)();
// Get HashTags
router.get('/', GetHashtags_1.default);
// Get HashTag
router.get('/:id', GetHashtag_1.default);
// Post HashTag
router.post('/', IsAuthenticated_1.default, CreateHashtag_1.default);
// Follow HashTag
router.put('/follow', IsAuthenticated_1.default, FollowHashtag_1.default);
// Put HashTag
router.put('/update', IsAuthenticated_1.default, UpdateHashtag_1.default);
// Delete Created HashTag
router.delete('/del/created', IsAuthenticated_1.default, DeleteCreatedHashtag_1.default);
// Delete Followed HashTag
router.delete('/del/followed', IsAuthenticated_1.default, DeleteFollowedHashtag_1.default);
exports.default = router;
