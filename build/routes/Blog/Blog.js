"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetBlogs_1 = __importDefault(require("../../controllers/Blog/GetBlogs"));
const GetBlog_1 = __importDefault(require("../../controllers/Blog/GetBlog"));
const UpdateBlog_1 = __importDefault(require("../../controllers/Blog/UpdateBlog"));
const DeleteBlog_1 = __importDefault(require("../../controllers/Blog/DeleteBlog"));
const CreateBlog_1 = __importDefault(require("../../controllers/Blog/CreateBlog"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const AddAndRemoveExpression_1 = __importDefault(require("../../controllers/Blog/AddAndRemoveExpression"));
const AddView_1 = __importDefault(require("../../controllers/Blog/AddView"));
const DeleteView_1 = __importDefault(require("../../controllers/Blog/DeleteView"));
const ToggleShareBlog_1 = __importDefault(require("../../controllers/Blog/ToggleShareBlog"));
const ToggleSaveBlog_1 = __importDefault(require("../../controllers/Blog/ToggleSaveBlog"));
const router = (0, express_1.Router)();
// Get Blogs
router.get('/', GetBlogs_1.default);
// Get Blog
router.get('/:id', GetBlog_1.default);
// Create Blog
router.post('/create', IsAuthenticated_1.default, CreateBlog_1.default);
// Add and Delete Expression for Blogs
router.patch('/expressions/toggle', IsAuthenticated_1.default, AddAndRemoveExpression_1.default);
// Toggle Share Blog
router.patch('/share', IsAuthenticated_1.default, ToggleShareBlog_1.default);
// Toggle Save Blog
router.patch('/save', IsAuthenticated_1.default, ToggleSaveBlog_1.default);
// Update Blog
router.put('/update', IsAuthenticated_1.default, UpdateBlog_1.default);
// Add Blog View
router.patch('/views/add', IsAuthenticated_1.default, AddView_1.default);
// Delete Blog View
router.patch('/views/del', IsAuthenticated_1.default, DeleteView_1.default);
// Delete Blog
router.delete('/del', IsAuthenticated_1.default, DeleteBlog_1.default);
exports.default = router;
