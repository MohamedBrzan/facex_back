"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const albumSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: mongoose_1.Types.ObjectId, ref: 'Image' }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Album', albumSchema);
