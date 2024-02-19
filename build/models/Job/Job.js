"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Experience_1 = __importDefault(require("../../enums/Experience"));
const Timing_1 = __importDefault(require("../../enums/Timing"));
const jobSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    type: {
        apply: { type: String, enum: ['easy', 'apply'] },
        position: { type: String, required: true },
        timing: { type: String, enum: Timing_1.default, required: true },
    },
    company: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        employees: {
            count: {
                from: { type: Number, required: true },
                to: { type: Number, required: true },
            },
        },
        applicants: { type: Number, required: true },
    },
    skills: [{ type: String, required: true }],
    about: {
        bio: { type: String, required: true },
        duties: { type: String, required: true },
        requirements: { type: String, required: true },
        skills: {
            technical: [
                {
                    name: { type: String, required: true },
                    experience: { type: String, enum: Experience_1.default },
                },
            ],
            interpersonal: [
                {
                    name: { type: String, required: true },
                    experience: { type: String, enum: Experience_1.default },
                },
            ],
        },
    },
    process: {
        applied: [
            {
                user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
                resume: { type: String, required: true },
            },
        ],
        reviewing: [
            {
                user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
                resume: { type: String, required: true },
            },
        ],
        interviewing: [
            {
                user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
                resume: { type: String, required: true },
            },
        ],
        rejected: [
            {
                user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
                resume: { type: String, required: true },
            },
        ],
        approved: [
            {
                user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
                resume: { type: String, required: true },
            },
        ],
    },
    employees: [
        {
            user: { type: mongoose_1.Types.ObjectId, ref: 'User' },
            resume: { type: String, required: true },
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Job', jobSchema);
