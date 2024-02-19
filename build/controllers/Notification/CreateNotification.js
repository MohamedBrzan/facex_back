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
const Notification_1 = __importDefault(require("../../models/Notification/Notification"));
const User_1 = __importDefault(require("../../models/User/User"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, status } = req.body;
    let notification = yield Notification_1.default.create({
        from: req['authorizedUser']._id,
        title,
        link,
        status,
    });
    let user = yield User_1.default.findById(req['authorizedUser']._id);
    if (!user) {
        yield Notification_1.default.findByIdAndRemove(notification['_id']);
        return next(new ErrorHandler_1.default(404, `User With Id ${req['authorizedUser']._id} Not Exist`));
    }
    yield User_1.default.findByIdAndUpdate(req['authorizedUser']._id, { $push: { notifications: notification['_id'].toString() } }, { runValidators: true, new: true });
    const { followers, followings } = user;
    //* Send This Notification From All Followers
    if ((followers === null || followers === void 0 ? void 0 : followers.length) > 0) {
        for (let i = 0; i < followers.length; i++) {
            yield User_1.default.findByIdAndUpdate(followers[i].toString(), {
                $push: {
                    notifications: notification['_id'],
                },
            }, { runValidators: true, new: true });
        }
    }
    //* Send This Notification From All Followings
    if ((followings === null || followings === void 0 ? void 0 : followings.length) > 0) {
        for (let i = 0; i < followings.length; i++) {
            yield User_1.default.findByIdAndUpdate(followings[i].toString(), {
                $push: {
                    notifications: notification['_id'],
                },
            }, { runValidators: true, new: true });
        }
    }
    return res.status(200).json(notification);
}));
