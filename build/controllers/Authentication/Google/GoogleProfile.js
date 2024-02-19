"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncHandler_1 = __importDefault(require("../../../middleware/AsyncHandler"));
const debug_1 = __importDefault(require("debug"));
const debugProfile = (0, debug_1.default)('GoogleProfile');
exports.default = (0, AsyncHandler_1.default)((req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>You're logged in </h1><pre>${JSON.stringify(req.user, null, 2)}</pre> `);
        debugProfile(req.user);
    }
    else {
        res.redirect('/');
    }
});
