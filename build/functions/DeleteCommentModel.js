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
const Comment_1 = __importDefault(require("../models/Comment/Comment"));
const Reply_1 = __importDefault(require("../models/Comment/Reply"));
const User_1 = __importDefault(require("../models/User/User"));
exports.default = (parentModel) => __awaiter(void 0, void 0, void 0, function* () {
    for (const commentId of parentModel.comments) {
        const comment = yield Comment_1.default.findById(commentId);
        Object.keys(comment.expressions).forEach((key) => {
            comment.expressions[key].forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                yield User_1.default.findByIdAndUpdate(id, { $pull: { 'comments.reacted': commentId } }, { runValidators: true, new: true, upsert: true });
            }));
        });
        for (const replyId of comment.replies) {
            const reply = yield Reply_1.default.findById(replyId);
            Object.keys(reply.expressions).forEach((key) => {
                reply.expressions[key].forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                    yield User_1.default.findByIdAndUpdate(id, { $pull: { 'replies.reacted': replyId } }, { runValidators: true, new: true, upsert: true });
                }));
            });
            yield User_1.default.findByIdAndUpdate(reply.user.toString(), { $pull: { 'replies.published': replyId } }, { runValidators: true, new: true, upsert: true });
            yield Reply_1.default.findByIdAndRemove(replyId);
        }
        parentModel === null || parentModel === void 0 ? void 0 : parentModel.comments.splice(parentModel === null || parentModel === void 0 ? void 0 : parentModel.comments.indexOf(commentId), 1);
        yield parentModel.save();
        yield User_1.default.findByIdAndUpdate(comment.user.toString(), {
            $pull: { 'comments.published': commentId },
        });
        yield Comment_1.default.findByIdAndRemove(commentId);
    }
});
