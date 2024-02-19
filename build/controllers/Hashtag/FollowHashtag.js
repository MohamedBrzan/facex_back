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
const User_1 = __importDefault(require("../../models/User/User"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const UserId_1 = require("../../constants/UserId");
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { hashtagId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let hashtag = yield Hashtag_1.default.findById(hashtagId).select('followers');
    if (!hashtag)
        return next(new ErrorHandler_1.default(404, `Cannot Find Hashtag With Id : ${hashtagId}`));
    let user = yield User_1.default.findById(userId).select('hashtags');
    const findHashtagOwner = user.hashtags.published.findIndex((tag) => tag === hashtag);
    if (findHashtagOwner > -1)
        return next(new ErrorHandler_1.default(500, `You Cannot Follow Your Hashtag`));
    const findUser = (_a = hashtag === null || hashtag === void 0 ? void 0 : hashtag.followers) === null || _a === void 0 ? void 0 : _a.findIndex((user) => user.toString() === userId);
    if (findUser > -1)
        return next(new ErrorHandler_1.default(500, `You Already Following This Hashtag`));
    hashtag.followers.push(userId);
    yield hashtag.save();
    user.hashtags.reacted.push(hashtagId);
    yield user.save();
    return res.status(200).json({ message: 'You Follow Hashtag Successfully' });
}));
