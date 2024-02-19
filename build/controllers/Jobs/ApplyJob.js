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
const Job_1 = __importDefault(require("../../models/Job/Job"));
const User_1 = __importDefault(require("../../models/User/User"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const UserId_1 = require("../../constants/UserId");
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobId, resume } = req.body;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let user = yield User_1.default.findById(userId);
    const job = yield Job_1.default.findById(jobId);
    if (!job)
        return next(new ErrorHandler_1.default(404, `cannot find job ${jobId}`));
    if (job.user.toString() === userId)
        return next(new ErrorHandler_1.default(404, `cannot apply to your job`));
    const findUser = job.process.applied.findIndex((u) => u.user.toString() === userId);
    if (findUser >= 0)
        return next(new ErrorHandler_1.default(404, `you already applied to this job`));
    user.jobs.applied.push(job);
    yield user.save();
    job.process.applied.push({ user: userId, resume });
    yield job.save();
    return res
        .status(200)
        .json({ message: `applied to job ${job.title} successfully`, job });
}));
