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
const User_1 = __importDefault(require("../../../models/User/User"));
const UserId_1 = require("../../../constants/UserId");
const Comment_1 = __importDefault(require("../../../models/Comment/Comment"));
const ErrorHandler_1 = __importDefault(require("../../../middleware/ErrorHandler"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ref, message, visiblePrivacy } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    const comment = yield Comment_1.default.findById(ref);
    if (!comment)
        return next(new ErrorHandler_1.default(404, `cannot find a comment with id ${ref}`));
    let reply = yield Reply_1.default.create({
        user: userId,
        ref,
        reply: message,
        visiblePrivacy,
    });
    comment.replies.push(reply);
    yield comment.save();
    yield User_1.default.findByIdAndUpdate(userId, { $push: { 'replies.published': reply._id.toString() } }, { runValidators: true, new: true, upsert: true });
    return res.status(200).json(reply);
}));
