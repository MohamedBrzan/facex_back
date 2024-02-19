"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    if (err.name === 'CastError') {
        const message = `Resource Not Found . This ${err.path} : (${err.value}) Is Invalid`;
        err = new ErrorHandler_1.default(400, message);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
