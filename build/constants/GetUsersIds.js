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
const User_1 = __importDefault(require("../models/User/User"));
exports.default = (model, iterationDir, modelContainer, checkingDir, modelId, property) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let users = new Set();
    // TODO: models Loop
    for (let i = 0; i < iterationDir.length; i++) {
        const getModel = yield model.findById(iterationDir[i].toString());
        modelContainer.add(getModel._id);
        users.add(getModel.user.toString());
    }
    //! Delete the models from users Who created or reacted about it
    for (let userId of users) {
        const user = yield User_1.default.findById(userId).select(property);
        (_a = user[property].reacted) === null || _a === void 0 ? void 0 : _a.forEach((m) => __awaiter(void 0, void 0, void 0, function* () {
            if (checkingDir.toString() === modelId) {
                user[property].reacted.splice(user[property].reacted.indexOf(m), 1);
                yield user.save();
            }
        }));
        (_b = user[property].published) === null || _b === void 0 ? void 0 : _b.forEach((m) => __awaiter(void 0, void 0, void 0, function* () {
            if (checkingDir.toString() === modelId) {
                user[property].published.splice(user[property].published.indexOf(m), 1);
                yield user.save();
            }
        }));
    }
    return users;
});
