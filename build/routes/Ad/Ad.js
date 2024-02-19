"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetAds_1 = __importDefault(require("../../controllers/Ad/GetAds"));
const GetAd_1 = __importDefault(require("../../controllers/Ad/GetAd"));
const UpdateAd_1 = __importDefault(require("../../controllers/Ad/UpdateAd"));
const DeleteAd_1 = __importDefault(require("../../controllers/Ad/DeleteAd"));
const CreateAd_1 = __importDefault(require("../../controllers/Ad/CreateAd"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Ads
router.get('/', GetAds_1.default);
// Get Ad
router.get('/:id', GetAd_1.default);
// Post Ad
router.post('/', IsAuthenticated_1.default, CreateAd_1.default);
// Put Ad
router.put('/:id', IsAuthenticated_1.default, UpdateAd_1.default);
// Delete Ad
router.delete('/:id', IsAuthenticated_1.default, DeleteAd_1.default);
exports.default = router;
