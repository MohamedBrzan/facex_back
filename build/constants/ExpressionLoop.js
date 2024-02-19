"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model) => {
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
    let users = new Set();
    keys.forEach((key) => {
        var _a;
        for (let i = 0; i < ((_a = model === null || model === void 0 ? void 0 : model.expressions[key]) === null || _a === void 0 ? void 0 : _a.length); i++) {
            users.add(model.expressions[key][i]);
        }
    });
    return users;
};
