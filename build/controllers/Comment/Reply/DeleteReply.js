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
const AsyncHandler_1 = __importDefault(require("../../../middleware/AsyncHandler"));
const Reply_1 = __importDefault(require("../../../models/Comment/Reply"));
const ErrorHandler_1 = __importDefault(require("../../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../../models/User/User"));
const UserId_1 = require("../../../constants/UserId");
const Reel_1 = __importDefault(require("../../../models/Reel/Reel"));
const Blog_1 = __importDefault(require("../../../models/Blog/Blog"));
const Comment_1 = __importDefault(require("../../../models/Comment/Comment"));
const Post_1 = __importDefault(require("../../../models/Post/Post"));
const ExpressionLoop_1 = __importDefault(require("../../../constants/ExpressionLoop"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { replyId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    const user = yield User_1.default.findById(userId).select('replies');
    const reply = yield Reply_1.default.findById(replyId);
    if (!reply)
        return next(new ErrorHandler_1.default(404, `This reply with id ${replyId} not found`));
    if (userId !== reply.user.toString())
        return next(new ErrorHandler_1.default(404, "Sorry!!, It seems that you're not the owner of this reply"));
    const comment = yield Comment_1.default.findById(reply.ref.toString());
    if (!comment)
        return next(new ErrorHandler_1.default(404, `This comment with id ${comment._id.toString()} not found`));
    const { ref } = comment;
    let refName;
    //* Remove reply From Post
    if (ref.post) {
        yield Post_1.default.findByIdAndUpdate(ref.post, {
            $pull: {
                replies: replyId,
            },
        }, { runValidators: true, new: true });
        refName = 'post';
        //* Remove reply From Blog
    }
    else if (ref.blog) {
        yield Blog_1.default.findByIdAndUpdate(ref.blog, {
            $pull: {
                replies: replyId,
            },
        }, { runValidators: true, new: true });
        refName = 'blog';
        //* Remove reply From Reel
    }
    else if (ref.reel) {
        yield Reel_1.default.findByIdAndUpdate(ref.reel, {
            $pull: {
                replies: replyId,
            },
        }, { runValidators: true, new: true });
        refName = 'reel';
    }
    const users = (0, ExpressionLoop_1.default)(reply);
    for (const targetUser of users) {
        const user = yield User_1.default.findById(targetUser).select('replies');
        //! Delete the comment from user.comments.reacted
        user.replies.reacted.splice(user.replies.reacted.indexOf(replyId), 1);
        yield user.save();
    }
    //! Delete the reply's writer
    user.replies.published.splice(user.replies.published.indexOf(replyId), 1);
    yield user.save();
    //! Delete reply from the comment
    yield Comment_1.default.findByIdAndUpdate(reply.ref.toString(), { $pull: { replies: replyId } }, { runValidators: true, new: true, upsert: true });
    //! Delete reply from DB
    yield Reply_1.default.findByIdAndRemove(reply);
    return res
        .status(200)
        .json({ message: `Reply Deleted Successfully from ${refName}` });
}));
