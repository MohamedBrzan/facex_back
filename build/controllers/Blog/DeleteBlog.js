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
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const User_1 = __importDefault(require("../../models/User/User"));
const Comment_1 = __importDefault(require("../../models/Comment/Comment"));
const UserId_1 = require("../../constants/UserId");
const Reply_1 = __importDefault(require("../../models/Comment/Reply"));
const ExpressionLoop_1 = __importDefault(require("../../constants/ExpressionLoop"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.body;
    let blog = yield Blog_1.default.findById(blogId);
    if (!blog)
        return next(new ErrorHandler_1.default(404, `Couldn't Find blog With Id => ${blogId}`));
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let user = yield User_1.default.findById(userId);
    if (blog.user.toString() !== userId)
        return res.status(404).json({
            success: false,
            message: "Sorry!!, It seems that you're not the owner of this blog",
        });
    //! Delete the blog from the owner
    user.blogs.published.splice(user.blogs.published.indexOf(blogId), 1);
    yield user.save();
    //* Get All User Who Reacted
    const usersWhoReacted = (0, ExpressionLoop_1.default)(blog);
    //* Get All Users Who Comments
    // TODO: Comments Loop
    for (let i = 0; i < blog.comments.length; i++) {
        const comment = yield Comment_1.default.findById(blog.comments[i].toString());
        const user = yield User_1.default.findById(comment.user.toString());
        const founded = user.comments.reacted.splice(user.comments.reacted.indexOf(comment), 1);
        founded.length < 1 &&
            user.comments.published.splice(user.comments.published.indexOf(comment), 1);
        yield user.save();
        const commentExpressions = (0, ExpressionLoop_1.default)(comment);
        for (let expression of commentExpressions) {
            const user = yield User_1.default.findById(expression.toString());
            user.comments.reacted.splice(user.comments.reacted.indexOf(comment), 1);
            yield user.save();
        }
        // TODO: Comment Replies Loop
        for (let j = 0; j < comment.replies.length; j++) {
            const reply = yield Reply_1.default.findById(comment.replies[j].toString());
            const user = yield User_1.default.findById(reply.user.toString());
            const founded = user.replies.reacted.splice(user.replies.reacted.indexOf(reply), 1);
            founded.length < 1 &&
                user.replies.published.splice(user.replies.published.indexOf(reply), 1);
            yield user.save();
            const repliesExpressions = (0, ExpressionLoop_1.default)(reply);
            for (let expression of repliesExpressions) {
                const user = yield User_1.default.findById(expression.toString());
                user.replies.reacted.splice(user.replies.reacted.indexOf(reply), 1);
                yield user.save();
            }
            yield Reply_1.default.findByIdAndRemove(reply);
        }
        yield Comment_1.default.findByIdAndRemove(comment);
    }
    //* Get All Users Who Shared
    // TODO: Share Loop
    for (let i = 0; i < blog.shares.length; i++) {
        const user = yield User_1.default.findById(blog.shares.toString()).select('shares');
        user.shares.blogs.splice(user.shares.blogs.indexOf(blogId), 1);
        yield user.save();
    }
    //! Delete Expression from usersWhoReacted
    for (let userId of usersWhoReacted) {
        const user = yield User_1.default.findById(userId).select('blogs');
        user.blogs.reacted.splice(user.blogs.reacted.indexOf(blogId), 1);
        yield user.save();
    }
    //* Delete the blog
    yield Blog_1.default.findByIdAndRemove(blogId);
    return res
        .status(200)
        .json({ success: true, msg: 'blog Deleted Successfully' });
}));
