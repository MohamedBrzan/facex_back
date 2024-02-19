"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetAlbums_1 = __importDefault(require("../../controllers/Album/GetAlbums"));
const GetAlbum_1 = __importDefault(require("../../controllers/Album/GetAlbum"));
const UpdateAlbum_1 = __importDefault(require("../../controllers/Album/UpdateAlbum"));
const CreateAlbum_1 = __importDefault(require("../../controllers/Album/CreateAlbum"));
const DeleteAlbum_1 = __importDefault(require("../../controllers/Album/DeleteAlbum"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Albums
router.get('/', GetAlbums_1.default);
// Get Album
router.get('/:id', GetAlbum_1.default);
// Post Album
router.post('/', IsAuthenticated_1.default, CreateAlbum_1.default);
// Put Album
router.put('/:id', IsAuthenticated_1.default, UpdateAlbum_1.default);
// Delete Album
router.delete('/:id', IsAuthenticated_1.default, DeleteAlbum_1.default);
exports.default = router;
