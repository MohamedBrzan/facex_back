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
const FindModelInUser_1 = __importDefault(require("./FindModelInUser"));
exports.default = (res, userId, user, model, modelId, property, expressionKey) => __awaiter(void 0, void 0, void 0, function* () {
    let keys = [
        'like',
        'love',
        'support',
        'sad',
        'happy',
        'angry',
        'disgust',
        'surprise',
        'fear',
    ];
    let foundedExpressionKey;
    let index;
    keys.forEach((key) => {
        var _a;
        for (let i = 0; i < ((_a = model === null || model === void 0 ? void 0 : model.expressions[key]) === null || _a === void 0 ? void 0 : _a.length); i++) {
            if (model.expressions[key][i].toString() === userId) {
                foundedExpressionKey = key;
                index = i;
                break;
            }
        }
    });
    if (index >= 0) {
        if (expressionKey === foundedExpressionKey) {
            model.expressions[expressionKey].splice(index, 1);
            yield model.save();
            yield (0, FindModelInUser_1.default)(user[property].published, user[property].reacted, user, userId, model, modelId, false);
            return res.status(200).json(model.expressions);
        }
        else {
            model.expressions[foundedExpressionKey].splice(index, 1);
            model.expressions[expressionKey].push(userId);
            yield model.save();
            yield (0, FindModelInUser_1.default)(user[property].published, user[property].reacted, user, userId, model, modelId, true);
        }
        return res.status(200).json(model.expressions);
    }
    else {
        model.expressions[expressionKey].push(userId);
        yield model.save();
        yield (0, FindModelInUser_1.default)(user[property].published, user[property].reacted, user, userId, model, modelId, true);
        return res.status(200).json(model.expressions);
    }
});
