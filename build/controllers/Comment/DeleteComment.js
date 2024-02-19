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
const Comment_1 = __importDefault(require("../../models/Comment/Comment"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const UserId_1 = require("../../constants/UserId");
const Post_1 = __importDefault(require("../../models/Post/Post"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
const DeleteCommentHandler_1 = __importDefault(require("../../functions/DeleteCommentHandler"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ref, commentId } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let comment = yield Comment_1.default.findById(commentId);
    if (!comment)
        return next(new ErrorHandler_1.default(404, `This Comment Id Not Found`));
    if (userId !== comment.user.toString())
        return next(new ErrorHandler_1.default(404, "Sorry!!, It seems that you're not the owner of this comment"));
    let refName;
    let refComments;
    let refModel;
    //* Remove Comment From Post
    if (ref.post) {
        refModel = yield Post_1.default.findById(ref.post);
        const { comments } = refModel;
        refComments = comments;
        refName = 'post';
        //* Remove Comment From Blog
    }
    else if (ref.blog) {
        refModel = yield Blog_1.default.findById(ref.blog);
        const { comments } = refModel;
        refComments = comments;
        refName = 'blog';
        //* Remove Comment From Reel
    }
    else if (ref.reel) {
        refModel = yield Reel_1.default.findById(ref.reel);
        const { comments } = refModel;
        refComments = comments;
        refName = 'reel';
    }
    //! Delete Comment From user.comments.reacted & Delete the comment's writer
    yield (0, DeleteCommentHandler_1.default)(refModel, commentId);
    return res.status(200).json({
        message: `deleted comment ${commentId} successfully from ${refName}`,
        [`${refName} comments`]: refComments,
    });
}));
