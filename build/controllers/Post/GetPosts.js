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
const AsyncHandler_1 = __importDefault(require("../../middleware/AsyncHandler"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
exports.default = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sort } = req.query;
    if (sort === 'recommend') {
        return res.status(200).json(yield Post_1.default.find()
            .populate([
            { path: 'user', select: 'name avatar profession' },
            {
                path: 'comments',
                populate: [{ path: 'user' }, { path: 'replies', populate: 'user' }],
            },
            {
                path: 'expressions',
                populate: [
                    {
                        path: 'angry',
                        select: 'name avatar',
                    },
                    {
                        path: 'disgust',
                        select: 'name avatar',
                    },
                    {
                        path: 'fear',
                        select: 'name avatar',
                    },
                    {
                        path: 'happy',
                        select: 'name avatar',
                    },
                    {
                        path: 'like',
                        select: 'name avatar',
                    },
                    {
                        path: 'love',
                        select: 'name avatar',
                    },
                    {
                        path: 'sad',
                        select: 'name avatar',
                    },
                    {
                        path: 'support',
                        select: 'name avatar',
                    },
                    {
                        path: 'surprise',
                        select: 'name avatar',
                    },
                ],
            },
        ])
            .sort({ expressions: 'desc' }));
    }
    else if (sort === 'recently') {
        return res.status(200).json(yield Post_1.default.find()
            .populate([
            { path: 'user', select: 'name avatar profession' },
            {
                path: 'comments',
                populate: [{ path: 'user' }, { path: 'replies', populate: 'user' }],
            },
            {
                path: 'expressions',
                populate: [
                    {
                        path: 'angry',
                        select: 'name avatar',
                    },
                    {
                        path: 'disgust',
                        select: 'name avatar',
                    },
                    {
                        path: 'fear',
                        select: 'name avatar',
                    },
                    {
                        path: 'happy',
                        select: 'name avatar',
                    },
                    {
                        path: 'like',
                        select: 'name avatar',
                    },
                    {
                        path: 'love',
                        select: 'name avatar',
                    },
                    {
                        path: 'sad',
                        select: 'name avatar',
                    },
                    {
                        path: 'support',
                        select: 'name avatar',
                    },
                    {
                        path: 'surprise',
                        select: 'name avatar',
                    },
                ],
            },
        ])
            .sort({ comments: -1 }));
    }
    else if (sort === 'new') {
        return res.status(200).json(yield Post_1.default.find()
            .populate([
            { path: 'user', select: 'name avatar profession' },
            {
                path: 'comments',
                populate: [{ path: 'user' }, { path: 'replies', populate: 'user' }],
            },
            {
                path: 'expressions',
                populate: [
                    {
                        path: 'angry',
                        select: 'name avatar',
                    },
                    {
                        path: 'disgust',
                        select: 'name avatar',
                    },
                    {
                        path: 'fear',
                        select: 'name avatar',
                    },
                    {
                        path: 'happy',
                        select: 'name avatar',
                    },
                    {
                        path: 'like',
                        select: 'name avatar',
                    },
                    {
                        path: 'love',
                        select: 'name avatar',
                    },
                    {
                        path: 'sad',
                        select: 'name avatar',
                    },
                    {
                        path: 'support',
                        select: 'name avatar',
                    },
                    {
                        path: 'surprise',
                        select: 'name avatar',
                    },
                ],
            },
        ])
            .sort({ createdAt: 'desc' }));
    }
    else if (sort === 'old') {
        return res.status(200).json(yield Post_1.default.find()
            .populate([
            { path: 'user', select: 'name avatar profession' },
            {
                path: 'comments',
                populate: [{ path: 'user' }, { path: 'replies', populate: 'user' }],
            },
            {
                path: 'expressions',
                populate: [
                    {
                        path: 'angry',
                        select: 'name avatar',
                    },
                    {
                        path: 'disgust',
                        select: 'name avatar',
                    },
                    {
                        path: 'fear',
                        select: 'name avatar',
                    },
                    {
                        path: 'happy',
                        select: 'name avatar',
                    },
                    {
                        path: 'like',
                        select: 'name avatar',
                    },
                    {
                        path: 'love',
                        select: 'name avatar',
                    },
                    {
                        path: 'sad',
                        select: 'name avatar',
                    },
                    {
                        path: 'support',
                        select: 'name avatar',
                    },
                    {
                        path: 'surprise',
                        select: 'name avatar',
                    },
                ],
            },
        ])
            .sort({ createdAt: 'asc' }));
    }
    return res.status(200).json(yield Post_1.default.find()
        .populate([
        { path: 'user', select: 'name avatar profession' },
        {
            path: 'comments',
            populate: [{ path: 'user' }, { path: 'replies', populate: 'user' }],
        },
        {
            path: 'expressions',
            populate: [
                {
                    path: 'angry',
                    select: 'name avatar',
                },
                {
                    path: 'disgust',
                    select: 'name avatar',
                },
                {
                    path: 'fear',
                    select: 'name avatar',
                },
                {
                    path: 'happy',
                    select: 'name avatar',
                },
                {
                    path: 'like',
                    select: 'name avatar',
                },
                {
                    path: 'love',
                    select: 'name avatar',
                },
                {
                    path: 'sad',
                    select: 'name avatar',
                },
                {
                    path: 'support',
                    select: 'name avatar',
                },
                {
                    path: 'surprise',
                    select: 'name avatar',
                },
            ],
        },
    ])
        .sort({ expressions: 'asc' }));
}));
