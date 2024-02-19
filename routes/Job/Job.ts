import { Router } from 'express';

import IsAuthenticated from '../../middleware/IsAuthenticated';
import CreateJob from '../../controllers/Jobs/CreateJob';
import UpdateJob from '../../controllers/Jobs/UpdateJob';
import DeleteJob from '../../controllers/Jobs/DeleteJob';
import GetJobs from '../../controllers/Jobs/GetJobs';
import GetJob from '../../controllers/Jobs/GetJob';
import ApplyJob from '../../controllers/Jobs/ApplyJob';
import Reviewing from '../../controllers/Jobs/Reviewing';
import Interviewing from '../../controllers/Jobs/Interviewing';
import Rejected from '../../controllers/Jobs/Rejected';
import Approved from '../../controllers/Jobs/Approved';
import AddEmployees from '../../controllers/Jobs/AddEmployees';

const router = Router();

// Get Jobs
router.get('/', GetJobs);

// Get Job
router.get('/:id', GetJob);

// Post Job
router.post('/', IsAuthenticated, CreateJob);

// Apply Job
router.patch('/apply', IsAuthenticated, ApplyJob);

// Reviewing
router.patch('/reviewing', IsAuthenticated, Reviewing);

// Interviewing
router.patch('/interviewing', IsAuthenticated, Interviewing);

// Rejected
router.patch('/rejected', IsAuthenticated, Rejected);

// Approved
router.patch('/approved', IsAuthenticated, Approved);

// Add Employees
router.patch('/employees', IsAuthenticated, AddEmployees);

// Put Job
router.put('/update', IsAuthenticated, UpdateJob);

// Delete Job
router.delete('/del', IsAuthenticated, DeleteJob);

export default router;
