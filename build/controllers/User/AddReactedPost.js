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
const Post_1 = __importDefault(require("../../models/Post/Post"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let user = yield User_1.default.findById(userId).select('posts');
    let post = yield Post_1.default.findById(postId);
    if (!post)
        return next(new ErrorHandler_1.default(404, `cannot find post with id ${postId}`));
    const findPost = user.posts.reacted.findIndex((p) => p.toString() === postId);
    if (findPost >= 0)
        return next(new ErrorHandler_1.default(404, `you already with reacted to this post ${postId} before`));
    user.posts.reacted.push(postId);
    yield user.save();
    const { reacted } = user.posts;
    return res.status(200).json({
        message: `added post with id ${postId} to user posts.reacted Successfully`,
        reacted,
    });
}));
