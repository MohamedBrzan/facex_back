"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (controllers) => (req, res, next) => Promise.resolve(controllers(req, res, next)).catch(next);
