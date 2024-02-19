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
const Post_1 = __importDefault(require("../../models/Post/Post"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
const User_1 = __importDefault(require("../../models/User/User"));
const UserId_1 = require("../../constants/UserId");
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
// import PostInterface from '../../Interfaces/Post/Post';
// import BlogInterface from '../../Interfaces/Blog/Blog';
// import ReelInterface from '../../Interfaces/Reel/Reel';
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, visiblePrivacy, ref } = req.body;
    let refName;
    let parentModel;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    //* If The Comment For Post | Blog | Reel
    if (ref.post) {
        parentModel = yield Post_1.default.findById(ref.post);
        if (!parentModel)
            return next(new ErrorHandler_1.default(404, `Could not find post with id ${ref.post}`));
        refName = 'post';
    }
    else if (ref.blog) {
        parentModel = yield Blog_1.default.findById(ref.blog);
        if (!parentModel)
            return next(new ErrorHandler_1.default(404, `Could not find blog with id ${ref.blog}`));
        refName = 'blog';
    }
    else if (ref.reel) {
        parentModel = yield Reel_1.default.findById(ref.reel);
        if (!parentModel)
            return next(new ErrorHandler_1.default(404, `Could not find reel with id ${ref.reel}`));
        refName = 'reel';
    }
    let comment = yield Comment_1.default.create({
        user: userId,
        message,
        visiblePrivacy,
        ref,
    });
    parentModel.comments.push(comment._id);
    yield parentModel.save();
    //* Add Comment To The User Comments
    yield User_1.default.findByIdAndUpdate(userId, { $push: { 'comments.published': comment._id } }, { runValidators: true, new: true, upsert: true });
    return res
        .status(404)
        .json({ msg: `Added comment successfully to ${refName}`, comment });
}));
