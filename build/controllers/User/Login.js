"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncHandler_1 = __importDefault(require("../../middleware/AsyncHandler"));
const passport_1 = __importDefault(require("passport"));
const SendToken_1 = __importDefault(require("../../middleware/SendToken"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => {
    passport_1.default.authenticate('local', (err, user) => {
        if (err)
            return res.status(401).json({
                message: 'Access Denied. email or password is incorrect. please try again.',
            });
        if (!user)
            return res.status(401).json({ message: 'User Not Authorized' });
        return req.logIn(user, (err) => err ? res.status(401).json({ error: err }) : (0, SendToken_1.default)(res, user));
    })(req, res, next);
});
