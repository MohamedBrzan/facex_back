"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetNotifications_1 = __importDefault(require("../../controllers/Notification/GetNotifications"));
const GetNotification_1 = __importDefault(require("../../controllers/Notification/GetNotification"));
const UpdateNotification_1 = __importDefault(require("../../controllers/Notification/UpdateNotification"));
const CreateNotification_1 = __importDefault(require("../../controllers/Notification/CreateNotification"));
const DeleteNotification_1 = __importDefault(require("../../controllers/Notification/DeleteNotification"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const router = (0, express_1.Router)();
// Get Notifications
router.get('/', GetNotifications_1.default);
// Get Notification
router.get('/:id', GetNotification_1.default);
// Post Notification
router.post('/', IsAuthenticated_1.default, CreateNotification_1.default);
// Put Notification
router.put('/:id', IsAuthenticated_1.default, UpdateNotification_1.default);
// Delete Notification
router.delete('/:id', IsAuthenticated_1.default, DeleteNotification_1.default);
exports.default = router;
