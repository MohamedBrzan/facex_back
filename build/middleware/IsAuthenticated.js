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
const AsyncHandler_1 = __importDefault(require("./AsyncHandler"));
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
const User_1 = __importDefault(require("../models/User/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return next(new ErrorHandler_1.default(404, 'Not Authorized From IsAuthenticated File'));
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SESSION_SECRET);
    req.user = yield User_1.default.findById(decoded['id'] ? decoded['id'] : decoded['_id']);
    next();
}));
// export default AsyncHandler(
//   (req: Request, res: Response, next: NextFunction) => {
//     if (!req.isAuthenticated()) {
//       return next(new ErrorHandler(404, "You're not Authenticated"));
//     }
//     next();
//   }
// );
