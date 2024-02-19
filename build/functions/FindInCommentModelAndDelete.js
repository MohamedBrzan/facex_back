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
exports.default = (parentModel, userId) => __awaiter(void 0, void 0, void 0, function* () {
    for (const commentId of parentModel === null || parentModel === void 0 ? void 0 : parentModel.comments) {
        const comment = yield Comment_1.default.findById(commentId);
        if (comment.user.toString() === userId) {
            Object.keys(comment.expressions).forEach((key) => {
                comment.expressions[key].forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                    yield User_1.default.findByIdAndUpdate(id, {
                        $pull: {
                            'comments.reacted': commentId,
                        },
                    });
                }));
            });
            for (const replyId of comment.replies) {
                const reply = yield Reply_1.default.findById(replyId);
                Object.keys(reply.expressions).forEach((key) => {
                    reply.expressions[key].forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                        yield User_1.default.findByIdAndUpdate(id, {
                            $pull: { 'replies.reacted': replyId },
                        });
                    }));
                });
                yield Reply_1.default.findByIdAndRemove(replyId);
            }
            yield Comment_1.default.findByIdAndRemove(commentId);
        }
        else {
            console.log('from else');
            Object.keys(comment.expressions).forEach((key) => {
                comment.expressions[key].forEach((id, index) => __awaiter(void 0, void 0, void 0, function* () {
                    if (userId === id.toString()) {
                        comment.expressions[key].splice(index, 1);
                        yield comment.save();
                    }
                }));
            });
            for (const replyId of comment.replies) {
                const reply = yield Reply_1.default.findById(replyId);
                if (reply.user.toString() === userId) {
                    Object.keys(reply.expressions).forEach((key) => {
                        reply.expressions[key].forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
                            yield User_1.default.findByIdAndUpdate(id, {
                                $pull: { 'replies.reacted': replyId },
                            });
                        }));
                    });
                    yield Reply_1.default.findByIdAndRemove(replyId);
                }
                else {
                    Object.keys(reply.expressions).forEach((key) => {
                        reply.expressions[key].forEach((id, index) => __awaiter(void 0, void 0, void 0, function* () {
                            if (userId === id.toString()) {
                                reply.expressions[key].splice(index, 1);
                                yield reply.save();
                            }
                        }));
                    });
                }
            }
        }
    }
});
