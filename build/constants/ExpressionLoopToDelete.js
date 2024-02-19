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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model, userId) => __awaiter(void 0, void 0, void 0, function* () {
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
    keys.forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < model.expressions[key].length; i++) {
            if (model.expressions[key][i].toString() === userId) {
                model.expressions[key].splice(i, 1);
                yield model.save();
                return true;
            }
        }
        return false;
    }));
});
