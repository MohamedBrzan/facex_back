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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Gender_1 = __importDefault(require("../../enums/Gender"));
const Role_1 = __importDefault(require("../../enums/Role"));
const VisiblePrivacy_1 = __importDefault(require("../../enums/VisiblePrivacy"));
const FilterContent_1 = __importDefault(require("../../enums/FilterContent"));
const UserSchema = new mongoose_1.Schema({
    name: {
        first: { type: String, required: true, trim: true },
        last: { type: String, required: true, trim: true },
        additional: { type: String, trim: true },
    },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, select: false },
    avatar: { type: String, default: '' },
    cover: { type: String, default: '' },
    bio: { type: String, trim: true, default: '' },
    gender: { type: String, enum: Gender_1.default, default: Gender_1.default.male },
    disability: { type: String, trim: true, default: '' },
    headline: { type: String, trim: true, default: '' },
    profession: { type: String, trim: true, default: '' },
    industry: { type: String, trim: true, default: '' },
    role: {
        type: String,
        required: true,
        enum: Role_1.default,
        default: Role_1.default.User,
    },
    address: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    contact: {
        profile: { type: String, trim: true, default: '' },
        website: { type: String, trim: true, default: '' },
        phone: { type: String, trim: true, default: '' },
        birthday: {
            day: { type: Number, default: '' },
            month: { type: String, default: '' },
            year: { type: Number, default: '' },
        },
    },
    analytics: [
        {
            count: { type: Number, default: '' },
            name: { type: String, trim: true, default: '' },
            percentage: { type: Number, default: '' },
            time: { type: String, trim: true, default: '' },
        },
    ],
    profile_topics: [{ type: String, trim: true }],
    creator_tools: {
        live: [{ type: String, trim: true }],
        events: [{ type: String, trim: true }],
        newsletters: [{ type: String, trim: true }],
        follow_link: [{ type: String, trim: true }],
    },
    open_to: [
        {
            title: { type: String, trim: true },
            description: { type: String, trim: true },
        },
    ],
    tags: [{ type: String, trim: true }],
    blocks: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    followings: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    images: [{ type: mongoose_1.Types.ObjectId, ref: 'Image' }],
    albums: [{ type: mongoose_1.Types.ObjectId, ref: 'Album' }],
    videos: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'Video' }],
        reacted: [{ type: mongoose_1.Types.ObjectId, ref: 'Video' }],
    },
    payments: [{ type: mongoose_1.Types.ObjectId, ref: 'Payment' }],
    comments: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
        reacted: [{ type: mongoose_1.Types.ObjectId, ref: 'Comment' }],
    },
    replies: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'Reply' }],
        reacted: [{ type: mongoose_1.Types.ObjectId, ref: 'Reply' }],
    },
    hashtags: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'HashTag' }],
        reacted: [{ type: mongoose_1.Types.ObjectId, ref: 'HashTag' }],
    },
    posts: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
        reacted: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
    },
    blogs: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'Blog' }],
        reacted: [{ type: mongoose_1.Types.ObjectId, ref: 'Blog' }],
    },
    reels: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'Reel' }],
        reacted: [{ type: mongoose_1.Types.ObjectId, ref: 'Reel' }],
    },
    notifications: [{ type: mongoose_1.Types.ObjectId, ref: 'Notification' }],
    jobs: {
        published: [{ type: mongoose_1.Types.ObjectId, ref: 'Job' }],
        applied: [{ type: mongoose_1.Types.ObjectId, ref: 'Job' }],
        reviewing: [{ type: mongoose_1.Types.ObjectId, ref: 'Job' }],
        interviewing: [{ type: mongoose_1.Types.ObjectId, ref: 'Job' }],
        rejected: [{ type: mongoose_1.Types.ObjectId, ref: 'Job' }],
        approved: [{ type: mongoose_1.Types.ObjectId, ref: 'Job' }],
    },
    shares: {
        posts: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
        blogs: [{ type: mongoose_1.Types.ObjectId, ref: 'Blog' }],
        reels: [{ type: mongoose_1.Types.ObjectId, ref: 'Reel' }],
        videos: [{ type: mongoose_1.Types.ObjectId, ref: 'Video' }],
    },
    saves: {
        posts: [{ type: mongoose_1.Types.ObjectId, ref: 'Post' }],
        blogs: [{ type: mongoose_1.Types.ObjectId, ref: 'Blog' }],
        reels: [{ type: mongoose_1.Types.ObjectId, ref: 'Reel' }],
        videos: [{ type: mongoose_1.Types.ObjectId, ref: 'Video' }],
    },
    ads: [{ type: mongoose_1.Types.ObjectId, ref: 'Ads' }],
    hyperlinks: [
        {
            for: { type: String, trim: true },
            link: { type: String, trim: true },
        },
    ],
    preferences: {
        language: {
            app: { type: String, trim: true },
            content: { type: String, trim: true },
        },
        auto_videos: { type: Boolean, default: false },
        sounds_effects: { type: Boolean, default: false },
        visibility: {
            profile_photos: {
                type: String,
                enum: VisiblePrivacy_1.default,
                default: VisiblePrivacy_1.default.public,
            },
            feed: {
                type: String,
                enum: FilterContent_1.default,
                default: FilterContent_1.default.recommended,
            },
        },
        people: {
            also_viewed: { type: Boolean, default: false },
            unFollowed: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
        },
        display: {
            dark_mode: { type: Boolean, default: false },
        },
    },
    deletion: {
        executeIn: {
            date: {
                full: { type: String },
                short: { type: String },
            },
            month: { type: Number },
            day: { type: Number },
        },
        isActive: { type: Boolean, default: false },
    },
    actively_recruiting: { type: Boolean, default: false },
    verified: {
        id: {
            number: { type: Number },
            photo: { type: String },
        },
        passport: {
            number: { type: Number },
            photo: { type: String },
        },
        isActive: { type: Boolean, default: false },
    },
    isDeleted: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
}, { timestamps: true });
// Hash Password before saving
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            this.password = yield bcrypt_1.default.hash(this.password, 12);
        }
        next();
    });
});
UserSchema.methods.verifyPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
// Match Password to hashed password in database
// UserSchema.methods.passwordValidation = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };
// Generate Token for UserSchema
UserSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
