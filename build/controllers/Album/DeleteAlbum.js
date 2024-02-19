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
const Album_1 = __importDefault(require("../../models/Album/Album"));
const ErrorHandler_1 = __importDefault(require("../../middleware/ErrorHandler"));
const User_1 = __importDefault(require("../../models/User/User"));
const Image_1 = __importDefault(require("../../models/Image/Image"));
const UserId_1 = require("../../constants/UserId");
exports.default = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = (yield (0, UserId_1.getUserId)(req)).toString();
    let album = yield Album_1.default.findById(id);
    if (!album)
        return next(new ErrorHandler_1.default(404, `Album With Id ${id} Not Exist`));
    let user = yield User_1.default.findById(userId);
    const albumIndex = user.albums.splice(user.albums.indexOf(album), 1);
    if (albumIndex.length > 0) {
        yield user.save();
        //! Delete All Images that inside the Album
        for (let img of album.images) {
            //* Delete every single image from user
            user.images.splice(user.images.indexOf(img.toString()), 1);
            yield user.save();
            //! Delete Images From DB
            yield Image_1.default.findByIdAndRemove(img.toString());
        }
        //! Delete Album From DB
        yield Album_1.default.findByIdAndRemove(id);
        return res
            .status(200)
            .json({ success: true, msg: 'Album Deleted Successfully' });
    }
    return res.status(404).json({
        success: false,
        message: "Sorry!!, You're Not The Owner Of This Album",
    });
}));
