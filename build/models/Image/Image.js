"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    ref: { type: mongoose_1.Types.ObjectId, ref: 'Album', required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Image', imageSchema);
