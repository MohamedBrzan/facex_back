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
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reelId, userId } = req.body;
    let reel = yield Reel_1.default.findById(reelId);
    if (!reel)
        return next(new ErrorHandler_1.default(404, `cannot find reel with id ${reelId}`));
    reel = yield Reel_1.default.findByIdAndUpdate(reelId, {
        $pull: {
            views: userId,
        },
    }, { runValidators: true, new: true, upsert: true });
    const { views } = reel;
    return res.status(200).json({
        msg: `deleted user with id ${userId} from reel views successfully`,
        views,
    });
}));
