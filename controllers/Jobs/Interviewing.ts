import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Job from '../../models/Job/Job';
import ErrorHandler from '../../middleware/ErrorHandler';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { processName, jobId, targetUserId } = req.body;

    const userId = (await getUserId(req)).toString();

    const job = await Job.findById(jobId);

    if (!job)
      return next(new ErrorHandler(404, `cannot find job with id ${jobId}`));

    if (job.user.toString() !== userId)
      return next(
        new ErrorHandler(
          404,
          `Sorry!, you're not allowed to do this processing`
        )
      );

    job.process.reviewing.forEach(async ({ user, resume }, index) => {
      if (user.toString() === targetUserId) {
        job.process.reviewing.splice(index, 1);
        job.process.interviewing.push({ user, resume });
        await job.save();
      }
    });

    return res.status(200).json({
      message: `moved job ${job.title} to interviewing process successfully`,
      job,
    });
  }
);
