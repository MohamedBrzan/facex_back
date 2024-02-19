"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    video: { type: String, required: true },
    views: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
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
    ref: { type: mongoose_1.Types.ObjectId, ref: 'Album' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Video', videoSchema);
