"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostStatus_1 = __importDefault(require("../../enums/PostStatus"));
const VisiblePrivacy_1 = __importDefault(require("../../enums/VisiblePrivacy"));
const PostSchema = new mongoose_1.Schema({
    images: [{ type: String }],
    videos: [{ type: String }],
    content: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: PostStatus_1.default,
        default: PostStatus_1.default.Active,
        required: true,
    },
    comments: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
    expressions: {
        like: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        love: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        support: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        sad: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        happy: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        angry: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        disgust: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        surprise: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        fear: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    },
    shares: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    saves: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    visiblePrivacy: {
        type: String,
        enum: VisiblePrivacy_1.default,
        default: VisiblePrivacy_1.default.public,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Post', PostSchema);
