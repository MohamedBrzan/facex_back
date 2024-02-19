"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hashtagSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    followers: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Hashtag', hashtagSchema);
