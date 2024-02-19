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
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
const UserId_1 = require("../../constants/UserId");
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reelId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    const user = yield User_1.default.findById(userId);
    let reel = yield Reel_1.default.findById(reelId);
    if (!reel)
        return next(new ErrorHandler_1.default(404, `cannot find reel with id ${reelId}`));
    const findUser = reel.shares.findIndex((user) => user.toString() === userId);
    if (findUser >= 0) {
        reel = yield Reel_1.default.findByIdAndUpdate(reelId, {
            $pull: {
                shares: userId,
            },
        }, { runValidators: true, new: true, upsert: true });
        user.shares.reels.splice(user.shares.reels.indexOf(reelId), 1);
        yield user.save();
        return res.status(200).json({
            msg: `unshared successfully for reel ${reel.title}`,
            shares: user.shares.reels,
        });
    }
    reel = yield Reel_1.default.findByIdAndUpdate(reelId, {
        $push: {
            shares: userId,
        },
    }, { runValidators: true, new: true, upsert: true });
    user.shares.reels.push(reelId);
    yield user.save();
    return res.status(200).json({
        msg: `shared reel ${reel.title} successfully`,
        shares: user.shares.reels,
    });
}));
