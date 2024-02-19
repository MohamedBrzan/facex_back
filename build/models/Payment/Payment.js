"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentStatus_1 = __importDefault(require("../../enums/PaymentStatus"));
const paymentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: PaymentStatus_1.default,
        default: PaymentStatus_1.default.Pending,
        require: true,
    },
    card: {
        number: { type: String, minLength: 14, maxLength: 14, required: true },
        cvc: { type: String, minlength: 3, maxlength: 3, required: true },
        expires: { type: Date, required: true },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Payment', paymentSchema);
