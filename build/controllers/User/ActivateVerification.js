"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncHandler_1 = __importDefault(require("../../middleware/AsyncHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
const UserId_1 = require("../../constants/UserId");
exports.default = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let user = yield User_1.default.findByIdAndUpdate(userId, {
        $set: {
            'verified.isActive': true,
        },
    }, { runValidators: true, new: true, upsert: true });
    const { verified } = user;
    return res.status(200).json({
        success: true,
        msg: 'verification request accepted :)',
        verified,
    });
}));
