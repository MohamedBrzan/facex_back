"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    images: [{ type: String }],
    videos: [{ type: String }],
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    tags: [{ type: String, required: true }],
    ages: {
        from: { type: Number, required: true },
        to: { type: Number, required: true },
    },
    payment: { type: mongoose_1.Types.ObjectId, ref: 'Payment' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Ad', adSchema);
