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
exports.default = (publishedTrack, reactedTrack, user, userId, modelToFind, modelId, activeAdding) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inPublished = publishedTrack.findIndex((p) => p.toString() === modelId);
        const inReacted = reactedTrack.findIndex((p) => p.toString() === modelId);
        if (activeAdding === true &&
            inReacted < 0 &&
            inPublished < 0 &&
            modelToFind.user.toString() !== userId) {
            reactedTrack.push(modelId);
        }
        else if (activeAdding === false && inReacted >= 0) {
            reactedTrack.splice(reactedTrack.indexOf(modelId), 1);
        }
        yield user.save();
    }
    catch (error) {
        throw new Error(error);
    }
});
