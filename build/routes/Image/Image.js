"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetImages_1 = __importDefault(require("../../controllers/Image/GetImages"));
const GetImage_1 = __importDefault(require("../../controllers/Image/GetImage"));
const UpdateImage_1 = __importDefault(require("../../controllers/Image/UpdateImage"));
const DeleteImage_1 = __importDefault(require("../../controllers/Image/DeleteImage"));
const UploadImage_1 = __importDefault(require("../../controllers/Image/UploadImage"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Images
router.get('/', GetImages_1.default);
// Get Image
router.get('/:id', GetImage_1.default);
// Post Image
router.post('/', IsAuthenticated_1.default, UploadImage_1.default);
// Put Image
router.put('/:id', IsAuthenticated_1.default, UpdateImage_1.default);
// Delete Image
router.delete('/:id', IsAuthenticated_1.default, DeleteImage_1.default);
exports.default = router;
