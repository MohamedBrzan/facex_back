"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetVideos_1 = __importDefault(require("../../controllers/Video/GetVideos"));
const GetVideo_1 = __importDefault(require("../../controllers/Video/GetVideo"));
const UpdateVideo_1 = __importDefault(require("../../controllers/Video/UpdateVideo"));
const DeleteVideo_1 = __importDefault(require("../../controllers/Video/DeleteVideo"));
const UploadVideo_1 = __importDefault(require("../../controllers/Video/UploadVideo"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const ToggleShareVideo_1 = __importDefault(require("../../controllers/Video/ToggleShareVideo"));
const ToggleSaveVideo_1 = __importDefault(require("../../controllers/Video/ToggleSaveVideo"));
const router = (0, express_1.Router)();
// Get Videos
router.get('/', GetVideos_1.default);
// Get Video
router.get('/:id', GetVideo_1.default);
// Post Video
router.post('/', IsAuthenticated_1.default, UploadVideo_1.default);
// Toggle Share Video
router.patch('/share', IsAuthenticated_1.default, ToggleShareVideo_1.default);
// Toggle Save Video
router.patch('/save', IsAuthenticated_1.default, ToggleSaveVideo_1.default);
// Put Video
router.put('/update', IsAuthenticated_1.default, UpdateVideo_1.default);
// Delete Video
router.delete('/del', IsAuthenticated_1.default, DeleteVideo_1.default);
exports.default = router;
