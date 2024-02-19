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
const User_1 = __importDefault(require("../../models/User/User"));
const Post_1 = __importDefault(require("../../models/Post/Post"));
const Blog_1 = __importDefault(require("../../models/Blog/Blog"));
const Reel_1 = __importDefault(require("../../models/Reel/Reel"));
const Image_1 = __importDefault(require("../../models/Image/Image"));
const Album_1 = __importDefault(require("../../models/Album/Album"));
const Video_1 = __importDefault(require("../../models/Video/Video"));
const Payment_1 = __importDefault(require("../../models/Payment/Payment"));
const Comment_1 = __importDefault(require("../../models/Comment/Comment"));
const Ad_1 = __importDefault(require("../../models/Ad/Ad"));
const Hashtag_1 = __importDefault(require("../../models/Hashtag/Hashtag"));
const Reply_1 = __importDefault(require("../../models/Comment/Reply"));
const UserId_1 = require("../../constants/UserId");
const DeletingModel_1 = __importDefault(require("../../functions/DeletingModel"));
const DeletingUsersFromJobProperty_1 = __importDefault(require("../../functions/DeletingUsersFromJobProperty"));
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let user = yield User_1.default.findById(userId);
    // if (user.deletion.isActive) {
    // const {
    //   date: { full, short },
    //   month,
    //   day,
    // } = user.deletion.executeIn;
    // const today = new Date().setDate(new Date().getDate() + 30);
    // const todayDate = new Date(today).toDateString();
    // const oneDay = 1000 * 60 * 60 * 24;
    // setInterval(async () => {
    //   if (todayDate == short) {
    const { posts, comments, replies, videos, shares, saves, blogs, reels, followers, followings, images, albums, payments, hashtags, ads, notifications, } = user;
    //********************************/
    //********* Deleting Post && Blogs && Reels && Videos ********
    //********************************/
    // //TODO: Posts && Blogs && Reels && Videos, comments and replies Part
    const modelsInfo = [
        {
            id: 1,
            modelName: Post_1.default,
            modelContainer: posts,
            sharesDir: 'posts',
            savesDir: 'posts',
        },
        {
            id: 2,
            modelName: Blog_1.default,
            modelContainer: blogs,
            sharesDir: 'blogs',
            savesDir: 'blogs',
        },
        {
            id: 3,
            modelName: Reel_1.default,
            modelContainer: reels,
            sharesDir: 'reels',
            savesDir: 'reels',
        },
        {
            id: 4,
            modelName: Video_1.default,
            modelContainer: videos,
            sharesDir: 'videos',
            savesDir: 'videos',
        },
    ];
    modelsInfo.forEach(({ modelName, modelContainer, sharesDir, savesDir }) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, DeletingModel_1.default)(next, modelName, modelContainer, userId, shares[sharesDir], saves[savesDir]);
    }));
    //! Delete the ( comments.reacted )
    if (((_a = comments === null || comments === void 0 ? void 0 : comments.reacted) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const commentId of comments.reacted) {
            const comment = yield Comment_1.default.findById(commentId);
            Object.keys(comment.expressions).forEach((key) => {
                comment.expressions[key].forEach((id, index) => __awaiter(void 0, void 0, void 0, function* () {
                    if (userId === id.toString()) {
                        comment.expressions[key].splice(index, 1);
                        yield comment.save();
                        return;
                    }
                }));
            });
        }
    }
    //! Delete the ( replies.reacted )
    if (((_b = replies === null || replies === void 0 ? void 0 : replies.reacted) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        for (const replyId of replies.reacted) {
            const reply = yield Reply_1.default.findById(replyId);
            Object.keys(reply.expressions).forEach((key) => {
                reply.expressions[key].forEach((id, index) => __awaiter(void 0, void 0, void 0, function* () {
                    if (userId === id.toString()) {
                        reply.expressions[key].splice(index, 1);
                        yield reply.save();
                        return;
                    }
                }));
            });
        }
    }
    //TODO: Job
    const jobsProperties = [
        'published',
        'applied',
        'reviewing',
        'interviewing',
        'rejected',
        'approved',
    ];
    jobsProperties.forEach((propertyName) => __awaiter(void 0, void 0, void 0, function* () {
        if (user.jobs[propertyName].length > 0) {
            yield (0, DeletingUsersFromJobProperty_1.default)(userId, user, propertyName);
        }
    }));
    //TODO: Followers && Following
    //! Delete Followers
    if (followers.length > 0) {
        for (const followerId of followers) {
            yield User_1.default.findByIdAndUpdate(followerId, {
                $pull: { followings: userId },
            });
        }
    }
    //! Delete Followings
    if (followings.length > 0) {
        for (const followingId of followings) {
            yield User_1.default.findByIdAndUpdate(followingId, {
                $pull: { followers: userId },
            });
        }
    }
    //TODO: Album && Images
    //! Delete the Album and Images inside it
    if (albums.length > 0) {
        for (const albumId of albums) {
            const album = yield Album_1.default.findById(albumId);
            for (let imageId of album.images) {
                yield Image_1.default.findByIdAndDelete(imageId);
                album.images.splice(album.images.indexOf(imageId), 1);
                yield album.save();
            }
        }
    }
    //! Delete the image and Delete it from the Album if there's album
    if (images.length > 0) {
        for (const imageId of images) {
            const image = yield Image_1.default.findById(imageId);
            for (let imageId of images) {
                yield Album_1.default.findByIdAndUpdate(image.ref.toString(), {
                    $pull: { images: imageId },
                });
                yield Image_1.default.findByIdAndDelete(imageId);
            }
        }
    }
    //TODO: Payment
    if (payments.length > 0) {
        for (const paymentId of payments) {
            yield Payment_1.default.findByIdAndDelete(paymentId);
        }
    }
    //TODO: Hashtags
    //! Delete Published Hashtags
    if (hashtags.published.length > 0) {
        for (const hashtagId of hashtags.published) {
            const hashtag = yield Hashtag_1.default.findById(hashtagId);
            if (hashtag.followers.length > 0) {
                for (const followerId of hashtag.followers) {
                    yield User_1.default.findByIdAndUpdate(followerId, {
                        $pull: { 'hashtags.reacted': hashtagId },
                    });
                }
            }
            yield Hashtag_1.default.findByIdAndDelete(hashtagId);
        }
    }
    //! Delete Reacted Hashtags
    if (hashtags.reacted.length > 0) {
        for (const hashtagId of hashtags.reacted) {
            yield Hashtag_1.default.findByIdAndUpdate(hashtagId, {
                $pull: { followers: userId },
            });
        }
    }
    //TODO: Ad
    if (ads.length > 0) {
        for (const adId of ads) {
            yield Ad_1.default.findOneAndRemove(adId);
        }
    }
    //TODO: Notifications
    return res
        .status(200)
        .json({ success: true, msg: 'User Deleted Successfully' });
}));
