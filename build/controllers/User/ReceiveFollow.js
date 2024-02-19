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
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const UserId_1 = require("../../constants/UserId");
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    const { follower } = req.body;
    let user = yield User_1.default.findById(userId).select('followers name _id');
    if (follower === user._id.toString())
        return next(new ErrorHandler_1.default(500, 'You Cannot Follow Yourself'));
    let following = yield User_1.default.findById(follower).select('followings name');
    const userIndex = (_a = following === null || following === void 0 ? void 0 : following.followings) === null || _a === void 0 ? void 0 : _a.findIndex((f) => f.toString() === userId);
    if (userIndex)
        return next(new ErrorHandler_1.default(500, `${user === null || user === void 0 ? void 0 : user.name} Is Already In Your Followings`));
    let followingIndex = (_b = user === null || user === void 0 ? void 0 : user.followers) === null || _b === void 0 ? void 0 : _b.findIndex((f) => f.toString() === follower);
    if (followingIndex)
        return next(new ErrorHandler_1.default(500, `${following === null || following === void 0 ? void 0 : following.name} Is Already In Your Followers`));
    //* Following The User
    (_c = following === null || following === void 0 ? void 0 : following.followings) === null || _c === void 0 ? void 0 : _c.push(userId);
    yield following.save();
    //* Follow The User
    (_d = user === null || user === void 0 ? void 0 : user.followers) === null || _d === void 0 ? void 0 : _d.push(follower);
    yield user.save();
    return res.status(200).json({
        message: `${following === null || following === void 0 ? void 0 : following.name} Follow ${user === null || user === void 0 ? void 0 : user.name} Successfully`,
    });
}));
