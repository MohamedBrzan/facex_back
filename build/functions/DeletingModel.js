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
const ExpressionLoop_1 = __importDefault(require("../constants/ExpressionLoop"));
const User_1 = __importDefault(require("../models/User/User"));
const ErrorHandler_1 = __importDefault(require("../middleware/ErrorHandler"));
const FindInCommentModelAndDelete_1 = __importDefault(require("./FindInCommentModelAndDelete"));
const ExpressionLoopToDelete_1 = __importDefault(require("../constants/ExpressionLoopToDelete"));
exports.default = (next, modelName, modelContainer, userId, shares, saves) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    //TODO: Posts, comments and replies Part
    //! Delete All User Posts
    if (((_a = modelContainer === null || modelContainer === void 0 ? void 0 : modelContainer.published) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const postId of modelContainer.published) {
            const post = yield modelName.findById(postId.toString());
            //! Delete every user do expression
            const userWhoDoExpression = (0, ExpressionLoop_1.default)(post);
            if ((userWhoDoExpression === null || userWhoDoExpression === void 0 ? void 0 : userWhoDoExpression.size) > 0) {
                for (const userId of userWhoDoExpression) {
                    const user = yield User_1.default.findById(userId.toString());
                    if (!user)
                        return next(new ErrorHandler_1.default(404, `user with id ${userId} not found in DB`));
                    user.posts.reacted.splice(user.posts.reacted.indexOf(post), 1);
                    yield user.save();
                }
            }
            //! Delete every user do comment and reply to the post
            if (((_b = post === null || post === void 0 ? void 0 : post.comments) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                yield (0, FindInCommentModelAndDelete_1.default)(post, userId);
            }
            //! Delete all users who saves the post
            if (((_c = post === null || post === void 0 ? void 0 : post.saves) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                for (const saveId of post.saves) {
                    const saver = yield User_1.default.findById(saveId);
                    if (!saver)
                        return next(new ErrorHandler_1.default(404, `user with id ${saveId} not found in DB`));
                    saver.saves.posts.splice(saver.saves.posts.indexOf(post), 1);
                    yield saver.save();
                }
            }
            //! Delete all users who shares the post
            if (((_d = post === null || post === void 0 ? void 0 : post.shares) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                for (const saveId of post.shares) {
                    const republishUser = yield User_1.default.findById(saveId);
                    if (!republishUser)
                        return next(new ErrorHandler_1.default(404, `user with id ${saveId} not found in DB`));
                    republishUser.shares.posts.splice(republishUser.shares.posts.indexOf(post), 1);
                    yield republishUser.save();
                }
            }
            yield modelName.findByIdAndRemove(postId);
        }
    }
    if (((_e = modelContainer === null || modelContainer === void 0 ? void 0 : modelContainer.reacted) === null || _e === void 0 ? void 0 : _e.length) > 0) {
        for (const postId of modelContainer.reacted) {
            const post = yield modelName.findById(postId.toString());
            //* find the user in post.expressions and deleted and return true, or false if not exist
            yield (0, ExpressionLoopToDelete_1.default)(post, userId);
            if (((_f = post === null || post === void 0 ? void 0 : post.comments) === null || _f === void 0 ? void 0 : _f.length) > 0) {
                yield (0, FindInCommentModelAndDelete_1.default)(post, userId);
            }
        }
    }
    //! Delete all user's shares
    if (shares.length > 0) {
        for (const sharedId of shares) {
            const post = yield modelName.findById(sharedId);
            if (!post)
                return next(new ErrorHandler_1.default(404, `post with id ${sharedId} not found in DB shares`));
            post.shares.splice(post.shares.indexOf(userId), 1);
            yield post.save();
        }
    }
    //! Delete all user's saves
    if (saves.length > 0) {
        for (const sharedId of saves) {
            const post = yield modelName.findById(sharedId);
            if (!post)
                return next(new ErrorHandler_1.default(404, `user with id ${sharedId} not found in DB saves`));
            post.saves.splice(post.saves.indexOf(userId), 1);
            yield post.save();
        }
    }
});
