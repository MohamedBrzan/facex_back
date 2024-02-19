"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncHandler_1 = __importDefault(require("../../../middleware/AsyncHandler"));
const debug_1 = __importDefault(require("debug"));
const debugLogout = (0, debug_1.default)('GoogleLogout');
exports.default = (0, AsyncHandler_1.default)((req, res, next) => {
    debugLogout('logout');
    if (req.user) {
        req.logout((err) => err && next(err));
    }
    else {
        debugLogout('redirected');
        res.redirect('/');
    }
});
