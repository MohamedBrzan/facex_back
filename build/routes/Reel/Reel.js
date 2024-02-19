"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetReels_1 = __importDefault(require("../../controllers/Reel/GetReels"));
const GetReel_1 = __importDefault(require("../../controllers/Reel/GetReel"));
const UpdateReel_1 = __importDefault(require("../../controllers/Reel/UpdateReel"));
const DeleteReel_1 = __importDefault(require("../../controllers/Reel/DeleteReel"));
const CreateReel_1 = __importDefault(require("../../controllers/Reel/CreateReel"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const AddAndRemoveExpression_1 = __importDefault(require("../../controllers/Reel/AddAndRemoveExpression"));
const AddView_1 = __importDefault(require("../../controllers/Reel/AddView"));
const DeleteView_1 = __importDefault(require("../../controllers/Reel/DeleteView"));
const ToggleShareReel_1 = __importDefault(require("../../controllers/Reel/ToggleShareReel"));
const ToggleSaveReel_1 = __importDefault(require("../../controllers/Reel/ToggleSaveReel"));
const router = (0, express_1.Router)();
// Get Reels
router.get('/', GetReels_1.default);
// Get Reel
router.get('/:id', GetReel_1.default);
// Create Reel
router.post('/create', IsAuthenticated_1.default, CreateReel_1.default);
// Add and Delete Expression for Reels
router.patch('/expressions/toggle', IsAuthenticated_1.default, AddAndRemoveExpression_1.default);
// Toggle Share Reel
router.patch('/share', IsAuthenticated_1.default, ToggleShareReel_1.default);
// Toggle Save Reel
router.patch('/save', IsAuthenticated_1.default, ToggleSaveReel_1.default);
// Update Reel
router.put('/update', IsAuthenticated_1.default, UpdateReel_1.default);
// Add Reel View
router.patch('/views/add', IsAuthenticated_1.default, AddView_1.default);
// Delete Reel View
router.patch('/views/del', IsAuthenticated_1.default, DeleteView_1.default);
// Delete Reel
router.delete('/del', IsAuthenticated_1.default, DeleteReel_1.default);
exports.default = router;
