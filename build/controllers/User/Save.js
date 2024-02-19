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
const UserId_1 = require("../../constants/UserId");
const User_1 = __importDefault(require("../../models/User/User"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { save } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let user = yield User_1.default.findById(userId);
    if (save.post) {
        const post = yield Post_1.default.findById(save.post);
        if (!post)
            return next(new ErrorHandler_1.default(500, 'Post Not Found'));
        if (post.user.toString() === userId)
            return next(new ErrorHandler_1.default(500, `it's your post so you can't save it`));
        const findUser = post.saves.findIndex((u) => u.toString() === userId);
        if (findUser >= 0)
            return next(new ErrorHandler_1.default(500, `you already saved this post`));
        post.saves.push(user);
        yield post.save();
        user.saves.posts.push(post);
        yield user.save();
        return res.status(200).json({
            message: `You save Post Id ${post === null || post === void 0 ? void 0 : post._id} Successfully`,
        });
    }
    else if (save.blog) {
        const blog = yield Blog_1.default.findById(save.blog);
        if (!blog)
            return next(new ErrorHandler_1.default(500, 'Blog Not Found'));
        if (blog.user.toString() === userId)
            return next(new ErrorHandler_1.default(500, `it's your blog so you can't save it`));
        const findUser = blog.saves.findIndex((u) => u.toString() === userId);
        if (findUser >= 0)
            return next(new ErrorHandler_1.default(500, `you already saved this blog`));
        blog.saves.push(user);
        yield blog.save();
        user.saves.blogs.push(blog);
        yield user.save();
        return res.status(200).json({
            message: `You save Blog ${blog === null || blog === void 0 ? void 0 : blog.title} Successfully`,
        });
    }
    else if (save.reel) {
        const reel = yield Reel_1.default.findById(save.reel);
        if (!reel)
            return next(new ErrorHandler_1.default(500, 'Reel Not Found'));
        if (reel.user.toString() === userId)
            return next(new ErrorHandler_1.default(500, `it's your reel so you can't save it`));
        const findUser = reel.saves.findIndex((u) => u.toString() === userId);
        if (findUser >= 0)
            return next(new ErrorHandler_1.default(500, `you already saved this reel`));
        reel.saves.push(user);
        yield reel.save();
        user.saves.reels.push(reel);
        yield user.save();
        return res.status(200).json({
            message: `You save Reel ${reel === null || reel === void 0 ? void 0 : reel.title} Successfully`,
        });
    }
    return res.status(200).json({
        message: `there's something wrong, please try again later`,
    });
}));
