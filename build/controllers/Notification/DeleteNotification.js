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
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    let notification = yield Notification_1.default.findById(id);
    if (!notification)
        return next(new ErrorHandler_1.default(404, `Notification With Id: ${id} Not Exist`));
    let user = yield User_1.default.findById(req['authorizedUser']._id);
    const { notifications, followers, followings } = user;
    const notificationIndex = user.notifications.findIndex((notification) => notification['_id'].toString() === id);
    if (notificationIndex >= 0) {
        notifications.splice(notificationIndex, 1);
        yield user.save();
        yield Notification_1.default.findByIdAndRemove(id);
        //! Delete This Notification From All Followers
        if ((followers === null || followers === void 0 ? void 0 : followers.length) > 0) {
            for (let i = 0; i < followers.length; i++) {
                const follower = yield User_1.default.findById(followers[i].toString()).select('notification');
                (_a = follower === null || follower === void 0 ? void 0 : follower.notifications) === null || _a === void 0 ? void 0 : _a.filter((n) => n['_id'].toString() !== id);
                yield follower.save();
            }
        }
        //! Delete This Notification From All Followings
        if ((followings === null || followings === void 0 ? void 0 : followings.length) > 0) {
            for (let i = 0; i < followings.length; i++) {
                const following = yield User_1.default.findById(followings[i].toString()).select('notification');
                (_b = following === null || following === void 0 ? void 0 : following.notifications) === null || _b === void 0 ? void 0 : _b.filter((n) => n['_id'].toString() !== id);
                yield following.save();
            }
        }
        return res
            .status(200)
            .json({ success: true, msg: 'Notification Deleted Successfully' });
    }
    return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This Notification",
    });
}));
