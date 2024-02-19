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
const Hashtag_1 = __importDefault(require("../../models/Hashtag/Hashtag"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
const UserId_1 = require("../../constants/UserId");
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashtagId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let hashtag = yield Hashtag_1.default.findById(hashtagId);
    if (!hashtag)
        return next(new ErrorHandler_1.default(404, `Hashtag With Id ${hashtagId} Not Exist`));
    if (hashtag.user.toString() !== userId)
        return res.status(404).json({
            success: false,
            message: "Sorry!!, You're Not The Owner Of This Hashtag",
        });
    let user = yield User_1.default.findById(userId);
    const hashtagIndex = user.hashtags.published.findIndex((hashtag) => hashtag.toString() === hashtagId);
    if (hashtagIndex >= 0) {
        user.hashtags.published.splice(hashtagIndex, 1);
        yield user.save();
        yield Hashtag_1.default.findByIdAndRemove(hashtagId);
    }
    return res
        .status(200)
        .json({ success: true, msg: 'Hashtag Deleted Successfully' });
}));
