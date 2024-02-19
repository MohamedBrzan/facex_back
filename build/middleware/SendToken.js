"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (res, user) => res
    .status(200)
    .cookie('token', jsonwebtoken_1.default.sign(user, process.env.SESSION_SECRET), {
    maxAge: 1000 * 60 * 60 * 24 * 365.25,
    secure: false,
    httpOnly: true,
})
    .json(user);
