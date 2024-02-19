"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IsAuthenticated_1 = __importDefault(require("../../middleware/IsAuthenticated"));
const CreateJob_1 = __importDefault(require("../../controllers/Jobs/CreateJob"));
const UpdateJob_1 = __importDefault(require("../../controllers/Jobs/UpdateJob"));
const DeleteJob_1 = __importDefault(require("../../controllers/Jobs/DeleteJob"));
const GetJobs_1 = __importDefault(require("../../controllers/Jobs/GetJobs"));
const GetJob_1 = __importDefault(require("../../controllers/Jobs/GetJob"));
const ApplyJob_1 = __importDefault(require("../../controllers/Jobs/ApplyJob"));
const Reviewing_1 = __importDefault(require("../../controllers/Jobs/Reviewing"));
const Interviewing_1 = __importDefault(require("../../controllers/Jobs/Interviewing"));
const Rejected_1 = __importDefault(require("../../controllers/Jobs/Rejected"));
const Approved_1 = __importDefault(require("../../controllers/Jobs/Approved"));
const AddEmployees_1 = __importDefault(require("../../controllers/Jobs/AddEmployees"));
const router = (0, express_1.Router)();
// Get Jobs
router.get('/', GetJobs_1.default);
// Get Job
router.get('/:id', GetJob_1.default);
// Post Job
router.post('/', IsAuthenticated_1.default, CreateJob_1.default);
// Apply Job
router.patch('/apply', IsAuthenticated_1.default, ApplyJob_1.default);
// Reviewing
router.patch('/reviewing', IsAuthenticated_1.default, Reviewing_1.default);
// Interviewing
router.patch('/interviewing', IsAuthenticated_1.default, Interviewing_1.default);
// Rejected
router.patch('/rejected', IsAuthenticated_1.default, Rejected_1.default);
// Approved
router.patch('/approved', IsAuthenticated_1.default, Approved_1.default);
// Add Employees
router.patch('/employees', IsAuthenticated_1.default, AddEmployees_1.default);
// Put Job
router.put('/update', IsAuthenticated_1.default, UpdateJob_1.default);
// Delete Job
router.delete('/del', IsAuthenticated_1.default, DeleteJob_1.default);
exports.default = router;
