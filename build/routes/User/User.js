"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GetUsers_1 = __importDefault(require("../../controllers/User/GetUsers"));
const Register_1 = __importDefault(require("../../controllers/User/Register"));
const Login_1 = __importDefault(require("../../controllers/User/Login"));
const GetUser_1 = __importDefault(require("../../controllers/User/GetUser"));
const UpdateUser_1 = __importDefault(require("../../controllers/User/UpdateUser"));
const DeleteUser_1 = __importDefault(require("../../controllers/User/DeleteUser"));
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const GetMyProfile_1 = __importDefault(require("../../controllers/User/GetMyProfile"));
const Logout_1 = __importDefault(require("../../controllers/User/Logout"));
const BlockUser_1 = __importDefault(require("../../controllers/User/BlockUser"));
const ActivateDeletion_1 = __importDefault(require("../../controllers/User/ActivateDeletion"));
const DeactivateDeletion_1 = __importDefault(require("../../controllers/User/DeactivateDeletion"));
const ActivateBan_1 = __importDefault(require("../../controllers/User/ActivateBan"));
const DeactivateBan_1 = __importDefault(require("../../controllers/User/DeactivateBan"));
const VerificationRequest_1 = __importDefault(require("../../controllers/User/VerificationRequest"));
const ActivateVerification_1 = __importDefault(require("../../controllers/User/ActivateVerification"));
const DeactivateVerification_1 = __importDefault(require("../../controllers/User/DeactivateVerification"));
const ActivelyRecruiting_1 = __importDefault(require("../../controllers/User/ActivelyRecruiting"));
const AddReactedPost_1 = __importDefault(require("../../controllers/User/AddReactedPost"));
const DeleteReactedPost_1 = __importDefault(require("../../controllers/User/DeleteReactedPost"));
const Share_1 = __importDefault(require("../../controllers/User/Share"));
const Save_1 = __importDefault(require("../../controllers/User/Save"));
const ToggleFollow_1 = __importDefault(require("../../controllers/User/ToggleFollow"));
const router = (0, express_1.Router)();
// Get Users
router.get('/', GetUsers_1.default);
// Register User
router.post('/register', Register_1.default);
// Login User
router.post('/login', Login_1.default);
// Logout User
router.post('/logout', Logout_1.default);
// User Profile
router.get('/me', IsAuthenticated_1.default, GetMyProfile_1.default);
// Share
router.patch('/share', IsAuthenticated_1.default, Share_1.default);
// Save
router.patch('/save', IsAuthenticated_1.default, Save_1.default);
// Add Reacted Post
router.patch('/posts/reacted/add', IsAuthenticated_1.default, AddReactedPost_1.default);
// Delete Reacted Post
router.delete('/posts/reacted/del', IsAuthenticated_1.default, DeleteReactedPost_1.default);
// Follower
// router.post('/follower', IsAuthenticated, ReceiveFollow);
// Following
router.patch('/follow', IsAuthenticated_1.default, ToggleFollow_1.default);
// Send Request For Verification
router.patch('/verification/request', IsAuthenticated_1.default, VerificationRequest_1.default);
// Accept Verification
router.patch('/verification/accept', IsAuthenticated_1.default, ActivateVerification_1.default);
// Reject Verification
router.patch('/verification/reject', IsAuthenticated_1.default, DeactivateVerification_1.default);
// Cancel Deletion Time
router.patch('/deletion/deactivate', IsAuthenticated_1.default, DeactivateDeletion_1.default);
// Actively Recruiting
router.patch('/active_recruiter', IsAuthenticated_1.default, ActivelyRecruiting_1.default);
// Block User
router.patch('/block', IsAuthenticated_1.default, BlockUser_1.default);
// Send Deletion Time
router.patch('/deletion/activate', IsAuthenticated_1.default, ActivateDeletion_1.default);
// Cancel Deletion Time
router.patch('/deletion/deactivate', IsAuthenticated_1.default, DeactivateDeletion_1.default);
// Activate Ban
router.patch('/ban/activate', IsAuthenticated_1.default, ActivateBan_1.default);
// Deactivate Ban
router.patch('/ban/deactivate', IsAuthenticated_1.default, DeactivateBan_1.default);
// Get User
router.get('/:id', GetUser_1.default);
// Put User
router.put('/:id', IsAuthenticated_1.default, UpdateUser_1.default);
// Delete User
router.delete('/:id', IsAuthenticated_1.default, DeleteUser_1.default);
exports.default = router;
