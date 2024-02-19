"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const GoogleCallBack_1 = __importDefault(require("../../controllers/Authentication/Google/GoogleCallBack"));
const GoogleProfile_1 = __importDefault(require("../../controllers/Authentication/Google/GoogleProfile"));
const debug_1 = __importDefault(require("debug"));
const debugLogout = (0, debug_1.default)('GoogleLogout');
const router = (0, express_1.default)();
router.get('/', (req, res) => {
    res.send('Welcome to facex server side!');
});
router.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), GoogleCallBack_1.default);
router.get('/profile', GoogleProfile_1.default);
router.get('/logout', (req, res, next) => {
    debugLogout('logout');
    if (req.user) {
        req.logout((err) => err && next(err));
    }
    else {
        debugLogout('redirected');
        res.redirect('/');
    }
});
exports.default = router;
