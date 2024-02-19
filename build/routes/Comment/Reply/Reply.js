"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IsAuthenticated_1 = __importDefault(require("../../../middleware/IsAuthenticated"));
const GetReplies_1 = __importDefault(require("../../../controllers/Comment/Reply/GetReplies"));
const CreateReply_1 = __importDefault(require("../../../controllers/Comment/Reply/CreateReply"));
const UpdateReply_1 = __importDefault(require("../../../controllers/Comment/Reply/UpdateReply"));
const DeleteReply_1 = __importDefault(require("../../../controllers/Comment/Reply/DeleteReply"));
const GetReply_1 = __importDefault(require("../../../controllers/Comment/Reply/GetReply"));
const AddAndRemoveExpression_1 = __importDefault(require("../../../controllers/Comment/Reply/AddAndRemoveExpression"));
const router = (0, express_1.Router)();
// Get Replies
router.get('/', GetReplies_1.default);
// Get Reply
router.get('/:id', GetReply_1.default);
// Post Reply
router.post('/create', IsAuthenticated_1.default, CreateReply_1.default);
// Put Reply
router.patch('/update', IsAuthenticated_1.default, UpdateReply_1.default);
// Add and Delete Reply Expression
router.patch('/expressions/toggle', IsAuthenticated_1.default, AddAndRemoveExpression_1.default);
// Delete Reply
router.delete('/del', IsAuthenticated_1.default, DeleteReply_1.default);
exports.default = router;
