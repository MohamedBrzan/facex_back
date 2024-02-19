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
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { replyId } = req.body;
    let reply = yield Reply_1.default.findById(replyId);
    if (!reply)
        return next(new ErrorHandler_1.default(404, `This Reply Id ${replyId} Not Found`));
    reply = yield Reply_1.default.findByIdAndUpdate(replyId, req.body, {
        runValidators: true,
        new: true,
        upsert: true,
    });
    return res.status(200).json(reply);
}));
