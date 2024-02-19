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
const Job_1 = __importDefault(require("../models/Job/Job"));
const User_1 = __importDefault(require("../models/User/User"));
exports.default = (userId, user, property) => __awaiter(void 0, void 0, void 0, function* () {
    if (property === 'published') {
        for (const jobId of user.jobs[property]) {
            const job = yield Job_1.default.findById(jobId);
            if (job && job.process) {
                Object.keys(job.process).forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
                    job.process[key].forEach((data, index) => __awaiter(void 0, void 0, void 0, function* () {
                        //! Delete the job from user
                        yield User_1.default.findByIdAndUpdate(data.user.toString(), {
                            $pull: { [`jobs.${key}`]: jobId },
                        });
                        //! Delete the user from the job
                        yield Job_1.default.findByIdAndUpdate(jobId, {
                            $pull: { [`process.${key}`]: userId },
                        });
                    }));
                }));
                yield Job_1.default.findByIdAndDelete(jobId);
            }
        }
    }
    else {
        for (const jobId of user.jobs[property]) {
            const job = yield Job_1.default.findById(jobId);
            if (job && job.process) {
                Object.keys(job.process).forEach((key) => {
                    job.process[key].forEach((data, index) => __awaiter(void 0, void 0, void 0, function* () {
                        if (data.user.toString() === userId) {
                            job.process[key].splice(index, 1);
                            yield job.save();
                        }
                    }));
                });
            }
        }
    }
});
