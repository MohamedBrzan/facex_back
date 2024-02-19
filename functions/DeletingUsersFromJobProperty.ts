import Job from '../models/Job/Job';
import User from '../models/User/User';

export default async (userId: string, user, property: string) => {
  if (property === 'published') {
    for (const jobId of user.jobs[property]) {
      const job = await Job.findById(jobId);
      if (job && job.process) {
        Object.keys(job.process).forEach(async (key) => {
          job.process[key].forEach(async (data, index) => {
            //! Delete the job from user
            await User.findByIdAndUpdate(data.user.toString(), {
              $pull: { [`jobs.${key}`]: jobId },
            });
            //! Delete the user from the job
            await Job.findByIdAndUpdate(jobId, {
              $pull: { [`process.${key}`]: userId },
            });
          });
        });
        await Job.findByIdAndDelete(jobId);
      }
    }
  } else {
    for (const jobId of user.jobs[property]) {
      const job = await Job.findById(jobId);
      if (job && job.process) {
        Object.keys(job.process).forEach((key) => {
          job.process[key].forEach(async (data, index) => {
            if (data.user.toString() === userId) {
              job.process[key].splice(index, 1);
              await job.save();
            }
          });
        });
      }
    }
  }
};
