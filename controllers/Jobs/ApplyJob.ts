import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Job from '../../models/Job/Job';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId, resume } = req.body;
    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    const job = await Job.findById(jobId);
    if (!job) return next(new ErrorHandler(404, `cannot find job ${jobId}`));
    if (job.user.toString() === userId)
      return next(new ErrorHandler(404, `cannot apply to your job`));

    const findUser = job.process.applied.findIndex(
      (u) => u.user.toString() === userId
    );

    if (findUser >= 0)
      return next(new ErrorHandler(404, `you already applied to this job`));

    user.jobs.applied.push(job);
    await user.save();

    job.process.applied.push({ user: userId, resume });
    await job.save();

    return res
      .status(200)
      .json({ message: `applied to job ${job.title} successfully`, job });
  }
);
