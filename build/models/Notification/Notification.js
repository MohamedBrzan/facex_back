"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationStatus_1 = __importDefault(require("../../enums/NotificationStatus"));
const notificationSchema = new mongoose_1.Schema({
    from: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    link: { type: String, required: true },
    status: {
        type: String,
        enum: NotificationStatus_1.default,
        default: NotificationStatus_1.default.Read,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Notification', notificationSchema);
