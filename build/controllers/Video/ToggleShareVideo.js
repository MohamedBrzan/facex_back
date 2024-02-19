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
const Video_1 = __importDefault(require("../../models/Video/Video"));
const UserId_1 = require("../../constants/UserId");
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    const user = yield User_1.default.findById(userId);
    let video = yield Video_1.default.findById(videoId);
    if (!video)
        return next(new ErrorHandler_1.default(404, `cannot find video with id ${videoId}`));
    const findUser = video.shares.findIndex((user) => user.toString() === userId);
    if (findUser >= 0) {
        video = yield Video_1.default.findByIdAndUpdate(videoId, {
            $pull: {
                shares: userId,
            },
        }, { runValidators: true, new: true, upsert: true });
        user.shares.videos.splice(user.shares.videos.indexOf(videoId), 1);
        yield user.save();
        return res.status(200).json({
            msg: `unshared successfully for video`,
            shares: user.shares.videos,
        });
    }
    video = yield Video_1.default.findByIdAndUpdate(videoId, {
        $push: {
            shares: userId,
        },
    }, { runValidators: true, new: true, upsert: true });
    user.shares.videos.push(videoId);
    yield user.save();
    return res.status(200).json({
        msg: `shared video successfully`,
        shares: user.shares.videos,
    });
}));
